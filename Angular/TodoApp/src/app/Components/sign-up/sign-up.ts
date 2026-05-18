import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Auth } from '../../services/auth';

function matchPasswords(formGroup: AbstractControl): ValidationErrors | null {
  const password = formGroup.get('password')?.value;
  const confirm = formGroup.get('confirmPassword')?.value;
  return password === confirm ? null : { missMatch: true };
}

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  authService = inject(Auth);

  form = new FormGroup(
    {
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },
    {
      validators: matchPasswords,
    },
  );

  handleSumbit() {
    this.authService.signUp(this.form.value);
    console.log(this.form.controls.email.errors);
  }

  get userName() {
    return this.form.get('userName');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
