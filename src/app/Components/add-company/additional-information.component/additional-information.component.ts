import {Component, inject, Input, output} from '@angular/core';
import {CompanyFormService} from '../../../services/company/company-form.service';
import {ReactiveFormsModule, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-additional-information',
  imports: [
    ReactiveFormsModule
  ],
  template:`
    <form  [formGroup]="formStep" (ngSubmit)="next()" action="#" method="POST">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="whatsapp_api_number" class="block mb-2 text-sm font-medium text-gray-300">Número da api do Whatsapp</label>
          <input type="text" [disabled]="true"
                 id="whatsapp_api_number"
                 formControlName="whatsappApiNumber"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                       focus:border-purple-500 block w-full p-2.5" placeholder="+55 11 999999999">
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-300">Site da Empresa</label>
          <input type="text"
                 id="website"
                 formControlName="webSite"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                       focus:border-purple-500 block w-full p-2.5" placeholder="mms.com/medical">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="plan" class="block mb-2 text-sm font-medium text-gray-300">Plano</label>
            <select id="plan"
                    class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                         focus:border-purple-500 block w-full p-2.5">
              <option>Starter</option>
              <option>Pro</option>
              <option>Business</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-end gap-5">
        <button
          type="button"
          (click)="back()"
          class="w-full md:w-auto bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800
               font-medium rounded-lg text-sm px-8 py-3 text-center transition-colors duration-300"
        >
          Voltar
        </button>
        <button
          type="submit"
          [disabled]="formStep.invalid"
          class="w-full md:w-auto bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800
               font-medium rounded-lg text-sm px-8 py-3 text-center transition-colors duration-300"
        >
          Finalizar
        </button>
      </div>
    </form>
  `
})
export class AdditionalInformationComponent {
  private companyFormService = inject(CompanyFormService);

  onComplete = output<void>();
  onBack = output<void>();

  formStep: FormGroup = this.companyFormService.getStep('additionalInformation');

  next(): void {
    if (this.formStep.valid || this.formStep.invalid){
      this.onComplete.emit();
    }else {
      this.formStep.markAllAsTouched();
    }
  }

  back(): void {
    this.onBack.emit();
  }
}
