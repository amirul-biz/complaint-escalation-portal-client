import { Routes } from '@angular/router';
import { ComponentAuthLogin } from './component/auth/auth-login-component/auth-login.component';
import { ComplaintPageModeEnum } from './complaint/complaint.pageMode.enum';

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
