import { Component, inject } from '@angular/core';
import { SchoolService } from '../../school.service';


@Component({
  selector: 'app-date-range',
  imports: [],
  templateUrl: './date-range-component.html',
  styleUrl: './date-range-component.css',
})
export class DateRangeComponent {
private schoolService=inject(SchoolService);
onClickMonth(){
  this.schoolService.onMonth();
};
onClickWeek(){
  this.schoolService.onWeek();
};
onClickDay(){
  this.schoolService.onDay();
};
onClickToday(){
  this.schoolService.onToday();
};
onClickInDecrease(type: 'day' | 'week' | 'month', direction: 'decrease' | 'increase'){
  this.schoolService.onInDecrease(type,direction);
};
onClickResetDatePicker(){
  this.schoolService.resetDatePicker();
}
onClickDatePicker(sinceStr: string, toStr: string){
  this.schoolService.onDatePicker(sinceStr,toStr);
}
}
