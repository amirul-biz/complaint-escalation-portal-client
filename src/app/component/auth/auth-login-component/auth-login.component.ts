import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service/auth-service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

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
  form: FormGroup<ILoginForm>;
  service = inject(AuthService);
  readonly #router = inject(Router);

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
    this.service
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.#router.navigate(['/complaint'])))
      .subscribe();
  }
}
