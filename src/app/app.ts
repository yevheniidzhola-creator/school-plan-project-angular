import { Component, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';
import { FilterBarComponent } from './filter-bar-component/filter-bar-component';
import { SchoolSheduleComponent } from './school-shedule-component/school-shedule-component';
import { DateRangeComponent } from './filter-bar-component/date-range-component/date-range-component';
import { FilterClassComponent } from './filter-bar-component/filter-class-component/filter-class-component';
import { schoolClassesData } from './school.data';
import { ClassesIntrfc } from './modules';
import { SchoolService } from './school.service';
@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    FilterBarComponent,
    SchoolSheduleComponent,
    DateRangeComponent,
    FilterClassComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // private readonly allSchoolClasses=schoolClassesData;
  // schoolClasses=signal<ClassesIntrfc[]>(this.allSchoolClasses)
  // onlyYears =[ ...new Set(this.allSchoolClasses.map((tempvar)=>tempvar.yearClass))];
  private schoolService = inject(SchoolService);

  onlyYears = computed(() => {
    const data = this.schoolService.schoolShedule();
    return [...new Set(data.map((tempvar) => tempvar.yearClass))];
  });
}
