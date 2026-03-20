import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';
import { FilterBarComponent } from './filter-bar-component/filter-bar-component';
import { SchoolSheduleComponent } from './school-shedule-component/school-shedule-component';
import { schoolSheduleData } from './school.data';
import { SchoolIntrfc } from './modules';
//- - - - -
const dayMs = 86400000;

//- - - - -
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, FilterBarComponent, SchoolSheduleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly fullSchoolShedule = schoolSheduleData;
  schoolShedule = signal<SchoolIntrfc[]>(this.fullSchoolShedule);
  //- - - - - -
  currentDate = new Date();

  onMonth() {
    const now = new Date(this.currentDate);
    const curMn = now.getMonth();
    const curYr = now.getFullYear();
    //- - -
    const filteredShedule = this.fullSchoolShedule.filter((temp) => {
      const tempObjctDate = new Date(temp.date);
      return tempObjctDate.getMonth() === curMn && tempObjctDate.getFullYear() === curYr;
    });
    this.schoolShedule.set(filteredShedule);
  }
  onWeek() {
    //today and set hours
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    //find a day week
    const todayMs = today.getTime(); //same thing like a date.parse();
    //check if it is a saturday
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
    const dayMs = 86400000;
    //find a modayMs and saturdayMs
    const monMs = todayMs - (dayOfWeek - 1) * dayMs; //
    const satMs = monMs + 7 * dayMs - 1;
    //filter a data
    const filteredShedule = this.fullSchoolShedule.filter((tempvar) => {
      const sheduleDateObjctMs = Date.parse(tempvar.date);
      return sheduleDateObjctMs >= monMs && sheduleDateObjctMs <= satMs;
    });
    this.schoolShedule.set(filteredShedule);
  }
  onDay() {
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();
    const dayMs = 86400000;
    //- - -
    const filteredShedule = this.fullSchoolShedule.filter((tempvar) => {
      const sheduleDateObjctMs = Date.parse(tempvar.date);
      return sheduleDateObjctMs >= todayMs && sheduleDateObjctMs <= todayMs + dayMs - 1;
    });
    this.schoolShedule.set(filteredShedule);
  }
  onToday() {
    //trzeba zresetowac date do dziszejsze, alboż zostanie zachowana ostania, którą kliknął użytkownik, lecz nie aktualna
    this.currentDate = new Date();
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    const dayMs = 86400000;
    const todayMs = today.getTime();
    const filteredShedule = this.fullSchoolShedule.filter((tempvar) => {
      const sheduleDateObjctMs = Date.parse(tempvar.date);
      return sheduleDateObjctMs >= todayMs && sheduleDateObjctMs <= todayMs + dayMs - 1;
    });
    this.schoolShedule.set(filteredShedule);
  }
  onInDecrease(type: 'day' | 'week' | 'month', direction: 'decrease' | 'increase') {
    const modifirer = direction === 'increase' ? 1 : -1;
    //- - - - -
    switch (type) {
      case 'day':
        this.currentDate = new Date(this.currentDate.getTime() + modifirer * dayMs);
        this.onDay();
        break;
      case 'week':
        this.currentDate = new Date(this.currentDate.getTime() + modifirer * 7 * dayMs);
        this.onWeek();
        break;
      case 'month':
        const newDate = new Date(this.currentDate);
        newDate.setMonth(this.currentDate.getMonth() + modifirer);
        this.currentDate = newDate;
        //wyjatek month, łątwiej jest wyodrebnić miesiące po przezobiekty niż obliczać sekudny ze względu na nieregularność dni w miesiącu
        this.onMonth();
        break;
    }
    //this.currentDate trzeba przekazywac do 'F' onDAY/WEEK/MONTH do konstruktora 'Date(. . . )', alboż nei zajdzie zmiana
  }
}
