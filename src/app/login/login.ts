import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/authService';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FaIconComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  private authService: AuthService = inject(AuthService);
  public showPassword: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get email () { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  // Capturar quem chamou logo passando com html
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  validForm(): boolean{
    this.loginForm.markAllAsTouched();
    return !this.loginForm.invalid;
  }

  onSubmit() {
    const isValidForm: boolean = this.validForm();
    if ( !isValidForm ) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => console.log('Login OK', res),
      error: (res) => {
        const editor = new HTMLEditor();

        if (res.status === 500){
          editor.serverOut();
          return;
        }

        editor.addErrors(res.error.errors);
        this.password.setValue('');
      }
    });
  }
}

class HTMLEditor {
  createDiv(){
    const element = document.createElement('div');
    element.classList.add('text-red-500', 'text-sm');
    return element;
  }

  getErroContainer(){
    const element = document.querySelector('#error-container');
    if (element !== null)
      element.innerHTML = '';

    return element;
  }

  serverOut() {
    const errorTag = document.querySelector('#server-error');
    errorTag?.classList.remove('hidden');
  }

  addErrors(errors: string[]) {
    const errorContainer = this.getErroContainer();
    if (errorContainer === null){
      console.error('Error container not found');
      return;
    }

    for (let error of errors) {
      const errorElement = this.createDiv();
      errorElement.textContent = error;
      errorContainer.appendChild(errorElement);
    }
  }
}
