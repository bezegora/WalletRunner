import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { PaintDirectivesModule } from '../../directives/paint-directive.module';

import { ModalModule } from '../../modules/modal-window/modal/modal.module';
import { CardConvertModel } from '../../pipes/card-model-to-view.pipe';
import { NumberPipe } from '../../pipes/number.pipe';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardPage } from './pages/card-page/card.page';
import { EditCardPage } from './pages/edit-card/edit-card.page';

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
        ModalModule,
        PaintDirectivesModule,
    ],
    exports: [
        CardItemComponent,
        CardListComponent,
        CardPage,
        EditCardPage,
    ],
    bootstrap: [
    ],
})
export class CardsModule { }
