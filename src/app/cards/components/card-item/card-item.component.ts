import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/app.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input()
  card!: Card

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCardClick() {
    console.log('move')
    this.router.navigate(['card', this.card.id])
    console.log('end')
  }
}
