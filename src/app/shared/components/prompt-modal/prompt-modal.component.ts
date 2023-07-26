import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromptModalMode } from '../../models/maps/prompt-modal-mode.map';

interface DialogData {
  mode: PromptModalMode;
  header: string;
  message: string;
}

@Component({
  selector: 'app-prompt-modal',
  template: `
    <h1 mat-dialog-title class="dialog-title">{{ data.header }}</h1>
    <div mat-dialog-content>
      <p
        [ngStyle]="{ color: data.mode === 'alert' ? 'black' : 'red' }"
        class="message"
      >
        {{ data.message }}
      </p>
    </div>
    <div mat-dialog-actions>
      <div class="actions">
        <button mat-raised-button (click)="cancel()">Cancel</button>
        <button
          mat-raised-button
          (click)="confirm()"
          [color]="data.mode === 'alert' ? 'primary' : 'warn'"
        >
          OK
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./prompt-modal.component.scss'],
})
export class PromptModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PromptModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
