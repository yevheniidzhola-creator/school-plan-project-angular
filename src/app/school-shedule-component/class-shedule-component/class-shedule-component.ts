import { Component, Input } from '@angular/core';
import { SchoolIntrfc } from '../../modules';
import { schoolSheduleData } from '../../school.data';
@Component({
  selector: 'app-class-shedule',
  imports: [],
  templateUrl: './class-shedule-component.html',
  styleUrl: './class-shedule-component.css',
})
export class ClassSheduleComponent {
@Input({required:true}) dayShedule!:SchoolIntrfc;
shedule=schoolSheduleData;

}
