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
    const { type } = createComplaintDto;
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

    const typePrefix =
      {
        'Falta-servicio': 'FA-ST',
        drenajes: 'D. -ST',
        fugas: 'FA.ST',
        'calidad-agua': 'CA.ST',
        varios: 'RP-ST',
      }[type] || 'OT-ST';

    const complaintCount = await this.complaintModel.countDocuments({
      consecutiveId: {
        $regex: `${typePrefix}-${currentYear}-${currentMonth}/`,
      },
    });

    const complaintNumber = String(complaintCount + 1).padStart(3, '0');
    const customId = `${typePrefix}-${currentYear}-${currentMonth}/${complaintNumber}`;

    const complaint = new this.complaintModel({
      consecutiveId: customId,
      ...createComplaintDto,
      date: new Date(),
      status: 'Pendiente',
    });
    return complaint.save();
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.find().exec();
  }

  async findByConsecutiveId(consecutiveId: string): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findOne({ consecutiveId })
      .exec();
    if (!complaint) {
      console.log(
        `❌ No se encontró la queja con consecutiveId: "${consecutiveId}"`,
      );
      throw new NotFoundException(
        `No se encontró la queja con ID consecutivo: ${consecutiveId}`,
      );
    }
    return complaint;
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

  async updateComplaintStatus(id: string, status: string) {
    const updatedComplaint = await this.complaintModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedComplaint) {
      throw new NotFoundException('Complaint not found');
    }

    return updatedComplaint;
  }
}
