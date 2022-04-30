import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCardPage } from './pages/edit-card/edit-card.page';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardPage } from './pages/card-page/card.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberPipe } from '../../pipes/number.pipe';
import { CardConvertModel } from '../../pipes/card-model-to-view.pipe';

const routes: Routes = [
    {
        path: ':id',
        component: CardPage,
    },
    {
        path: ':id/edit-card',
        component: EditCardPage,
    },
];

@NgModule({
    declarations: [
        CardPage,
        CardListComponent,
        CardItemComponent,
        EditCardPage,
        NumberPipe,
        CardConvertModel,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CardItemComponent,
        CardListComponent,
        CardPage,
        EditCardPage,
    ],
})
export class CardsModule { }
