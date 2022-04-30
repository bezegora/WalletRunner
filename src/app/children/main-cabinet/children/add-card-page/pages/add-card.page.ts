import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';

import { TinyNotificationService } from '../../../../../modules/services/tiny-notification.service';
import { TinyNotificationModel } from '../../../../../modules/tiny-notification-model/tiny-notification.model';
import { CardService } from '../../../../main-cabinet/services/card.service';
import { CardModel } from '../../../models/card.model';
import { AddCardViewModel } from './add-card.view-model';

@Component({
    templateUrl: './add-card.page.html',
    styleUrls: ['./styles/add-card.page.scss'],
})
export class AddCardPage {
    public stores: string[] = ['Пятёрочка', 'Красное&белое', 'Перекресток', 'Лента', 'Магнит', 'Монетка'];
    public cardForm: FormGroup = new FormGroup({
        store: new FormControl('', Validators.required),
        cardNum: new FormControl('', Validators.required),
    });

    public addCardViewModel: AddCardViewModel = new AddCardViewModel();

    constructor(
        private _router: Router,
        private _cardService: CardService,
        private _notificationService: TinyNotificationService,
    ) { }

    public onClickBack(): void {
        this._router.navigate(['cabinet']);
    }

    public async onSubmit(): Promise<void> {

        let card = this.addCardViewModel.toModel();

        this._notificationService.showToast(new TinyNotificationModel('ТЕСТ', 'ТЕСТ'));
        // Object.keys(this.cardForm.controls).map((x: string) => this.cardForm.controls[x]).forEach((control: FormGroup) => {
        //     // control.controls.markAsTouched();
        // });
        // this.cardForm.controls['store'].markAsTouched();
        // this.cardForm.controls['cardNum'].markAsDirty();
        this.cardForm.markAllAsTouched();
        if (this.cardForm.valid && await this._cardService.getConfirm(`ДОБАВИТЬ КАРТУ?`)) {
            this._cardService.addCard(card);
            this._router.navigate(['cabinet']);
        }
    }

    // private markFormGroupTouched(formGroup: FormGroup): void {
    //     (<any>Object).values(formGroup.controls).forEach((control) => {
    //         if (control.controls) { // control is a FormGroup
    //             this.markFormGroupTouched(control);
    //         } else { // control is a FormControl
    //             control.markAsTouched();
    //         }
    //     });
    // }

    public async onStartScan(): Promise<void> {
        BarcodeScanner.hideBackground();
        const result: ScanResult = await BarcodeScanner.startScan();
        if (result.hasContent) {
            console.log(result.content);
        }
    }

}
