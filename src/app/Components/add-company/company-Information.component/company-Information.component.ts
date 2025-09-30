import {Component, inject, OnInit, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RegisterCompanyService} from '../../../services/company/register-company.service';

@Component({
  selector: 'app-company-information',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="formStep" (ngSubmit)="next()" action="#" method="POST">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="company_name" class="block mb-2 text-sm font-medium text-gray-300">Nome da Empresa</label>
          <input type="text"
                 id="company_name"
                 formControlName="legalName"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="Tech Solutions Ltda" required>
          @if (formStep.get('legalName')?.invalid && formStep.get('legalName')?.touched){
            <div class="text-red-50 mt-5">O Nome legal não pode está vazio.</div>
          }
        </div>
        <div>
          <label for="company_doing_business_as" class="block mb-2 text-sm font-medium text-gray-300">Nome Fantasia</label>
          <input type="text"
                 id="company_doing_business_as"
                 formControlName="doingBusinessAs"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="Tech Solutions">
        </div>
        <div>
          <label for="cnpj" class="block mb-2 text-sm font-medium text-gray-300">CNPJ</label>
          <input type="text"
                 id="cnpj"
                 formControlName="cnpj"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="00.000.000/0001-00" required>
          @if (formStep.get('cnpj')?.invalid && formStep.get('cnpj')?.touched){
            <div class="text-red-50 mt-5">CNPJ não pode está vazio</div>
          }
        </div>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Email de Contato</label>
          <input type="email"
                 id="email"
                 formControlName="businessEmail"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="contato@techsolutions.com">
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-300">Telefone</label>
          <input type="tel"
                 id="phone"
                 formControlName="phoneNumber"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="(11) 99999-9999" required>
          @if (formStep.get('phoneNumber')?.invalid && formStep.get('phoneNumber')?.touched){
            <div class="text-red-50 mt-5">Celular não pode está vazio</div>
          }
        </div>
      </div>
      <div class="mt-8 flex justify-end">
        <button
          type="submit"
          [disabled]="formStep.invalid"
          class="w-full md:w-auto bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800
               font-medium rounded-lg text-sm px-8 py-3 text-center transition-colors duration-300"
        >
          Proximo
        </button>
      </div>
    </form>
  `
})
export class CompanyInformationComponent {
  private formRegisterService = inject(RegisterCompanyService);

  onComplete = output<void>();

  formStep: FormGroup = this.formRegisterService.getStep('companyInformation');

  next() : void {
    if(this.formStep.valid){
      this.onComplete.emit();
    }else {
      this.formStep.markAllAsTouched();
    }
  }
}
