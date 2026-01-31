import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getTasks() {
    const token = this.auth.getToken();

    return this.http.get<any[]>(`${this.apiUrl}/tasks`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  updateTask(id: number, status: string) {
    const token = this.auth.getToken();

    return this.http.patch<any>(`${this.apiUrl}/tasks/${id}/status`, { status }, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  deleteTask(id: number) {
    const token = this.auth.getToken();

    return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  createTask(task: any) {
    const token = this.auth.getToken();

    return this.http.post<any>(`${this.apiUrl}/tasks`, task, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
