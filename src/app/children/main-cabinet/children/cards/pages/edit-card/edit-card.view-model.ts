import { FormControl, FormGroup } from '@angular/forms';

import { CardModel } from '../../../../.../../models/card.model';


export class EditCardViewModel {

    public storeForm: FormGroup = new FormGroup({
        store: new FormControl(this.card.title)
    });

    constructor(public card: CardModel) { }


    public fromModel(card: CardModel): void {
        this.storeForm.value.store = card.title;
    }

    public toModel(): CardModel {
        return new CardModel({
            title: this.storeForm.value.store as string,
            cardNumber: this.storeForm.value.cardNumber as number,
            id: this.storeForm.value.cardNumber as number,
            isFavorite: this.card.isFavorite
        });
    }
}
