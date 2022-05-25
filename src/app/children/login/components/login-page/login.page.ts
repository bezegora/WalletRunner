import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomError } from '../../classes/custom-error';
import { FormGenerator } from '../../classes/form-generator';
import { AuthService } from '../../services/auth.service';


@Component({
    templateUrl: './login.page.html',
    styleUrls: ['./styles/login.page.scss'],
    animations: [
        trigger('textAppears', [
            transition('void=>*', [
                style({ opacity: 0 }),
                animate('.5s', style({ opacity: 1 }))
            ])
        ])
    ]
})
export class LoginPage {
    public signInForm: FormGroup = FormGenerator.getInstance().getSignInForm();
    public signInError: CustomError = new CustomError('', false);
    public isSubmitDisabled: boolean = false;

    constructor(
        private _auth: AuthService,
        private _router: Router,
    ) {
    }

    public signIn(): void {
        this.switchSubmit();
        const password: string = this.signInForm.controls['password'].value;
        const email: string = this.signInForm.controls['email'].value;

        if (this._auth.login(email, password)) {
            this.switchSubmit();
            this.signInError.state = false;
            this._router.navigate(['/cabinet']);
        } else {
            this.switchSubmit();
            this.signInError.state = true;
            this.signInError.message = 'Неверный email или пароль';
        };
    }

    public toSignUp(): void {
        this.signInForm.reset();
    }

    private switchSubmit(): void {
        this.isSubmitDisabled = !this.isSubmitDisabled;
    }
}
