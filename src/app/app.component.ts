import { Component, ComponentRef, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { ModalComponent } from './children/main-cabinet/modules/modal-window/modal/modal.component';
import { RefDirective } from './children/main-cabinet/modules/modal-window/ref.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public title: string = 'WalletRunner';
    @ViewChild(RefDirective, { static: false })
    public refDir!: RefDirective;

    constructor() {
        window.addEventListener('offline', () => {
            this.showModal(
                'ksngdksnf',
                () => {
                    this.refDir.container.clear();
                    console.log('agree');
                },
                () => {
                    this.refDir.container.clear();
                    console.log('disagree');
                }
            );
        });
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
