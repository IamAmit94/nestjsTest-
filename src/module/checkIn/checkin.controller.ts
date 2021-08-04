import { Body, Controller, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { TimePunchDto } from 'src/dto/timePunch/timePunch.dto';
import { CheckinService } from './checkin.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('checkin')
@UseGuards(AuthGuard('jwt'))
export class CheckinController {
  constructor(private checkinService: CheckinService) {}

  @Post('/PunchTime')
  async addTimePunchData(@Body() body: TimePunchDto, @Res() res: Response) {
    const val = await this.checkinService.createPunchTime(body);
    console.log('CheckIn controller => ', body.user);
    res.status(HttpStatus.OK).send(val);
  }

  // Updating the data in NestJs
  @Put('/checkOut')
  async updateCheckInData(@Body() body: TimePunchDto, @Res() res: Response) {
    const updateVal = await this.checkinService.checkInUpdate(body);
    res.status(HttpStatus.OK).send(updateVal);
  }
}
 