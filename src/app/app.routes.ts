import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../app/pages/user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: 'user-detail/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('../app/pages/user-detail/user-detail.component').then(
        (c) => c.UserDetailComponent
      ),
  },
];
