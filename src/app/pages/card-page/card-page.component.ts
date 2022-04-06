import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private cardService: GetCardService
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      console.log(params['id'])
      this.card = this.cardService.getCardById(+params['id'])
    })
  }

}
