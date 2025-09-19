import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
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

  private router = inject(Router)
  private authService: AuthService = inject(AuthService);

  public showPassword = signal<boolean>(false);
  public errorMessage = signal<string[]>([]);
  public isAuthenticated = this.authService.isAuthenticated();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get email () { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  togglePasswordVisibility(){
    this.showPassword.update(currentValue => !currentValue);
  }

  validForm(): boolean{
    this.loginForm.markAllAsTouched();
    return !this.loginForm.invalid;
  }

  onSubmit() {
    this.errorMessage.set([]);
    const isValidForm: boolean = this.validForm();
    if ( !isValidForm ) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => this.router.navigateByUrl('/admin'),
      error: (res) => {
        this.password.setValue('');
        this.errorMessage.set(res.error.errors);
      }
    });
  }
}
