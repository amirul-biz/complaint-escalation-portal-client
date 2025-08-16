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
        path: 'add',
        loadComponent: () =>
          import('../app/complaint/complaint-add-component/complaint-add-component').then(
            (c) => c.ComplaintAddComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('../app/complaint/complaint-listing-component/complaint-listing-component').then(
            (c) => c.ComplaintListingComponent
          ),
      },
    ],
  },
];
