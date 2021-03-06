import { User } from 'src/module/auth/user.entity';
import { CreateTaskDto } from 'src/dto/task/createTask.dto';
import { GetTasksFilterDto } from 'src/dto/task/get-tasks-filter.dto';
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();

    delete task.user;

    return task;
  }

  async getTask(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    // query.where('task.userId = :userId', { userId: user.id });

    // if (status) {
    //   query.andWhere('task.status = :status', { status });
    // }

    //  if (search) {
    //  query.andWhere('(task.title LIKE :search OR  task.description LIKE :search)', { search: `%${search}%` });
    // }

    const tasks = await (await query.getMany()).sort();
    return tasks;
  }
}
