import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedactComponent } from './pages/redact/redact.page';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardPageComponent } from './pages/card-page/card-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: CardPageComponent,
  },
  {
    path: ':id/redact',
    component: RedactComponent,
  },
];

@NgModule({
  declarations: [
    CardPageComponent,
    CardListComponent,
    CardItemComponent,
    RedactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CardItemComponent,
    CardListComponent,
    CardPageComponent,
    RedactComponent,
  ],
})
export class CardsModule { }
