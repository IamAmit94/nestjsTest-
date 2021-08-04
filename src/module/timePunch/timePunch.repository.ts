import { TimePunchDto } from 'src/dto/timePunch/timePunch.dto';
import { EntityRepository, Repository } from 'typeorm';
import { TimePunch } from './timePunch.entity';

@EntityRepository(TimePunch)
export class TimePunchRepository extends Repository<TimePunch> {
  async addTimePunchData(timePunchData: TimePunchDto): Promise<TimePunch> {
    const { time, date, latitude, longitude, image, platform } = timePunchData;
    const newTimePunch = new TimePunch();

    newTimePunch.latitude = latitude;
    newTimePunch.longitude = longitude;
    newTimePunch.image = image;
    newTimePunch.platform = platform;
    newTimePunch.time = time;
    newTimePunch.date = date;

    await newTimePunch.save();
    return newTimePunch;
  }
}
