import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { ICard } from '../interfaces/card.interface';
import { CardModel } from '../models/card.model';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private _mockCard!: CardModel[];
    private _apiUrl: string = 'http://stlad.ru';

    constructor(
        private _http: HttpClient,
    ) {
        this.initialize();
    }

    public initialize(): void {
        this._mockCard = [
            { title: 'Пятёрочка', cardNumber: 123456789, id: 1 },
            { title: 'Магнит', cardNumber: 123456, id: 2 },
            { title: 'Монетка', cardNumber: 123, id: 3 },
        ].map((el: ICard) => new CardModel(el))
    }

    public getCardById(id: number): CardModel {
        const findedCard: CardModel | undefined = this._mockCard.find((card: CardModel) => card.id === id);
        if (findedCard === undefined || findedCard === null) {
            throw new TypeError();;
        }

        return findedCard;
    }

    public addCard(card: CardModel): void {
        this._mockCard.push(card);
        Storage.set({
            key: 'cards',
            value: JSON.stringify(this._mockCard)
        });
    }

    public getCardList(): CardModel[] {
        return this._mockCard;
    }
    // ТЕРКИ С ASYNC/AWAIT
    // public async getCardList(): Promise<CardModel[]> {
    //     const { value }: { value: string | null } = await Storage.get({
    //         key: 'cards'
    //     });
    //     if (value) {
    //         const cards: CardModel[] = JSON.parse(value);
    //     }
    //     const cards: CardModel[] = [];

    //     return cards;
    // }

    public deleteCardById(id: number): void {
        this._mockCard = this._mockCard.filter((card: CardModel) => card.id !== id);
    }

    public redactCardById(id: number, newTitle: string): void {
        this._mockCard.map((card: CardModel) => {
            if (card.id === id) {
                card.title = newTitle;
            }
        });
    }

    public getConfirm = async (prompt: string): Promise<boolean> => {
        const { value }: { value: boolean } = await Dialog.confirm({
            title: 'Confirm',
            message: prompt,
        });

        return value.valueOf();
    };

    public getSortedCards(lat: number, long: number): Observable<CardModel[]> {
        // const params: HttpParams = new HttpParams()
        //     .append('latitude', lat)
        //     .append('longitude', long)
        //     .append('cards', JSON.stringify(
        //         this._mockCard.map((card: CardModel) => {
        //             return card.title;
        //         })
        //     ));


        const cards: string[] =
            this._mockCard.map((card: CardModel) => {
                return card.title;
            });
        const requestParams: any = {
            lattitude: lat,
            longitude: long,
            cards: cards
        };

        // console.log(params);

        let test: string = `${this._apiUrl}/SortMyCards?`;
        test += `latitude=${lat}&longitude=${long}`;
        this._mockCard.forEach((element: CardModel) => {
            test += `&cards=${element.title}`;
        });
        console.log(test);

        return this._http.get<ICard[]>(test + '/')
            .pipe(
                map((data: ICard[]) => {
                    return data.map((i: ICard) => new CardModel(i));
                })
            );

        return this._http.post(`${this._apiUrl}/SortMyCards`, { body: requestParams })
            .pipe(
                map((v: any) => {
                    return v;
                })
            );


    };

    public test(): void {

    }

}
