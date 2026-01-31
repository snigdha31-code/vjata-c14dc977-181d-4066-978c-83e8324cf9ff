import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks.service';
import { FormsModule } from '@angular/forms';

// Root component of the application
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  email = '';
  password = '';
  message = '';
  tasks: any[] = [];
  role: string | null = null;
  newTaskTitle = '';

  // Inject AuthService and TasksService
  constructor(
    private auth: AuthService,
    private tasksService: TasksService
  ) {}

  // HandleS user login
  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        this.auth.saveToken(res.accessToken);
        this.role = this.auth.getRole();
        this.message = 'Login successful';
      },
      error: () => {
        this.message = 'Login failed';
      },
    });
  }

  loadTasks() {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  updateTask(task: any, status: string) {
    this.tasksService.updateTask(task.id, status).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(task: any) {
    this.tasksService.deleteTask(task.id).subscribe(() => {
      this.loadTasks();
    });
  }

  createTask() {
    if (this.newTaskTitle.trim()) {
      this.tasksService.createTask({ title: this.newTaskTitle }).subscribe(() => {
        this.newTaskTitle = '';
        this.loadTasks();
      });
    }
  }
}
