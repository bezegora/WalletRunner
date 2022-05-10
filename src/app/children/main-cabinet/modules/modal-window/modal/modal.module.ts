import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RefDirective } from '../ref.directive';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [
        ModalComponent,
        RefDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ModalComponent,
        RefDirective,
    ],
})
export class ModalModule { }
