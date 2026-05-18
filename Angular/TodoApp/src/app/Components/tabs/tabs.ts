import { Component, Output, EventEmitter, Input, OnDestroy, inject, computed } from '@angular/core';
import { Task } from './../../../utils/task.model';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  standalone: true,
})
export class Tabs {
  taskServices = inject(TaskService);
  tasks = this.taskServices.tasks;

  activeTab = this.taskServices.currentFilter;

  allCount = computed(() => this.tasks().length);

  doneCount = computed(() => this.tasks().filter((t) => t.isDone).length);

  ongoingCount = computed(() => this.tasks().filter((task) => !task.isDone).length);

  selectTab(tabName: string) {
    this.taskServices.setFilter(tabName);
  }
}
