import {Component} from '@angular/core';
import {faBuilding, faDollarSign, faFileInvoiceDollar, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-control-panel-admin',
  imports: [FaIconComponent],
  templateUrl: './control-panel-admin.html',
  styleUrl: './control-panel-admin.scss'
})
export class ControlPanelAdmin {
  faUsers = faUsers;
  faBuilding = faBuilding;
  faDollarSign = faDollarSign;
  faFileInvoiceDollar = faFileInvoiceDollar;
}
