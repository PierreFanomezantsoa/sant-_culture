import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'dashboard'},
  {path:'dashboard',loadComponent:()=>import('./pages/pages').then(m=>m.DashboardPage)},
  {path:'farm',loadComponent:()=>import('./pages/pages').then(m=>m.FarmPage)},
  {path:'plots',loadComponent:()=>import('./pages/pages').then(m=>m.PlotsPage)},
  {path:'reports',loadComponent:()=>import('./pages/pages').then(m=>m.ReportsPage)},
  {path:'guides',loadComponent:()=>import('./pages/pages').then(m=>m.GuidesPage)},
  {path:'messages',loadComponent:()=>import('./pages/pages').then(m=>m.MessagesPage)},
  {path:'**',redirectTo:'dashboard'}
];
