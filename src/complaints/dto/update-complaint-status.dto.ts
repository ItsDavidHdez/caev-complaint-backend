import { IsString, IsIn } from 'class-validator';

export class UpdateComplaintStatusDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsIn(['pending', 'resolved', 'rejected'], {
    message: 'El estado debe ser pending, resolved o rejected',
  })
  status: string;
}
