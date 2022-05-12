import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { GetResult, Storage } from '@capacitor/storage';
import { from, map, Observable, of } from 'rxjs';

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
        // let cards: CardModel[];
        const test: { value: string | null } = await Storage.get({
            key: 'cards'
        });
        if (test.value) {
            let tmp: CardModel[] = JSON.parse(test.value);
            tmp = tmp.sort((a: CardModel, b: CardModel) => Number.parseInt(a.isFavorite.toString()) - Number.parseInt(b.isFavorite.toString()));
            this._mockCard = tmp;

            return tmp;
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

    public getSortedStoresFromServer(lat: number, long: number): Observable<string[]> {

        const cards: string[] = this._mockCard.map((card: CardModel) => {
            return card.title;
        });

        const requestParams: { latitude: number, longitude: number, cards: string[] } = {
            latitude: lat,
            longitude: long,
            cards: cards
        };

        console.log(requestParams);

        // let test: string = `${this._apiUrl}/SortMyCards?`;

        // test += `latitude=${lat}&longitude=${long}`;
        // this._mockCard.forEach((element: CardModel) => {
        //     test += `&cards=${element.title}`;
        // });

        return this._http.post(`${this._apiUrl}/SortMyCards/`, { body: requestParams })
            .pipe(
                map((v: any) => {
                    return v;
                })
            );

        // return this._http.get<ICard[]>(test + '/')
        //     .pipe(
        //         map((data: ICard[]) => {
        //             return data.map((i: ICard) => new CardModel(i));
        //         })
        //     );
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
