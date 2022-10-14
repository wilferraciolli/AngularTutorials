import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  public transform(size: number, extension: string = 'MB'): string {
    // get the size and convert it onto MB
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }

}
