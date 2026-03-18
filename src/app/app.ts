import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header-component/header-component';
import { FooterComponent } from './footer-component/footer-component';
import { FilterBarComponent } from './filter-bar-component/filter-bar-component';
import { SchoolSheduleComponent } from './school-shedule-component/school-shedule-component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,FooterComponent,FilterBarComponent,SchoolSheduleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
