import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetCardService } from "src/app/services/get-card.service";
import { Card } from '../../app.component';

@Component({
  selector: 'app-add-card-page',
  templateUrl: './add-card-page.component.html',
  styleUrls: ['./add-card-page.component.scss'],
})
export class AddCardPageComponent {
  constructor(
    private router: Router,
    private cardService: GetCardService,
  ) { }

  stores: string[] = ['ПЯТЁРОЧКА', 'КРАСНОЕ&БЕЛОЕ', 'ПЕРЕКРЁСТОК', 'ЛЕНТА'];

  cardForm = new FormGroup({
    store: new FormControl('', Validators.required),
    cardNum: new FormControl('', Validators.required),
  });

  onClickBack() {
    this.router.navigate(['main-page']);
  }

  onSubmit() {
    const card: Card = {
      title: this.cardForm.value.store,
      num: this.cardForm.value.cardNum,
      id: this.cardForm.value.cardNum,
    };
    this.cardService.addCard(card);
    this.router.navigate(['main-page']);
  }
}
