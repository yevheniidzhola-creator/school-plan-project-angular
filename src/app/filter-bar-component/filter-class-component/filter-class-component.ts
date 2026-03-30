import { Component, Input, signal } from '@angular/core';
import { ClassesIntrfc, SchoolIntrfc } from '../../modules';
import { schoolClassesData } from '../../school.data';

@Component({
  selector: 'app-filter-class',
  imports: [],
  templateUrl: './filter-class-component.html',
  styleUrl: './filter-class-component.css',
})
export class FilterClassComponent {
@Input() allYearsAtSchool!:string;
private readonly allSchoolClasses = schoolClassesData;
schoolClassesData=signal<ClassesIntrfc[]>(this.allSchoolClasses)
get allClassesYear(){
  return this.allSchoolClasses.filter((tempvar)=>tempvar.yearClass===this.allYearsAtSchool)
}
}
