import { Component, inject, Input } from '@angular/core';
import { Task } from '../../../utils/task.model';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service';
@Component({
  selector: 'app-card',
  imports: [FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  taskservice = inject(TaskService);
  tasks = this.taskservice.tasks;

  @Input() task!: Task;

  isEditing: boolean = false;
  tempTitle: string = '';
  tempDescription: string = '';
  tempPriority: 'Low' | 'Medium' | 'High' = 'Low';
  tempDate: string = '';

  enableEditMode() {
    this.isEditing = true;
    this.tempTitle = this.task.title;
    this.tempDescription = this.task.description;
    this.tempPriority = this.task.priority;
    this.tempDate = this.task.date;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    if (!this.tempTitle || !this.tempDate) {
      alert('Title and Date are required!');
      return;
    }

    let newTask: Task = {
      ...this.task,
      title: this.tempTitle,
      description: this.tempDescription,
      priority: this.tempPriority,
      date: this.tempDate,
    };
    this.taskservice.UpdateTask(newTask);
    this.isEditing = false;
  }

  deleteClicked() {
    console.log('delteeeee', this.task);

    this.taskservice.deleteTask(this.task.id);
  }

  toggleClicked() {
    this.taskservice.toggleTaskStatus(this.task.id);
  }
}
