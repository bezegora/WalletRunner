import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ModalWindowComponent } from '../children/main-cabinet/modules/modal-window/modal-window.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ModalPageComponent } from './modal-page/modal-page.component';
import { TinyNotificationComponent } from './tiny-notification/tiny-notification.component';



@NgModule({
    declarations: [
        ModalDialogComponent,
        ModalPageComponent,
        TinyNotificationComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
    ],
    entryComponents: [
        ModalWindowComponent
    ],
    bootstrap: [
        ModalPageComponent,
    ],
})
export class ModalPageModule { }
