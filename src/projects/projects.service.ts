import { Model } from 'mongoose';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel({
      ...createProjectDto,
      isCompleted: false,
      workedHours: 0,
    });
    return project.save();
  }

  mapModelToGetDto(project) {
    return {
      ...project.toObject(),
      remainedHours: project.isCompleted
        ? 0
        : project.expectedHours - project.workedHours,
      completedPercent: project.isCompleted
        ? 100
        : (project.workedHours / project.expectedHours) * 100,
    };
  }

  async findAll() {
    const projects = await this.projectModel.find().exec();
    const getProjects = projects.map((project) =>
      this.mapModelToGetDto(project),
    );
    return getProjects;
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    return project;
  }

  async findOneByName(name: string) {
    const project = await this.projectModel.findOne({ name });
    const getProject = this.mapModelToGetDto(project);
    return getProject;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<any> {
    const project = await this.findOne(id);
    if (!project || project.isCompleted) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    project.workedHours = project.workedHours + updateProjectDto.workedHours;
    project.isCompleted = updateProjectDto.isCompleted;
    await project.save();
    const getProject = this.mapModelToGetDto(project);
    return getProject;
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    if (!project || project.isCompleted) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.projectModel.deleteOne({ _id: id });
  }
}
