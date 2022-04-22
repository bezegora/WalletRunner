import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-page',
    templateUrl: './modal-page.component.html',
    styleUrls: ['./modal-page.component.scss']
})
export class ModalPageComponent {
    public isModalDialogVisible: boolean = false;
    public showDialog(): void {
        this.isModalDialogVisible = true;
    }

    public closeModal(isConfirmed: boolean): void {
        this.isModalDialogVisible = false;
    }
}
