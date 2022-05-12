import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaintDirectivesModule } from '../../directives/paint-directive.module';

import { ModalModule } from '../../modules/modal-window/modal/modal.module';
import { AddCardPage } from './pages/add-card.page';

const routes: Routes = [
    {
        path: '',
        component: AddCardPage,
    },
];

@NgModule({
    declarations: [
        AddCardPage,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        PaintDirectivesModule,
    ],
    exports: [
        AddCardPage,
    ]
})
export class AddCardModule { }
