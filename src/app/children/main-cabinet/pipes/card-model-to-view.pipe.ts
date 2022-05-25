import { Pipe, PipeTransform } from '@angular/core';

import { CardModel } from '../models/card.model';
import { CardViewModel } from '../view-models/card.viewmodel';

@Pipe({
    name: 'cardConvertModel',
})
export class CardConvertModel implements PipeTransform {

    public transform(value: CardModel): CardViewModel {
        return new CardViewModel(value);
    };

}
