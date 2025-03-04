import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async register(authDto: AuthDto) {
    const { username, password } = authDto;

    const existingUser = await this.adminModel.findOne({ username }).exec();
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.adminModel({ username, password: hashedPassword });

    await newUser.save();

    return { message: 'Usuario registrado exitosamente' };
  }

  async login(authDto: AuthDto) {
    const { username, password } = authDto;

    const user = await this.adminModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async getUsers() {
    return this.adminModel.find().select('-password');
  }

  async generateTokens(user: any) {
    const payload = { sub: user._id, username: user.username };

    const accessToken = jwt.sign(
      payload,
      process.env.REFRESH_SECRET || 'secretWordFormRefreshToken',
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_SECRET || 'secretWordFormRefreshToken',
      {
        expiresIn: '30d',
      },
    );

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET || 'secretWordFormRefreshToken',
      );
      const newAccessToken = jwt.sign(
        { sub: payload.sub },
        process.env.JWT_SECRET || 'secretWordFormRefreshToken',
        {
          expiresIn: '15m',
        },
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
