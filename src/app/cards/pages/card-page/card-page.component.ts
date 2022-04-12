import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Card } from 'src/app/app.component';
import { GetCardService } from 'src/app/services/get-card.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
  card!: Card;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cardService: GetCardService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.card = this._cardService.getCardById(+params['id']);
    });
  }

  onClickBack() {
    this._router.navigate(['main-page']);
  }

  onDeleteCard() {
    this._route.params.subscribe((params: Params) => {
      this._cardService.deleteCardById(+params['id']);
    });
    this._router.navigate(['main-page']);
  }

  onRedactCard() {
    this._route.params.subscribe((params: Params) => {
      this._router.navigate(['redact'], { relativeTo: this._route })
    });
  }
}
