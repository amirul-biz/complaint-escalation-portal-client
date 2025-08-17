import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, from, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth-service/auth-service';
import { getLoginForm } from './auth-login-form.config';
import { IAuthError, IAuthErrorMessage } from '../../interfaces/interface.auth';

@Component({
  selector: 'app-auth-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class ComponentAuthLogin implements OnInit {
  form = getLoginForm();
  service = inject(AuthService);
  readonly #router = inject(Router);
  authService = inject(AuthService);
  constructor() {}

  async ngOnInit() {
    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.#router.navigate(['/complaint']);
    }
  }

  async checkUserSession() {
    const isLoggedIn = await this.authService.isLoggedIn();
    isLoggedIn ? this.#router.navigate(['/complaint']) : null;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.service
      .login(this.form.getRawValue())
      .pipe(
        switchMap(() => from(this.authService.isLoggedIn())),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.#router.navigate(['/complaint']);
          }
        }),
        catchError((error: IAuthErrorMessage) => {
          return this.authService.httpErrorHandler(error);
        })
      )
      .subscribe();
  }
}
