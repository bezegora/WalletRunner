import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {
    @Input()
    public header!: string;
    @Input()
    public description!: string;
    @Output() private _isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
    private confirm(): void {
        this._isConfirmed.emit(true);
    }
    private close(): void {
        this._isConfirmed.emit(false);
    }
}
