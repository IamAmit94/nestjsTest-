import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/module/auth/user.entity';
import { CreateTaskDto } from 'src/dto/task/createTask.dto';
import { GetTasksFilterDto } from 'src/dto/task/get-tasks-filter.dto';

import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // creating the Task
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  // Getting All Task

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTask(filterDto, user);
  }

  // Getting the Task By Id
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with the id ${id} not found`);
    }

    return found;
  }

  // Updating the Task Status
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  //deleting Task

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log('Deleted Task = > ', result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with the id ${id} not found`);
    }
  }
}
