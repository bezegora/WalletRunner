import { Component } from '@angular/core';

export interface ICard {
    title: string
    num: number
    id: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public title: string = 'WalletRunner';
}
