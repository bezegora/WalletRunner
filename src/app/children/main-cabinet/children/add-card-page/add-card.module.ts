import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ],
    exports: [
        AddCardPage,
    ]
})
export class AddCardModule { }
