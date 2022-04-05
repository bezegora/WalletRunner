import { Component, Input } from '@angular/core';
import { Card } from 'src/app/app.component';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent {
  @Input()
  card!: Card
  constructor() {

  }

}
