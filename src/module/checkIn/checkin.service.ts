/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimePunchDto } from 'src/dto/timePunch/timePunch.dto';
import { UserRepository } from '../auth/user.repository';
import { TimePunchRepository } from '../timePunch/timePunch.repository';
import { CheckIn } from './checkin.entity';
import { CheckInRepository } from './checkin.repository';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckInRepository)
    private checkInRepo: CheckInRepository,
    @InjectRepository(TimePunchRepository)
    private timePunchRepo: TimePunchRepository,
    @InjectRepository(UserRepository)
    private userInfoRepo: UserRepository,
  ) {}
  async createPunchTime(body: TimePunchDto): Promise<CheckIn> {
    let newTimePunch = await this.timePunchRepo.addTimePunchData(body);

    let user = await this.userInfoRepo.findOne({ id: body.user });

    console.log('UserId => ', body.user);
    return this.checkInRepo.addNewCheckIn(newTimePunch, user);
    // pass the userInfoObject
  }

  // Updating the data checkOut
  async checkInUpdate(body: TimePunchDto): Promise<CheckIn> {
    let user = await this.userInfoRepo.findOne({ id: body.user });
    console.log('user =>', user);
    

    let checkOutData = await this.checkInRepo.find({
      where: { user: body.user, checkOut: null },
    });
    // console.log('checkOut => ',checkOutData)

    let finalData = checkOutData.sort();
    let updateTimePunch = await this.timePunchRepo.addTimePunchData(body);

    finalData[0].checkOut = updateTimePunch;
    return finalData[0].save();
  }
}
