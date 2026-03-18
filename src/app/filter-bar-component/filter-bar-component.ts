import { Component } from '@angular/core';
import { DateRangeComponent } from './date-range-component/date-range-component';
import { FilterClassComponent } from './filter-class-component/filter-class-component';

@Component({
  selector: 'app-filter-bar',
  imports: [DateRangeComponent,FilterClassComponent],
  templateUrl: './filter-bar-component.html',
  styleUrl: './filter-bar-component.css',
})
export class FilterBarComponent {

}
