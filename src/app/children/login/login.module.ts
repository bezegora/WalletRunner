import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { LoginPage } from './components/login-page/login.page';
import { AuthService } from './services/auth.service';


@NgModule({
    declarations: [
        LoginPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [AuthService],
    exports: [LoginPage],
    bootstrap: [LoginPage],
})
export class LoginModule { }
