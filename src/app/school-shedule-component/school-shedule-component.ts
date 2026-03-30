import { Component, computed, inject, Input } from '@angular/core';
import { ClassSheduleComponent } from './class-shedule-component/class-shedule-component';
import { schoolSheduleData } from '../school.data';
import { SchoolService } from '../school.service';
@Component({
  selector: 'app-school-shedule',
  imports: [ClassSheduleComponent],
  templateUrl: './school-shedule-component.html',
  styleUrl: './school-shedule-component.css',
})
export class SchoolSheduleComponent {
  @Input({ required: true }) years!: string;
  private schoolService = inject(SchoolService);
  classShedule = computed(() => {
    return this.schoolService.schoolShedule().filter((tempvar) => tempvar.yearClass === this.years);
  });
}
