import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(
        private _router: Router,
        private _zone: NgZone
    ) { }

    public handleError(error: Error): void {
        console.error(error);
        this._zone.run(() => {
            this._router.navigate(['/cabinet']);
        });
    }

}
