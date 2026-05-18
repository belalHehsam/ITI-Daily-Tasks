import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notification, notificationType, Task, user } from '../../utils/task.model';
import { TaskService } from '../services/task-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  private router = inject(Router);
  taskServices = inject(TaskService);

  userApi = 'http://localhost:3000/users';

  userEmailSignal = signal<string | null>(localStorage.getItem('email'));

  Login(email: any, password: any) {
    this.http
      .get<user[]>(`${this.userApi}?email=${email}&password=${password}`)
      .subscribe((users) => {
        if (users.length > 0) {
          console.log(users);
          localStorage.setItem('email', email);
          this.userEmailSignal.set(email);
          this.taskServices.addNotification('Loging Successful', 'success');
          this.router.navigate(['/home']);
        } else {
          console.warn('Login failed: No user found.');
          this.taskServices.addNotification('Login failed: No user found.', 'danger');
        }
      });
  }

  logOut() {
    localStorage.removeItem('email');
    this.userEmailSignal.set(null);
  }

  signUp(userData: object) {
    this.http.post(this.userApi, userData).subscribe({
      next: () => this.taskServices.addNotification('User registered successfully', 'success'),
      error: (err) => console.error('Registration failed', err),
    });
  }

  isLogging() {
    return !!localStorage.getItem('email');
  }
}
