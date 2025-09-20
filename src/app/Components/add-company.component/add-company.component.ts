import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-company.component',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss'
})
export class AddCompanyComponent {
  faArrowLeft = faArrowLeft
}
