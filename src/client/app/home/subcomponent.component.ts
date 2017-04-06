import { Component, Input } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'sub-component',
  templateUrl: './subcomponent.component.html',
  styleUrls: ['./subcomponent.component.css'],
})
export class SubComponent {

  @Input('first') first: string;

  @Input('second') second: number;

}
