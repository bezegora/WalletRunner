import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[paintCard]',
})
export class PaintDirective implements OnInit, AfterViewInit {
    @Input() public paintCard!: string;

    private _background: { [store: string]: string; } = {
        'Пятёрочка': `../../../../assets/card-background/Пятёрочка.png`,
        // 'Монетка': '../../../../assets/card-background',
        'Магнит': '../../../../assets/card-background/Магнит.png',
        'Лента': '../../../../assets/card-background/Лента.png',
        'Красное&белое': '../../../../assets/card-background/КБ.png'
    };

    constructor(
        private _el: ElementRef,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        if (this._background[this.paintCard]) {
            this._el.nativeElement.style.background = `url('${this._background[this.paintCard]}') no-repeat`;
        }
        else {
            this._el.nativeElement.style.backgroundColor = 'whitesmoke';
        }
        this._el.nativeElement.style.backgroundPosition = 'center';
        this._el.nativeElement.style.backgroundSize = 'cover';

    }
}
