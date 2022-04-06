import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CardItemComponent } from "./components/card-item/card-item.component";
import { CardListComponent } from "./components/card-list/card-list.component";
import { CardPageComponent } from "./page/card-page/card-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardPageComponent,
    children: [
      {
        path: ':id',
        component: CardPageComponent
      }
    ]
  },
];



@NgModule({
  declarations: [
    CardPageComponent,
    CardListComponent,
    CardItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CardItemComponent,
    CardListComponent,
    CardPageComponent
  ]
})
export class CardsModule {

}
