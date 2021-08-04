import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from 'src/module/tasks/task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  // @IsEnum(TaskStatus)
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  // @IsString()
  @IsNotEmpty()
  search: string;
}
