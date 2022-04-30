import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainCabinetPage } from './children/main-cabinet/pages/main-cabinet/main-cabinet.page';
import { CardsModule } from './children/main-cabinet/children/cards/cards.module';
import { HttpClientModule } from '@angular/common/http';
import { CabinetRoutingModule } from './children/main-cabinet/cabinet.routing.module';

@NgModule({
    declarations: [
        AppComponent,
        MainCabinetPage,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CardsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CabinetRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
