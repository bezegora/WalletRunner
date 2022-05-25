import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GetResult, Storage } from '@capacitor/storage';
import { from, map, Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private _router: Router,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // const logged: boolean = this._accountService.isLogged;
        return from(Storage.get({
            key: 'isLogged'
        }))
            .pipe(
                map((storageValue: GetResult) => {
                    if (storageValue.value) {
                        return !!storageValue.value;
                    } else {
                        Storage.set({
                            key: 'isLogged',
                            value: 'false'
                        });
                        this._router.navigate(['/login']);

                        return false;
                    }
                })
            );
        // if (logged) {
        //     return of(true);
        // }

        // // not logged in so redirect to login page with the return url
        // this._router.navigate(['/login']);

        // return of(false);
    }
}
