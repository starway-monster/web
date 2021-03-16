import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(value: any, n: number): any {
    return this.chunk(value, n);
  }

  public chunk(arr: any[], n: number) {
      let newArr = [];
      for (let i = 0; i < arr.length; i+=n) {
        let nestedArr = arr.slice(i, i + n);
        const undefinedCount = n - nestedArr.length;
        if (undefinedCount > 0) {
          nestedArr = [...nestedArr, ...Array.of(undefinedCount).fill(undefined)];
        }
        newArr.push(nestedArr);
      }
      return newArr;
  }

}
