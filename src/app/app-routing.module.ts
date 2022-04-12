import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCardPageComponent } from './pages/add-card-page/add-card-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full',
  },
  {
    path: 'main-page',
    component: MainPageComponent,
  },
  {
    path: 'card',
    loadChildren: () => import('./cards/cards.module').then((m) => m.CardsModule),
  },
  {
    path: 'add-card',
    component: AddCardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
