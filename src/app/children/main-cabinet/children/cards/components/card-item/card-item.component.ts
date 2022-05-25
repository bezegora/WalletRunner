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
            transition('* => *', animate('350ms ease-in-out'))
        ])
    ]
})
export class CardItemComponent {
    @Input()
    public card!: CardViewModel;
    public text: String = 'zeroClick';


    constructor(private _router: Router, private _elRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    public clickout($event: Event): void {
        if (this._elRef.nativeElement.contains($event.target)) {
            this.text = 'oneClick';
        } else {
            this.text = 'zeroClick';
        }
    }


    public onCardClick(): void {
        if (!(this.text === 'zeroClick')) {
            this._router.navigate(['card', this.card.cardNumber]);
        }
    }

}
