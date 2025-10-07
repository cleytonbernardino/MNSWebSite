import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  faArrowLeft,
  faBuilding,
  faCircleCheck,
  faCircleUser,
  faCircleXmark,
  faEnvelope,
  faFileContract,
  faGlobe,
  faIdCard,
  faLocationDot,
  faMapLocationDot,
  faMapPin,
  faPencil,
  faPhone,
  faTrashCan,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import {CompanyService} from '../../../services/company/company.service';
import {LoadingComponent} from '../../../Components/loading.component/loading.component';
import {relative} from '@angular/compiler-cli';
import {
  ConfirmationDialogComponent, ConfirmationDialogData
} from '../../../Components/confirmation-dialog.component/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

class Icons {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faFileContract = faFileContract;
  protected readonly faUserTie = faUserTie;
  protected readonly faCircleCheck = faCircleCheck;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faCircleUser = faCircleUser;
  protected readonly faPhone = faPhone;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faLocationDot = faLocationDot;
  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faMapPin = faMapPin;
  protected readonly faPencil = faPencil;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faIdCard = faIdCard;
  protected readonly faGlobe = faGlobe;
  protected readonly faBuilding = faBuilding;
}

@Component({
  selector: 'detail-company',
  imports: [
    FaIconComponent,
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './detail-company.component.html'
})
export class DetailCompanyComponent extends Icons implements OnInit {
  private companyService = inject(CompanyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog)

  private companyId: string = this.route.snapshot.params['id'];

  companyData!: ResponseCompany;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.companyService.getCompany(this.companyId).subscribe({
      next: response => {
        this.companyData = response;
        this.isLoading = false;
      },
      error: err => {
        console.error('Erro ao caregar a empresa');
      }
    });
  }

  update(){
    this.router.navigate(['update'], {relativeTo: this.route});
  }

  delete() {
    const data: ConfirmationDialogData ={
      title: 'Operação Critica',
      message: 'Deseja mesmo excluir essa empresa?',
      confirmText: 'Sim',
      cancelText: 'Cancelar'
    }

    this.dialog.open(ConfirmationDialogComponent, {data})
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if(confirmed){
          window.location.reload();
        }else {
          return;
        }
      });
  }

}
