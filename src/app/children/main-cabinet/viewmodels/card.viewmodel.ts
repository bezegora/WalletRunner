import { CardModel } from "../models/card.model";

export class CardViewModel {
    public cardNumber!: number;
    public title!: string;

    constructor(card: CardModel) {
        this.cardNumber = card.cardNumber;
        this.title = card.title;
    }
}
