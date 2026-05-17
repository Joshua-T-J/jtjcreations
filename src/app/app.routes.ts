import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
    title: 'JTJ Creations — Photography Studio',
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./components/portfolio/portfolio').then((m) => m.Portfolio),
    title: 'Portfolio — JTJ Creations',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
