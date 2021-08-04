import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { TimePunchRepository } from '../timePunch/timePunch.repository';
import { CheckinController } from './checkin.controller';
import { CheckInRepository } from './checkin.repository';
import { CheckinService } from './checkin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CheckInRepository,
      TimePunchRepository,
      UserRepository,
    ]),
  ],
  controllers: [CheckinController],
  providers: [CheckinService],
})
export class CheckinModule {}
