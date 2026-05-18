import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tabs } from '../tabs/tabs';
import { Card } from '../card/card';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-TaskList',
  imports: [FormsModule, Tabs, Card],
  templateUrl: './TaskList.html',
  styleUrl: './TaskList.css',
})
export class TaskList {
  TaskService = inject(TaskService);

  tasksArr = this.TaskService.filteredTasks;

  currentFilter = this.TaskService.currentFilter;

  setFilter(tabName: string) {
    this.TaskService.setFilter(tabName);
  }
}
