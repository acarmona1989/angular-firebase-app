import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDescription'
})
export class ShortenDescriptionPipe implements PipeTransform {

  transform(value: any, limit: number, ...args: unknown[]): unknown {
    let description: string = value;
    if (description.length > limit) {
      description = description.substring(0, limit) + '...';
    }
    return description;
  }
}
