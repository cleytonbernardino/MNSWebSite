import {Component, effect, inject, OnInit} from '@angular/core';
import {faPencil, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RouterLink} from '@angular/router';
import {CompanyService} from '../../../services/company.service';

@Component({
  selector: 'app-companies',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './companies.html',
  styleUrl: './companies.scss'
})
export class Companies implements OnInit {
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faPlus = faPlus;

  private companyService = inject(CompanyService);

  public companies: Company[] = [];

  ngOnInit() {
    this.companyService.getCompanies().subscribe({
      next: res => this.companies = res.companies,
      error: err => console.error('Erro ao carregar os dados da empresa')
    })
  }
}
