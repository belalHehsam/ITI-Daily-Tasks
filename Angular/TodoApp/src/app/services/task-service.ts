import { computed, inject, Injectable, signal } from '@angular/core';
import { notification, notificationType, Task } from './../../utils/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/tasks';

  constructor() {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      this.tasksSignal.set(tasks);
    });
  }

  private tasksSignal = signal<Task[]>([]);
  private notificationsSignal = signal<notification[]>([]);
  private filterSignal = signal<string>('All');

  // Exposed Read-only signals for components
  readonly tasks = this.tasksSignal.asReadonly();
  readonly notifications = this.notificationsSignal.asReadonly();
  readonly currentFilter = this.filterSignal.asReadonly();

  readonly filteredTasks = computed(() => {
    const tasks = this.tasksSignal();
    const filter = this.filterSignal();
    if (filter === 'Done') return tasks.filter((task) => task.isDone);
    if (filter === 'Ongoing') return tasks.filter((task) => !task.isDone);
    return tasks;
  });

  //Actions
  setFilter(filter: string) {
    this.filterSignal.set(filter);
  }

  addTask(task: Task) {
    this.http.post<Task>(this.apiUrl, task).subscribe((savedTask) => {
      this.tasksSignal.update((tasks) => [...tasks, savedTask]);
    });
    this.addNotification('Task Added Successfully!', 'success');
  }

  deleteTask(taskId: string) {
    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe(() => {
      console.log('frommmmmmm http deleteee');

      this.tasksSignal.update((prev) => prev.filter((t) => t.id !== taskId));
    });

    this.addNotification('Task removed', 'danger');
  }

  toggleTaskStatus(taskId: string) {
    const task = this.tasksSignal().find((t) => t.id === taskId);
    if (!task) return;

    const updatedStatus = !task.isDone;
    this.http.patch(`${this.apiUrl}/${taskId}`, { isDone: updatedStatus }).subscribe(() => {
      this.tasksSignal.update((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? { ...t, isDone: updatedStatus } : t)),
      );
      this.addNotification('Task status updated!', 'info');
    });
  }

  UpdateTask(updatedTask: Task) {
    this.http.put(`${this.apiUrl}${updatedTask.id}`, updatedTask).subscribe(() => {
      this.tasksSignal.update((prevTasks) =>
        prevTasks.map((task) => (task.id == updatedTask.id ? updatedTask : task)),
      );
    });
    this.addNotification('Task updated successfully!', 'info');
  }

  addNotification(message: string, type: notificationType) {
    const newNoti = { message, type };
    this.notificationsSignal.update((prev) => [...prev, newNoti]);
    setTimeout(() => {
      this.notificationsSignal.update((prev) => prev.filter((noti) => noti !== newNoti));
    }, 4000);
  }
}
