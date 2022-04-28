import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';
import { TinyNotificationModel } from 'src/app/common/tiny-notification-model/tiny-notification.model';
import { CardService } from 'src/app/services/card.service';
import { TinyNotificationService } from 'src/app/services/tiny-notification.service';
import { ICard } from '../../app.component';

@Component({
    selector: 'app-add-card-page',
    templateUrl: './add-card-page.component.html',
    styleUrls: ['./add-card-page.component.scss'],
})
export class AddCardPageComponent {
    public stores: string[] = ['ПЯТЁРОЧКА', 'КРАСНОЕ&БЕЛОЕ', 'ПЕРЕКРЁСТОК', 'ЛЕНТА', 'МАГНИТ', 'МОНЕТКА'];
    public cardForm: FormGroup = new FormGroup({
        store: new FormControl('', Validators.required),
        cardNum: new FormControl('', Validators.required),
    });

    constructor(
        private _router: Router,
        private _cardService: CardService,
        private _notificationService: TinyNotificationService,
    ) { }

    public onClickBack(): void {
        this._router.navigate(['main-page']);
    }

    public async onSubmit(): Promise<void> {
        const card: ICard = {
            title: this.cardForm.value.store,
            num: this.cardForm.value.cardNum,
            id: this.cardForm.value.cardNum,
        };
        this._notificationService.showToast(new TinyNotificationModel('ТЕСТ', 'ТЕСТ'));
        // Object.keys(this.cardForm.controls).map((x: string) => this.cardForm.controls[x]).forEach((control: FormGroup) => {
        //     // control.controls.markAsTouched();
        // });
        // this.cardForm.controls['store'].markAsTouched();
        // this.cardForm.controls['cardNum'].markAsDirty();
        this.cardForm.markAllAsTouched();
        if (this.cardForm.valid && await this._cardService.getConfirm(`ДОБАВИТЬ КАРТУ?`)) {
            this._cardService.addCard(card);
            this._router.navigate(['main-page']);
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
