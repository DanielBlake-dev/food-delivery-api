import { UploadsService } from './uploads.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  public upload(@Body() body, @UploadedFile() file) {
    console.log(body);
    return this.uploadService.upload(file);
  }

  @Get('info/:id')
  async getFileInfo(@Param('id') id: string) {
    const file = await this.uploadService.findInfo(id);
    const filestream = await this.uploadService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file info',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been detected',
      file: file,
    };
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res) {
    const file = await this.uploadService.findInfo(id);
    const filestream = await this.uploadService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }
}
