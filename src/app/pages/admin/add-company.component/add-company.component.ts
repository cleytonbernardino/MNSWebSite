import {Component, inject, OnInit} from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  CompanyInformationComponent
} from '../../../Components/add-company/company-Information.component/company-Information.component';
import {
  AddressInformationComponent
} from '../../../Components/add-company/address-information.component/address-information.component';
import {
  AdditionalInformationComponent
} from '../../../Components/add-company/additional-information.component/additional-information.component';
import {CompanyService} from '../../../services/company/company.service';
import {CompanyFormService} from '../../../services/company/company-form.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-company',
  imports: [FaIconComponent, RouterLink, CompanyInformationComponent, AddressInformationComponent, AdditionalInformationComponent],
  template: `
    <div>
      <div class="glassmorphism rounded-2xl p-6 lg:p-8">
        <div class="flex items-center mb-6">
          <button routerLink="../" class="mr-4 text-xl p-2 hover:bg-white/10 rounded-full cursor-pointer">
            <fa-icon [icon]="faArrowLeft"></fa-icon>
          </button>
          <h3 class="text-2xl font-semibold">Cadastrar Nova Empresa</h3>
        </div>

        @switch (currentStep) {
          @case (1) {
            <app-company-information
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
              (onComplete)="completeRegistration()"
              (onBack)="backStep()">
            </app-additional-information>
          }
        }
      </div>
    </div>
  `
})
export class AddCompanyComponent implements OnInit{
  private companyService = inject(CompanyService);
  private companyFormService = inject(CompanyFormService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  faArrowLeft = faArrowLeft

  currentStep: number = 1;
  errors: string[] = [];

  ngOnInit(): void {
    this.companyFormService.reset();
  }

  completeRegistration(): void{
    const request: RequestRegisterCompany = <RequestRegisterCompany> this.companyFormService.getData();

    this.companyService.register(request).subscribe({
      next: success => {
        this.router.navigate(['..'], { relativeTo: this.activeRoute });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.errors = err.error.errors;
        }
      }
    });

    for (let error in this.errors) {
      console.warn(error);
    }
  }

  nextStep(): void {
    this.currentStep += 1;
  }

  backStep(): void {
    this.currentStep -= 1;
  }
}
