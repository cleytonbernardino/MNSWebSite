import {Component, Input} from '@angular/core';

@Component({
  selector: 'loading-component',
  imports: [],
  styleUrl: './loading.component.scss',
  template: `
    @if (loadingStatus) {
      <div>Carregando...</div>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class LoadingComponent {
  @Input({required: false}) loadingStatus: boolean = true;
}
