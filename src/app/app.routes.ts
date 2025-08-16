import { Routes } from '@angular/router';
import { ComponentAuthLogin } from './component/auth/auth-login-component/auth-login.component';

export const routes: Routes = [
  {
    path: '',
    component: ComponentAuthLogin,
  },
  {
    path: 'complaint',
    loadComponent: () =>
      import('../app/complaint/complaint-component/complaint-component').then(
        (c) => c.ComplaintComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/complaint/complaint-add-component/complaint-add-component').then(
            (c) => c.ComplaintAddComponent
          ),
      },
    ],
  },
];
