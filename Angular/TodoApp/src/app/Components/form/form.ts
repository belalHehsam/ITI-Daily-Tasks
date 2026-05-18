import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, error } from './../../../utils/task.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from './../../services/task-service';

function generateId() {
  return uuidv4().split('-')[0];
}

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  Taskservice = inject(TaskService);
  tasks = this.Taskservice.tasks;

  task: Task = {
    id: '',
    title: '',
    description: '',
    priority: 'Low',
    category: 'Work',
    date: '',
    tags: [],
    isDone: false,
  };

  error: error = {
    status: false,
    message: '',
  };

  collectData() {
    this.error.status = false;
    let newtask = { ...this.task, id: generateId() };
    //for checking the data
    for (let key in newtask) {
      let newKey = key as keyof Task;
      if (newtask[newKey] === '' || newtask[newKey] === undefined) {
        this.error.status = true;
        this.error.message = `please fill the ${newKey} `;
        console.log(this.error.message);
        return;
      }
    }
    this.Taskservice.addTask(newtask);
    this.clearDate();
  }

  clearDate() {
    this.task = {
      id: '',
      title: '',
      description: '',
      priority: 'Low',
      category: 'Work',
      date: '',
      tags: [],
      isDone: false,
    };
  }
}
