import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

export interface ConfirmationDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  template:  `
    <div>
      <h2 mat-dialog-title>{{ data.title || 'Confirmação' }}</h2>
      <mat-dialog-content>
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <div
        style="max-width: 600px;"
        >
          <button matButton="elevated" mat-dialog-close cdkFocusInitial>
            {{ data.cancelText || 'Cancelar' }}
          </button>
          <button matButton="elevated" mat-dialog-close >
            {{ data.confirmText || 'Confirmar' }}
          </button>
        </div>
      </mat-dialog-actions>
    </div>
  `
})
export class ConfirmationDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

}
