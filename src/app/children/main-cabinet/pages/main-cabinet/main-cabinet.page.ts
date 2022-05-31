import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { map, Observable, take } from 'rxjs';

import { CardService } from '../../../main-cabinet/services/card.service';
import { CardModel } from '../../models/card.model';
import { ModalComponent } from '../../modules/modal-window/modal/modal.component';
import { RefDirective } from '../../modules/modal-window/ref.directive';


@Component({
    templateUrl: './main-cabinet.page.html',
    styleUrls: ['./styles/main-cabinet.page.scss']
})
export class MainCabinetPage implements AfterViewInit {
    public mockCards$!: Observable<CardModel[]>;

    @ViewChild(RefDirective, { static: false })
    public refDir!: RefDirective;

    constructor(
        private _router: Router,
        public cardService: CardService,
    ) { }

    public toAddCardPage(): void {
        this._router.navigate(['add-card']);
    }

    public ngAfterViewInit(): void {
        if (!navigator.onLine) {
            this.showModal(
                'Отсутствует доступ к интернету. Попытаться снова?',
                () => {
                    this.refDir.container.clear();
                    window.location.reload();
                },
                () => {
                    this.refDir.container.clear();
                }
            );
        }
        console.log(navigator.userAgent);
    }

    public geolocationTest = async (): Promise<void> => {
        const coordinates: Position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, maximumAge: Infinity });
        this.cardService.getSortedCardsFromServer(coordinates.coords.latitude, coordinates.coords.longitude)
            .pipe(
                map((v: CardModel[]) => v.map((card: CardModel) => console.log(card.title))),
            )
            .subscribe();
    };

    public logout(): void {
        Storage.remove({
            key: 'isLogged'
        });
        this._router.navigate(['/login']);
    }

    private showModal(modalTitle: string, modalAgree: VoidFunction, modalDisagree: VoidFunction): void {
        this.refDir.container.clear();
        const component: ComponentRef<ModalComponent> = this.refDir.container.createComponent(ModalComponent);

        component.instance.title = modalTitle;
        component.instance.agree
            .pipe(
                take(1)
            )
            .subscribe(modalAgree);
        component.instance.disagree
            .pipe(
                take(1)
            )
            .subscribe(modalDisagree);
    }
}
