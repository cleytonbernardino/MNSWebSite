import {Component, inject, OnInit} from '@angular/core';
import {faPencil, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CompanyService} from '../../../services/company/company.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../../Components/confirmation-dialog.component/confirmation-dialog.component';

class Icons {
  protected readonly faPencil = faPencil;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faPlus = faPlus;
}

@Component({
  selector: 'app-companies',
  imports: [FaIconComponent, RouterLink],
  styleUrl: './companies.scss',
  template: `
    <div class="flex-1 overflow-y-auto no-scrollbar">
    <!-- View: Company List -->
    <div id="company-list-view">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 class="text-2xl font-semibold mb-4 sm:mb-0">Gerenciamento de Empresas</h3>
        <button
          type="button"
          class="bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium
         rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 flex items-center cursor-pointer"
          routerLink="add"
        >
          <fa-icon [icon]="faPlus" class="mr-2"></fa-icon> Cadastrar Nova Empresa
        </button>
      </div>
      <div class="glassmorphism rounded-2xl p-6">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[640px]">
            <thead>
            <tr class="border-b border-white/20">
              <th class="p-3">Empresa</th>
              <th class="p-3">Responsável</th>
              <th class="p-3">Plano</th>
              <th class="p-3">Status</th>
              <th class="p-3">Ações</th>
            </tr>
            </thead>
            <tbody>
              @for (company of companies; track company.id) {
                <tr (click)="detail(company.id)" class="border-b border-white/10 hover:bg-white/5 cursor-pointer">
                  <td class="p-3">{{company.doingBusinessAs}}</td>
                  <td class="p-3">{{ company.managerName }}</td>
                  <td class="p-3">{{ company.subscriptionPlan }}</td>
                  <td class="p-3">
                    @if (company.subscriptionStatus) {
                      <span class="bg-green-500/50 text-green-100 px-2 py-1 rounded-full text-xs">
                    Ativo
                  </span>
                    } @else {
                      <span class="bg-red-500/50 text-green-100 px-2 py-1 rounded-full text-xs">
                    Desativado
                  </span>
                    }

                  </td>
                  <td class="p-3 space-x-2 text-lg">
                    <button
                      (click)="update(company.id)"
                      class="hover:text-purple-400 cursor-pointer">
                      <fa-icon [icon]="faPencil"></fa-icon>
                    </button>
                    <button
                      (click)="delete(company.id)"
                      class="hover:text-red-400 cursor-pointer">
                      <fa-icon [icon]="faTrashCan"></fa-icon>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  `
})
export class Companies extends Icons implements OnInit {
  private companyService = inject(CompanyService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public companies: ShortCompany[] = [];

  ngOnInit() {
    this.companyService.getCompanies().subscribe({
      next: res => this.companies = res.companies,
      error: err => console.error('Erro ao carregar os dados da empresa')
    })
  }

  detail(companyId: string): void {
    this.router.navigate([companyId], {relativeTo: this.route});
  }

  update(companyId: string): void {
    this.router.navigate([companyId, 'update'], {relativeTo: this.route})
  }

  delete(companyId: string) {
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
