import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'left',
    verticalPosition: 'top'
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-success']
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-error']
    });
  }

  info(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-info']
    });
  }

  warning(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-warning']
    });
  }

  confirm(message: string, actionConfirm = 'Confirmar', actionCancel = 'Cancelar'): Observable<boolean> {
    const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(message, actionConfirm, {
      duration: 5000,
      panelClass: ['snackbar-warning']
    });

    return new Observable<boolean>(obs => {
      const sub = snackBarRef.onAction().subscribe(() => {
        obs.next(true);
        obs.complete();
      });
      snackBarRef.afterDismissed().subscribe(info => {
        if (!info.dismissedByAction) {
          obs.next(false);
          obs.complete();
        }
      });
      return () => sub.unsubscribe();
    });
  }
}
