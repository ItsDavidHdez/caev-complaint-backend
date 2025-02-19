import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint, ComplaintDocument } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<ComplaintDocument>,
  ) {}

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const complaint = new this.complaintModel({
      ...createComplaintDto,
      date: new Date(),
    });
    return complaint.save();
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.find().exec();
  }

  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintModel.findById(id).exec();
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    return complaint;
  }

  async delete(id: string): Promise<void> {
    const result = await this.complaintModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Complaint not found');
    }
  }
}
