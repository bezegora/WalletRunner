import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { Observable } from 'rxjs';
import { ICard } from '../app.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private _mockCard!: ICard[];
    private _apiUrl: string = '';

    constructor(
        private _http: HttpClient,
    ) {
        this.initialize();
    }

    public initialize(): void {
        this._mockCard = [
            { title: 'ПЯТЁРОЧКА', num: 123456789, id: 1 },
            { title: 'МАГНИТ', num: 123456, id: 2 },
            { title: 'МОНЕТКА', num: 123, id: 3 },
        ];
    }

    public getCardById(id: number): ICard {
        const findedCard: ICard | undefined = this._mockCard.find((card: ICard) => card.id === id);
        if (findedCard === undefined || findedCard === null) {
            throw new TypeError();;
        }

        return findedCard;
    }

    public addCard(card: ICard): void {
        this._mockCard.push(card);
    }

    public getCardList(): ICard[] {
        return this._mockCard;
    }

    public deleteCardById(id: number): void {
        this._mockCard = this._mockCard.filter((card: ICard) => card.id !== id);
    }

    public redactCardById(id: number, newTitle: string): void {
        this._mockCard.map((card: ICard) => {
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

    public getSortedCards(): Observable<any> {
        const params: HttpParams = new HttpParams()
            .append('latitude', '100')
            .append('longitude', '100')
            .append('cards', JSON.stringify([
                this._mockCard.map((card: ICard) => {
                    return card.title;
                })
            ]));

        return this._http.get(`${this._apiUrl}/SortMyCards`, { params: params });
    }
}
