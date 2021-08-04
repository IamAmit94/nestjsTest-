/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadController } from './fileupload.controller';

@Module({
    imports: [MulterModule.register({
        dest: './uploads'
    })],
    controllers: [FileUploadController],
    providers: [],
})
export class FileuploadModule {}
