import { Component, Input } from '@angular/core';
import { notificationType } from '../../../utils/task.model';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})

export class Notification {
  @Input() message: string = '';
  @Input() type: notificationType = 'success';
}
