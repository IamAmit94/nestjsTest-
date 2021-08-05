import { FileuploadModule } from './module/fileUpload/fileupload.module';
import { CheckinModule } from './module/checkIn/checkin.module';
import { TimePunchModule } from './module/timePunch/timepunch.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TasksModule } from './module/tasks/tasks.module';
import { AuthModule } from './module/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MulterModule.register({
    dest:'./uploads'
  }),
    FileuploadModule,
    CheckinModule,
    TimePunchModule,
    AuthModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: '65.1.117.238',
      username: 'khushadmin',
      password: 'vCrew#@*&',
      // logging: 'all',
      // logger: 'advanced-console',
      database: 'userTask',
      entities: [join(__dirname, './**/**.entity{.ts,.js}')],
      migrationsTableName: 'Migrations_History',
      synchronize: false,
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
