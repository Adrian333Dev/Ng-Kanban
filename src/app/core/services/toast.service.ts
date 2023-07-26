import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  durationInSeconds = 10;
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, config?: MatSnackBarConfig) {
    this._snackBar.open(message, action, config);
  }

  showError(message: string) {
    const config: MatSnackBarConfig = {
      panelClass: ['custom-error-snackbar'],
      duration: this.durationInSeconds * 1000,
    };

    this.openSnackBar(message, 'Close', config);
  }
}
