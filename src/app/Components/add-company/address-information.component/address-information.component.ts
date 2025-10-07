import {Component, inject, Input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CompanyFormService} from '../../../services/company/company-form.service';

@Component({
  selector: 'app-address-information',
  imports: [
    ReactiveFormsModule
  ],
  template:`
    <form  [formGroup]="formStep" (ngSubmit)="next()" action="#" method="POST">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="cep" class="block mb-2 text-sm font-medium text-gray-300">CEP</label>
          <input type="text"
                 id="cep"
                 formControlName="cep"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="083883-282" required>
          @if (formStep.get('cep')?.invalid && formStep.get('cep')?.touched){
            <div class="text-red-50 mt-5">CEP não pode está vazio.</div>
          }
        </div>
        <div>
          <label for="address" class="block mb-2 text-sm font-medium text-gray-300">Endereço</label>
          <input type="text"
                 id="address"
                 formControlName="address"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="Avenida Palista" required>
          @if (formStep.get('address')?.invalid && formStep.get('address')?.touched){
            <div class="text-red-50 mt-5">Endereço não pode está vazio.</div>
          }
        </div>
        <div>
          <label for="address-number" class="block mb-2 text-sm font-medium text-gray-300">Número</label>
          <input type="text"
                 id="address-number"
                 formControlName="addressNumber"
                 class="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500
                     focus:border-purple-500 block w-full p-2.5" placeholder="22" required>
          @if (formStep.get('addressNumber')?.invalid && formStep.get('addressNumber')?.touched){
            <div class="text-red-50 mt-5">Número do empresa, não pode está vazio.</div>
          }
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
          Proximo
        </button>
      </div>
    </form>
  `
})
export class AddressInformationComponent {
  private companyFormService = inject(CompanyFormService);

  onComplete = output<void>();
  onBack = output<void>();

  formStep: FormGroup = this.companyFormService.getStep('addressInformation');

  next(): void {
    if (this.formStep.valid){
      this.onComplete.emit()
    } else {
      this.formStep.markAllAsTouched();
    }
  }

  back(): void {
    this.onBack.emit();
  }
}
