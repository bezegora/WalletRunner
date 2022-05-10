import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { ModalComponent } from 'src/app/children/main-cabinet/modules/modal-window/modal/modal.component';
import { RefDirective } from 'src/app/children/main-cabinet/modules/modal-window/ref.directive';

import { CardService } from '../../../../../main-cabinet/services/card.service';
import { CardViewModel } from '../../../../../main-cabinet/viewmodels/card.viewmodel';

@Component({
    templateUrl: './card.page.html',
    styleUrls: ['./styles/card.page.scss'],
})
export class CardPage implements OnInit {
    public card!: CardViewModel;

    @ViewChild(RefDirective, { static: false }) public refDir!: RefDirective;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _cardService: CardService,
        private _resolver: ComponentFactoryResolver,
    ) { }

    public ngOnInit(): void {
        this._route.params.subscribe((params: Params) => {
            this.card = new CardViewModel(this._cardService.getCardById(+params['id']));
        });
        JsBarcode('#barcode', this.card.cardNumber.toString());
    }

    public onClickBack(): void {
        this._router.navigate(['cabinet']);
    }

    public onDeleteCard(): void {
        this.showModal('УДАЛИТЬ КАРТУ?', 'ВЫ УДАЛИТЕ КАРТУ БЕЗ ВОЗМОЖНОСТИ ВОССТАНОВЛЕНИЯ');
    }

    public onRedactCard(): void {
        this._route.params.subscribe((params: Params) => {
            this._router.navigate(['edit-card'], { relativeTo: this._route });
        });
    }

    public onChangeFavourites(): void {
        this.card.isFavorite = !this.card.isFavorite;
        console.log(this.card.isFavorite);
        this._route.params.subscribe((params: Params) => {
            this._cardService.changeIsFavorite(+params['id']);
        });
    }

    private showModal(modalTitle: string, modalDescription: string): void {
        const modalFactory: ComponentFactory<ModalComponent> = this._resolver.resolveComponentFactory(ModalComponent);
        this.refDir.containerRef.clear();
        const component: ComponentRef<ModalComponent> = this.refDir.containerRef.createComponent(modalFactory);
        component.instance.title = modalTitle;
        component.instance.description = modalDescription;

        component.instance.agree.subscribe(() => {
            this.refDir.containerRef.clear();
            this._route.params.subscribe((params: Params) => {
                this._cardService.deleteCardById(+params['id']);
            });
            this._router.navigate(['cabinet']);
        });

        component.instance.disagree.subscribe(() => {
            this.refDir.containerRef.clear();
        });
    }

}

