import {Component, inject, OnInit} from '@angular/core';
import {
  AdditionalInformationComponent
} from '../../../Components/add-company/additional-information.component/additional-information.component';
import {
  AddressInformationComponent
} from '../../../Components/add-company/address-information.component/address-information.component';
import {
  CompanyInformationComponent
} from '../../../Components/add-company/company-Information.component/company-Information.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {CompanyFormService} from '../../../services/company/company-form.service';
import {CompanyService} from '../../../services/company/company.service';
import {LoadingComponent} from '../../../Components/loading.component/loading.component';
import {type} from 'node:os';

@Component({
  selector: 'app-update-company',
  imports: [
    AdditionalInformationComponent,
    AddressInformationComponent,
    CompanyInformationComponent,
    LoadingComponent,
    FaIconComponent,
    RouterLink
  ],
  template: `
    <div>
      <div class="glassmorphism rounded-2xl p-6 lg:p-8">
        <div class="flex items-center mb-6">
          <button routerLink="../" class="mr-4 text-xl p-2 hover:bg-white/10 rounded-full cursor-pointer">
            <fa-icon [icon]="faArrowLeft"></fa-icon>
          </button>
          <h3 class="text-2xl font-semibold">Atualizar {{companyName}}</h3>
        </div>

        <loading-component [loadingStatus]="isLoading">
          @switch (currentStep) {
            @case (1) {
              <app-company-information
                [updateMode]="true"
                (onComplete)="nextStep()">
              </app-company-information>
            }
            @case (2) {
              <app-address-information
                (onComplete)="nextStep()"
                (onBack)="backStep()">
              </app-address-information>
            }
            @case (3) {
              <app-additional-information
                (onComplete)="completeUpdate()"
                (onBack)="backStep()">
              </app-additional-information>
            }
          }
        </loading-component>
      </div>
    </div>
  `
})
export class UpdateCompany implements OnInit{
  private route = inject(ActivatedRoute);
  companyId: string = this.route.snapshot.params['id'];

  private companyServices = inject(CompanyService);
  private companyFormServices = inject(CompanyFormService);
  private router = inject(Router);

  protected readonly faArrowLeft = faArrowLeft;

  currentStep: number = 1;
  companyName!: string;

  isLoading: boolean = true;

  ngOnInit(): void {
    const data = this.companyServices.getCompany(this.companyId).subscribe({
      next: response => {
        this.companyFormServices.loadData(response);
        this.companyName = response.legalName;
      },
      error: err => {
        console.error('Erro ao carregar a empresa');
      }
    });
    this.isLoading = false;
  }

  completeUpdate(): void {
    const data = <RequestRegisterCompany>this.companyFormServices.getData();
    this.companyServices.update(this.companyId, data).subscribe({
      next: response => this.router.navigateByUrl('/admin/companies'),
      error: err => console.error('Não foi possivel editar essa empresa')
    });
  }

  nextStep(): void{
    this.currentStep += 1;
  }

  backStep(): void {
    this.currentStep -= 1;
  }
}
