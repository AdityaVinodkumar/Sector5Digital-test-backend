import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';

const MONGODB_URI = 'mongodb://localhost:27017/DB_TEST';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI, {}), ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
