import { BadGatewayException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/module/tasks/task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    // console.log('Value ->', value);

    if (!this.isStatusValid(value)) {
      throw new BadGatewayException(`${value} is  an invalid Status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status); // return -1 if the status is invalid
    return idx! == -1;
  }
}
