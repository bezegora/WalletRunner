import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetRoutingModule } from './children/main-cabinet/cabinet.routing.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: (): Promise<CabinetRoutingModule> => import('./children/main-cabinet/cabinet.routing.module').then((m: any) => m.CabinetRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
