import { Component, inject, signal } from '@angular/core';
import { Header } from './Components/header/header';
import { Footer } from './Components/footer/footer';
import { TaskList } from './Components/TaskList/TaskList';
import { Carsoul } from './Components/carsoul/carsoul';
import { Task, notification, notificationType } from './../utils/task.model';
import { Form } from './Components/form/form';
import { Notification } from './Components/notification/notification';
import { Login } from './Components/login/login';
import { SignUp } from './Components/sign-up/sign-up';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private taskService = inject(TaskService);
  notifications = this.taskService.notifications;
}
