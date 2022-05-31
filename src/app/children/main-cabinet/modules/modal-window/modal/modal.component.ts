import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./styles/modal.component.scss']
})
export class ModalComponent {
    @Input()
    public title: string = 'Default title';
    @Output()
    public agree: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public disagree: EventEmitter<void> = new EventEmitter<void>();
}
