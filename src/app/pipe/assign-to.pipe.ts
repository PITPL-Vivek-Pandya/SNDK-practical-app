import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assignTo'
})
export class AssignToPipe implements PipeTransform {
  assigns = [{key:1,value:"Vivek"},{key:2,value:"Bhavik"}];

  transform(key: number): unknown {
    return this.assigns.find(assign=>assign.key === key).value;
  }

}
