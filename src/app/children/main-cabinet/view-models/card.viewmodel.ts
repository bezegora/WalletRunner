import { CardModel } from '../models/card.model';

export class CardViewModel {
    public cardNumber!: number;
    public title!: string;
    public isFavorite!: boolean;

    constructor(card: CardModel) {
        this.cardNumber = card.cardNumber;
        this.title = card.title;
        this.isFavorite = card.isFavorite;
    }
}
