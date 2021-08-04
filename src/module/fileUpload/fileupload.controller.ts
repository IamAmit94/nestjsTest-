/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class FileUploadController {
    constructor(){}

    @Post()
@UseInterceptors(
	FileInterceptor('image'),
)
async uploadedFile(@UploadedFile() file) {
    const response = {
    	originalname: file.originalname,
    	filename: file.filename,
    };
    return response;
}

}
