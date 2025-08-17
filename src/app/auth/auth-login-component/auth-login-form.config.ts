import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export function getLoginForm(): FormGroup<ILoginForm> {
  return new FormGroup<ILoginForm>({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });
}
