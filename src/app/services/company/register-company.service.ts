import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterCompanyService {
  private readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyInformation: this.fb.group({
        legalName: ['', [Validators.required]],
        doingBusinessAs: [''],
        businessEmail: [''],
        cnpj: ['', [Validators.required]],
        phoneNumber: ['']
      }),
      addressInformation: this.fb.group({
        cep: ['', [Validators.required]],
        address: ['', [Validators.required]],
        addressNumber : ['', [Validators.required]]
      }),
      additionalInformation: this.fb.group({
        whatsappApiNumber: [''],
        webSite: ['']
      })
    })
  }

  getStep(step: 'companyInformation' | 'addressInformation' | 'additionalInformation') : FormGroup {
    return this.form.get(step) as FormGroup;
  }

  getFullForm(): FormGroup{
    return this.form;
  }

  reset(): void {
    this.form.reset();
  }

  convertToRequest(): object {
    const companyInfo = this.getStep('companyInformation');
    const addressInfo = this.getStep('addressInformation');
    const additionalInfo = this.getStep('additionalInformation');

    return {
      ...companyInfo.value,
      ...addressInfo.value,
      ...additionalInfo.value
    }
  }
}
