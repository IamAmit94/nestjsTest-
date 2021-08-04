import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimePunchController } from './timepunch.controller';
import { TimePunchRepository } from './timePunch.repository';
import { TimePunchService } from './timepunch.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimePunchRepository])],
  controllers: [TimePunchController],
  providers: [TimePunchService],
})
export class TimePunchModule {}
