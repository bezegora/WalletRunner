import { ICard } from '../interfaces/card.interface';

export class CardModel {
    public title!: string;
    public cardNumber!: number;
    public id!: number;
    public isFavorite: boolean;

    constructor(card: ICard) {
        this.title = card.title;
        this.cardNumber = card.cardNumber;
        this.id = card.id;
        this.isFavorite = card.isFavorite;
    }
}
