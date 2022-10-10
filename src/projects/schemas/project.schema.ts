import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  name: string;

  @Prop()
  isCompleted: boolean;

  @Prop()
  expectedHours: number;

  @Prop()
  workedHours: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
