import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async register(username: string, password: string) {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const admin = new this.adminModel({ username, password: hashedPassword });
    return admin.save();
  }

  async login(username: string, password: string) {
    const admin = await this.adminModel.findOne({ username }).exec();
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'Login successful' };
  }
}
