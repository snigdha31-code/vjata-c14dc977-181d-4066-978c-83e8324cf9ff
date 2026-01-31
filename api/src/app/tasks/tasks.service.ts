import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(title: string, description: string, user:any): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      status: 'OPEN',
      createdBy: user,
    });
    return this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async updateTaskStatus(id: number, status: Task['status']): Promise<Task | undefined> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return undefined;

    task.status = status;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }
}
