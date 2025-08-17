import { Routes } from '@angular/router';
import { AuthGuard } from './guards/guard-auth';
import { ComponentAuthLogin } from './auth/auth-login-component/auth-login.component';

export const routes: Routes = [
  {
    path: '',
    component: ComponentAuthLogin,
  },
  {
    path: 'complaint',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/complaint/complaint-component/complaint-component').then(
        (c) => c.ComplaintComponent
      ),
    children: [
      {
        path: `:pageMode`,
        loadComponent: () =>
          import('./complaint/complaint-add-edit-component/complaint-add-edit-component').then(
            (c) => c.ComplaintAddComponent
          ),
      },
      {
        path: `:pageMode/:complaintId`,
        loadComponent: () =>
          import('./complaint/complaint-add-edit-component/complaint-add-edit-component').then(
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
