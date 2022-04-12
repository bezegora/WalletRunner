import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/app.component';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() _card!: Card;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public onCardClick() {
      this._router.navigate(['card', this._card.id]);
  }
}
