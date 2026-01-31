import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { AuditLogService } from '../audit-log/audit-log.service';
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService,
   // private readonly auditLogService: AuditLogService,
  ) {}

@Post()
@Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
async createTask(@Body() createTaskDto: { title: string; description: string }, @Req() req: any) {

  
 // await this.auditLogService.log(req.user, `Created task: ${task.title}`);

  return this.tasksService.createTask(createTaskDto.title, createTaskDto.description, req.user);

}



  @Get()
  @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Patch(':id/status')
  async updateTaskStatus(@Param('id') id: string, @Body() updateTaskDto: { status: Task['status'] }) {
    return this.tasksService.updateTaskStatus(+id, updateTaskDto.status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(+id);
  }
}
