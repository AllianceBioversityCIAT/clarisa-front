import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orElse'})
export class OrElsePipe implements PipeTransform {
  transform(value: string, ifNotPresent : string, countBlankString : boolean = true): string {
    if(countBlankString){
        if(value && value.trim().length > 0){
            return value;
        } else {
            return ifNotPresent;
        }
    } else {
        if(value){
            return value;
        } else {
            return ifNotPresent;
        }
    }
  }
}