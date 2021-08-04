import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { TimePunch } from '../timePunch/timePunch.entity';
import { CheckIn } from './checkin.entity';

@EntityRepository(CheckIn)
export class CheckInRepository extends Repository<CheckIn> {
  async addNewCheckIn(newTimePunch: TimePunch, user: User) {
    let newCheckIn = new CheckIn();
    newCheckIn.checkIn = newTimePunch;
    newCheckIn.user = user;
    console.log('User => ', newTimePunch);
    return await newCheckIn.save();
  }

  async updateCheckOut(updateTimePunch: TimePunch, user: User) {
    let newCheckOut = new CheckIn();
    newCheckOut.checkOut = updateTimePunch;
    newCheckOut.user = user;
    console.log('UserId => ', updateTimePunch);
    return await newCheckOut.save();
  }
}
