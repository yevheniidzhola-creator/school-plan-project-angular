import { Injectable, signal } from '@angular/core';
import { schoolSheduleData } from './school.data';
import { SchoolIntrfc } from './modules';
// - - - -
const dayMs = 86400000;
// - - - -
@Injectable({ providedIn: 'root' })
export class SchoolService {
  constructor() { this.onToday(); }
    private readonly fullSchoolShedule = schoolSheduleData;
    schoolShedule = signal<SchoolIntrfc[]>(this.fullSchoolShedule);
  //- - - - - -
  currentDate = new Date();
  //- - - - - -
  filterDateRange(startsMs: number, endMs: number) {
    const filteredShedule = this.fullSchoolShedule.filter((tempvar) => {
      const dateMs = Date.parse(tempvar.date + 'T00:00:00');
      return dateMs >= startsMs && dateMs <= endMs;
    });
    this.schoolShedule.set(filteredShedule);
  }
  //- - - - -
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
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
    //---
    const monMs = todayMs - (dayOfWeek - 1) * dayMs; //
    const satMs = monMs + 7 * dayMs - 1;
    //---
    this.filterDateRange(monMs, satMs);
  }
  onDay() {
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    //---
    const stMs = today.getTime();
    const endMs = stMs + dayMs - 1;
    //---
    this.filterDateRange(stMs, endMs);
  }
  onToday() {
    this.currentDate = new Date();
    this.onDay();
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
        this.onMonth();
        break;
    }
  }
  onDatePicker(sinceStr: string, toStr: string) {
    if (!sinceStr || !toStr) return;
    //- -
    const startMs = Date.parse(sinceStr + 'T00:00:00');
    const endMs = Date.parse(toStr + 'T23:59:59');
    //- -
    if (startMs > endMs) return;
    //- - - -
    this.filterDateRange(startMs, endMs);
  }
  resetDatePicker() {
    this.schoolShedule.set(this.fullSchoolShedule);
  }
}
