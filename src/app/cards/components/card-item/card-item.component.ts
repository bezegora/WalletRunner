import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICard } from 'src/app/app.component';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
    @Input()
    public card!: ICard;

    constructor(private _router: Router) { }

    public onCardClick(): void {
        this._router.navigate(['card', this.card.id]);
    }
}
