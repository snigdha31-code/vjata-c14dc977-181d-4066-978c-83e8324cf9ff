import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Service to handle user authentication
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}/auth/login`,
      { email, password }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;

    // Base64url -> Base64
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Decode safely
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload?.role ?? null;
  } catch {
    return null;
  }
}
}
