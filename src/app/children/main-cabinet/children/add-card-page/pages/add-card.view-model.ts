import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CardModel } from "../../../models/card.model";

export class AddCardViewModel {
    public cardForm: FormGroup = new FormGroup({
        store: new FormControl('', Validators.required),
        cardNum: new FormControl('', Validators.required),
    });

    public fromModel(card: CardModel) {
        this.cardForm.value.store = card.title;
        this.cardForm.value.cardNum = card.cardNumber;
    }

    public toModel(): CardModel {
        return new CardModel({
            title: this.cardForm.value.store as string,
            cardNumber: this.cardForm.value.cardNumber as number,
            id: this.cardForm.value.cardNumber as number
        });
    }
}
