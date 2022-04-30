import { Component, Input } from '@angular/core';
import { CardViewModel } from '../../../../../main-cabinet/viewmodels/card.viewmodel';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./styles/card-item.component.scss'],
})
export class CardItemComponent {
    @Input()
    public card!: CardViewModel;

}
