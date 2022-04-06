import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: Card
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.router.navigate(['/card', this.card.id])
  }
}

