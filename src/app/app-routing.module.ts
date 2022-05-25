import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from './children/login/components/login-page/login.page';
import { AuthGuard } from './children/login/helpers/auth.guard';
import { CabinetRoutingModule } from './children/main-cabinet/cabinet.routing.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: (): Promise<CabinetRoutingModule> => import('./children/main-cabinet/cabinet.routing.module').then((m: any) => m.CabinetRoutingModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginPage,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
