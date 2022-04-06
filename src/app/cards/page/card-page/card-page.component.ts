import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Card } from 'src/app/app.component';
import { GetCardService } from 'src/app/services/get-card.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {
  card!: Card

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardService: GetCardService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.card = this.cardService.getCardById(+params['id'])
    })
  }

  onClickBack() {
    this.router.navigate(['main-page'])
  }
}
