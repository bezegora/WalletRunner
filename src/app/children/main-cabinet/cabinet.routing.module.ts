import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddCardModule } from './children/add-card-page/add-card.module';
import { CardsModule } from './children/cards/cards.module';
import { MainCabinetPage } from './pages/main-cabinet/main-cabinet.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cabinet',
        pathMatch: 'full',
    },
    {
        path: 'cabinet',
        component: MainCabinetPage,
    },
    {
        path: 'card',
        loadChildren: (): Promise<CardsModule> => import('./children/cards/cards.module').then((m: any) => m.CardsModule),
    },
    {
        path: 'add-card',
        loadChildren: (): Promise<AddCardModule> => import('./children/add-card-page/add-card.module').then((m: any) => m.AddCardModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CabinetRoutingModule { }
