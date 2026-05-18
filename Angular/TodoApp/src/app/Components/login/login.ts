import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  authService = inject(Auth);
  handleSumbit(form: NgForm, email: NgModel, password: NgModel) {
    console.log('the email is ', email.value);
    console.log('the password is passord', password.value);

    this.authService.Login(email.value, password.value);
  }
}
