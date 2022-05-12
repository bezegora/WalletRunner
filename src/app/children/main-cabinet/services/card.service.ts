import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { GetResult, Storage } from '@capacitor/storage';
import { from, lastValueFrom, map, Observable, of, Subscription } from 'rxjs';

import { CardModel } from '../models/card.model';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private _mockCard!: CardModel[];
    private _apiUrl: string = 'http://stlad.ru';

    constructor(
        private _http: HttpClient,
    ) { }

    public getCardById(id: number): CardModel {
        const findedCard: CardModel | undefined = this._mockCard.find((card: CardModel) => card.id === id);
        if (findedCard === undefined || findedCard === null) {
            throw new TypeError();;
        }

        return findedCard;
    }

    public async getCardList(): Promise<CardModel[]> {
        const test: { value: string | null } = await Storage.get({
            key: 'cards'
        });
        if (test.value) {
            let cardList: CardModel[] = JSON.parse(test.value);
            this._mockCard = cardList;

            const position: Position = await Geolocation.getCurrentPosition();
            const tmp$: Promise<CardModel[]> = lastValueFrom(this.getSortedCardsFromServer(position.coords.latitude, position.coords.longitude));

            cardList = await tmp$;
            this._mockCard = cardList;

            return cardList;
        } else {
            throw new Error('Storage пустой');
        }
    }

    public addCard(card: CardModel): void {
        Storage.get({
            key: 'cards'
        }).then((response: GetResult) => {
            if (response.value !== null && response.value !== 'undefined') {
                this._mockCard = JSON.parse(response.value);
            } else {
                this._mockCard = [];
            }
            this._mockCard.push(card);
            this.refreshStorage();
        });
    }

    public changeIsFavorite(id: number): void {
        this._mockCard = this._mockCard.map((card: CardModel) => {
            if (card.id === id) {
                card.isFavorite = !card.isFavorite;
            }

            return card;
        });
        this.refreshStorage();
    }

    public deleteCardById(id: number): void {
        this._mockCard = this._mockCard.filter((card: CardModel) => card.id !== id);
        this.refreshStorage();
    }

    public redactCardById(id: number, newTitle: string): void {
        this._mockCard.map((card: CardModel) => {
            if (card.id === id) {
                card.title = newTitle;
            }
        });
        this.refreshStorage();
    }

    public getSortedCardsFromServer(lat: number, long: number): Observable<CardModel[]> {

        const cards: string[] = this._mockCard.map((card: CardModel) => {
            return card.title;
        });

        const requestParams: { latitude: number, longitude: number, cards: string[] } = {
            latitude: lat,
            longitude: long,
            cards: cards
        };

        console.log(requestParams);

        return this._http.post(`${this._apiUrl}/SortMyCards/`, { body: requestParams })
            .pipe(
                map((v: any) => {
                    const tmp: CardModel[] = [];
                    v.forEach((store: string) => {
                        this._mockCard.forEach((card: CardModel) => {
                            if (card.title === store) {
                                tmp.push(card);
                            }
                        });
                    });

                    return tmp.sort((a: CardModel, b: CardModel) => Number(b.isFavorite) - Number(a.isFavorite));
                })
            );
    };

    private refreshStorage(): void {
        Storage.get({
            key: 'cards'
        }).then((resp: GetResult) => {
            if (!resp.value || resp.value === 'undefined') {
                this._mockCard = [];
            }
            Storage.set({
                key: 'cards',
                value: JSON.stringify(this._mockCard)
            });
            // .then(() => {
            //     // if (result.value) {
            //     //     this._mockCard = JSON.parse(result.value);
            // });
        });
    }
}
