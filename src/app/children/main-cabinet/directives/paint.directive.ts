import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[paintCard]',
})
export class PaintDirective implements OnInit, OnChanges {
    @Input()
    public paintCard!: string;
    @HostBinding('style.background')
    public hostbinder!: string;

    private _background: { [store: string]: string; } = {
        'Пятёрочка': `../../../../assets/card-background/Пятёрочка.png`,
        'Магнит': '../../../../assets/card-background/Магнит.png',
        'Красное&белое': '../../../../assets/card-background/КБ.png',
        'Монетка': '../../../../assets/card-background/monetka.png',
        'Перекрёсток': '../../../../assets/card-background/perekryostok.png',
        'Лента': '../../../../assets/card-background/lenta.png',
    };



    constructor(
        private _el: ElementRef,
    ) { }

    public ngOnChanges(): void {
        // if (changes['paintCard']) {
        //     if (this._background[this.paintCard]) {
        //         // this._el.nativeElement.style.background = `url('${this._background[this.paintCard]}') no-repeat`;
        //         this.hostbinder = `url('${this._background[this.paintCard]}') no-repeat`;
        //     } else {
        //         this._el.nativeElement.style.backgroundColor = 'whitesmoke';
        //     }
        // }
        // if (!changes['paintCard'].firstChange) {
        //     // this._el.nativeElement.style.border = '1px solid black';
        //     // this._el.nativeElement.style.boxShadow = '0px -5px 9px -2px #000000';
        // }
        if (this.paintCard) {
            // this._el.nativeElement.style.background = `url('${this._background[this.paintCard]}') no-repeat`;
            this._el.nativeElement.style.backgroundPosition = 'center';
            this._el.nativeElement.style.backgroundSize = 'cover';
            if (this._background[this.paintCard]) {
                this.hostbinder = `url('${this._background[this.paintCard]}') no-repeat`;
            }
            this._el.nativeElement.style.width = '317px';
            this._el.nativeElement.style.height = '153px';
        }
    }

    public ngOnInit(): void { }
}
