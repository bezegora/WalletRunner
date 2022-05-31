import { ILogin } from '../interfaces/login.interface';

export class LoginModel {
    public login!: string;
    public password!: string;

    constructor(user: ILogin) {
        this.login = user.login as string;
        this.password = user.password as string;
    }
}
