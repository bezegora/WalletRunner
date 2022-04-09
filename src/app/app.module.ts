import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CardPageComponent } from './cards/page/card-page/card-page.component';
import { FormsModule } from '@angular/forms';
import { CardListComponent } from './cards/components/card-list/card-list.component';
import { CardItemComponent } from './cards/components/card-item/card-item.component';
import { CardsModule } from './cards/cards.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }