import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class GetProjectDto extends PartialType(CreateProjectDto) {
  id: string;
  isCompleted: boolean;
  workedHours: number;
  remainedHours: number;
  completedPercent: number;
}
