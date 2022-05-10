import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split',
})
export class NumberPipe implements PipeTransform {
    public transform(value: number): string {
        return value.toString().replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
}
