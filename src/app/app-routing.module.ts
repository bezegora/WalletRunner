import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPageComponent } from './cards/page/card-page/card-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'card/:id',
    loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
