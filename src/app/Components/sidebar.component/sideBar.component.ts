import {Component, inject} from '@angular/core';
import {faArrowAltCircleRight, faBuilding, faCompass, faGem, faUser} from '@fortawesome/free-regular-svg-icons'
import {faGears} from '@fortawesome/free-solid-svg-icons'
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'sidebar-component',
  imports: [FaIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sideBar.component.html',
  styleUrl: './sideBar.component.scss'
})
export class SideBarComponent {
  faCompass = faCompass;
  faUser = faUser;
  faBuilding = faBuilding;
  faGem = faGem;
  faGears = faGears;
  faArrowAltCircleRight = faArrowAltCircleRight

  private authServices = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authServices.logout().subscribe({
      next: res => this.router.navigateByUrl('/login'),
      error: err => {
        console.error('Logout não foi realizado!')
      }
    });
  }
}
