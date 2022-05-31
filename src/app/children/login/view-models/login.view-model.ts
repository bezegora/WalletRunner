import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../models/login.model';

export class LoginViewModel {
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', Validators.compose([
            Validators.email,
            Validators.required,
        ])),
        password: new FormControl('', Validators.compose([
            Validators.required
        ])),
    });

    public fromModel(user: LoginModel): void {
        this.loginForm.value.email = user.login;
        this.loginForm.value.password = user.password;
    }

    public toModel(): LoginModel {
        return new LoginModel({
            login: this.loginForm.value.email as string,
            password: this.loginForm.value.password as string,
        });
    }
}
