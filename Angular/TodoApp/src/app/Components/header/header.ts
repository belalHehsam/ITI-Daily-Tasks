import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  authService = inject(Auth);

  login = signal(this.authService.isLogging());

  seconds: number = 0;

  private interval!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.seconds++;
    }, 1000);
    console.log('asdfsfsdf', this.login);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  logoutFun() {
    this.login.update((preiv) => (preiv = false));
    this.authService.taskServices.addNotification('Loggout done', 'danger');
    this.authService.logOut();
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.seconds / 60);
    const remainingSeconds = this.seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
