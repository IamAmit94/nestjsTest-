import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/module/auth/user.entity';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateTaskDto } from 'src/dto/task/createTask.dto';
import { GetTasksFilterDto } from 'src/dto/task/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Creating the Task
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  // Get All Task
  @Get()
  getTasks(
    @Query(ValidationPipe)
    filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    // return this.tasksService.getTasks(filterDto);
    return this.tasksService.getTasks(filterDto, user);
  }

  // Getting by Id
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // Updating the Task by Id
  @Patch('/:id')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  // Deleting the Task By Id(Hard Delete)

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
