import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './children/login/login.module';
import { CabinetRoutingModule } from './children/main-cabinet/cabinet.routing.module';
import { CardsModule } from './children/main-cabinet/children/cards/cards.module';
import { MainCabinetPage } from './children/main-cabinet/pages/main-cabinet/main-cabinet.page';

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
        LoginModule,
        BrowserAnimationsModule,
        // CustomPreloader,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
