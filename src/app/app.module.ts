import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './children/login/login.module';
import { CabinetRoutingModule } from './children/main-cabinet/cabinet.routing.module';
import { CardsModule } from './children/main-cabinet/children/cards/cards.module';
import { ModalModule } from './children/main-cabinet/modules/modal-window/modal/modal.module';
import { MainCabinetPage } from './children/main-cabinet/pages/main-cabinet/main-cabinet.page';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

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
        ModalModule
        // CustomPreloader,
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
