import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../app.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  mockCards: Card[] = [
    { title: 'Пятерочка', num: 123456789, id: 1 },
    { title: 'Магнит', num: 123456, id: 2 },
    { title: 'Монетка', num: 123, id: 3 },
  ];

  toAddCardPage() {
    this._router.navigate(['add-card']);
  }
}
