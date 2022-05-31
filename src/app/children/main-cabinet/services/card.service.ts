import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { GetResult, Storage } from '@capacitor/storage';
import { catchError, finalize, from, map, Observable, switchMap, take } from 'rxjs';

import { CardModel } from '../models/card.model';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    public get isLoaded(): boolean {
        return this._isLoaded;
    }

    private _isLoaded: boolean = false;
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

    public offlineGetCardList(): Observable<CardModel[]> {
        return from(Storage.get({
            key: 'cards'
        }))
            .pipe(
                map((storageValue: { value: string | null }) => {
                    if (storageValue.value) {
                        this._mockCard = JSON.parse(storageValue.value);

                        return this._mockCard.sort((a: CardModel, b: CardModel) => Number(b.isFavorite) - Number(a.isFavorite));
                    } else {
                        throw new TypeError('Storage пустой');
                    }
                })
            );
    }

    public getCardList(): Observable<CardModel[]> {
        return from(Storage.get({
            key: 'cards'
        }))
            .pipe(
                take(1),
                map((storageValue: { value: string | null }) => {
                    this._isLoaded = false;
                    if (storageValue.value) {
                        console.log(storageValue.value);
                        this._mockCard = JSON.parse(storageValue.value);

                        return this._mockCard;
                    } else {
                        throw new TypeError('Storage пустой');
                    }
                }),
                switchMap((cards: CardModel[]) => {
                    console.log(cards);

                    return Geolocation.getCurrentPosition({ enableHighAccuracy: true, maximumAge: Infinity });
                }),
                switchMap((position: Position) => {
                    return this.getSortedCardsFromServer(position.coords.latitude, position.coords.longitude);
                }),
                catchError(() => {
                    return this.offlineGetCardList();
                }),
                finalize(() => {
                    this._isLoaded = true;
                })
            );
    }

    public addCard(card: CardModel): void {
        Storage.get({
            key: 'cards'
        }).then((response: GetResult) => {
            if (response.value !== null && response.value !== 'undefined') {
                console.log('ПАРСИМ');

                this._mockCard = JSON.parse(response.value);
            } else {
                console.log('ОБНУЛЕНИЕ МАССИВА');

                this._mockCard = [];
            }
            console.log(this._mockCard, 'ПОСЛЕ ДОБАВЛЕНИЯ');

        });
        this._mockCard.push(card);
        this.refreshStorage(this._mockCard);
    }

    public changeIsFavorite(id: number): void {
        this._mockCard = this._mockCard.map((card: CardModel) => {
            if (card.id === id) {
                card.isFavorite = !card.isFavorite;
            }

            return card;
        });
        this.refreshStorage(this._mockCard);
    }

    public deleteCardById(id: number): void {
        this._mockCard = this._mockCard.filter((card: CardModel) => card.id !== id);
        this.refreshStorage(this._mockCard);
    }

    public redactCardById(id: number, newTitle: string): void {
        this._mockCard.map((card: CardModel) => {
            if (card.id === id) {
                card.title = newTitle;
            }
        });
        this.refreshStorage(this._mockCard);
    }

    public getSortedCardsFromServer(lat: number, long: number): Observable<CardModel[]> {
        console.log(this._mockCard, 'ВЗЯТЫЕ ДЛЯ ОТПРАВКИ КАРТЫ');

        const stores: string[] = this._mockCard.map((card: CardModel) => {
            return card.title;
        });

        const requestParams: { latitude: number, longitude: number, cards: string[] } = {
            latitude: lat,
            longitude: long,
            cards: stores
        };

        console.log(requestParams, 'ОТПРАВЛЕННЫЕ ДАННЫЕ');


        return this._http.post<string[]>(`${this._apiUrl}/SortMyCards/`, { body: requestParams })
            .pipe(
                map((v: string[]) => {
                    console.log(v, 'ОТВЕТ СЕРВЕРА');

                    const tmp: CardModel[] = [];
                    v.forEach((store: string) => {
                        this._mockCard.forEach((card: CardModel) => {
                            if (card.title === store) {
                                tmp.push(card);
                            }
                        });
                    });
                    console.log(tmp, 'ДАННЫЕ ИЗ ТМП');

                    Storage.set({
                        key: 'cards',
                        value: JSON.stringify(tmp)
                    });

                    return tmp.sort((a: CardModel, b: CardModel) => Number(b.isFavorite) - Number(a.isFavorite));
                }),
            );
    };

    private refreshStorage(newCards: CardModel[]): void {
        // Storage.get({
        //     key: 'cards'
        // }).then((resp: GetResult) => {
        //     if (!resp.value || resp.value === 'undefined') {
        //         console.log('ОБНУЛЕНИЕ МАССИВА');

        //         this._mockCard = [];
        //     }
        //     console.log(resp.value, 'ИЗ СТОРАДЖА');

        //     console.log(this._mockCard, 'РЕФРЕШ СТОРАДЖ');

        //     Storage.set({
        //         key: 'cards',
        //         value: JSON.stringify(this._mockCard)
        //     });
        // });
        Storage.set({
            key: 'cards',
            value: JSON.stringify(newCards)
        });
        console.log(newCards, 'ПЕРЕДАННЫЕ КАРТЫ');

    }
}
