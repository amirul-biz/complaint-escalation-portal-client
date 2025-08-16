import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service';

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-auth-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class ComponentAuthLogin {
  // Fully typed FormGroup
  form: FormGroup<ILoginForm>;
  service = inject(AuthService);

  constructor() {
    this.form = new FormGroup<ILoginForm>({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const loginData = this.form.value; // Typed as { email: string; password: string }
    console.log('Login submitted', loginData);

    this.service.login(this.form.getRawValue()).subscribe();
  }
}
