import { Component } from '@angular/core';

export interface Card {
  title: string
  num: number
  id: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WalletRunner';
}
