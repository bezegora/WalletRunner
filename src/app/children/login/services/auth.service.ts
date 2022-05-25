import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetResult, Storage } from '@capacitor/storage';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class AuthService {
    public get isLogged(): Observable<boolean> {
        return from(Storage.get({
            key: 'isLogged'
        }))
            .pipe(
                map((storageValue: GetResult) => {
                    if (storageValue.value) {
                        return JSON.parse(storageValue.value);
                    } else {
                        Storage.set({
                            key: 'isLogged',
                            value: 'false'
                        });

                        return false;
                    }
                })
            );
    }

    private _isLogged: boolean = false;

    private _usersDatabase: { [store: string]: string; } = {
        'admin@gmail.com': 'admin',
    };


    constructor(
        public router: Router,
    ) {
        // this._auth.onIdTokenChanged((user: User | null): void => {
        //     this.user = user;
        //     this._firestore.initializeUserFromAuthService(user);
        // });
    }

    public login(email: string, password: string): boolean {
        this._isLogged = true;
        Storage.set({
            key: 'isLogged',
            value: String(this._usersDatabase[email] === password)
        });

        return this._usersDatabase[email] === password;
    }

    // public async register(email: string, password: string): Promise<void> {
    //     await createUserWithEmailAndPassword(this._auth, email, password);
    //     await this._firestore.createUser(this.user!.uid, email);
    // }

    public async logout(): Promise<void> {
        // this._firestore.logout();
        // this.router.navigate(['/main']);
        // await this._auth.signOut();
    }

    public init(): void { }
}
