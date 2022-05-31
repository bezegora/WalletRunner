import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CardViewModel } from '../../../../view-models/card.viewmodel';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./styles/card-item.component.scss'],
    animations: [
        trigger('cardMoveTrigger', [
            state('zeroClick', style({
                marginBottom: '*'
            })),
            state('oneClick', style({
                marginBottom: '-30px'
            })),
            transition('* => *', animate('0.35s ease-in-out'))
        ])
    ]
})
export class CardItemComponent {
    @Input()
    public card!: CardViewModel;
    public text: String = 'zeroClick';


    constructor(private _router: Router, private _elRef: ElementRef) { }

    // @HostListener('document:mouseup', ['$event'])
    @HostListener('document:click', ['$event'])
    public clickout($event: Event): void {
        console.log($event);

        if (this._elRef.nativeElement.contains($event.target)) {
            this.text = 'oneClick';
        } else {
            this.text = 'zeroClick';
        }
        // console.log(this.text);

    }


    public onMouseCardClick(): void {

        if (this.text !== 'zeroClick') {
            this._router.navigate(['card', this.card.cardNumber]);
        }
    }

    public onTapCardClick(): void {
        console.log(this.text);
        if (this.text !== 'zeroClick') {
            this._router.navigate(['card', this.card.cardNumber]);
        }
    }

}
