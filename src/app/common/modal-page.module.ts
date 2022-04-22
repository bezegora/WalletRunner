import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ModalPageComponent } from './modal-page/modal-page.component';



@NgModule({
    declarations: [
        ModalDialogComponent,
        ModalPageComponent,
    ],
    imports: [
        BrowserModule,
    ],
    bootstrap: [
        ModalPageComponent,
    ],
})
export class ModalPageModule { }
