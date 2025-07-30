import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaCepComponent } from './components/busca-cep/busca-cep.component';
import { ListaEnderecoComponent } from './components/lista-endereco/lista-endereco.component';
import { CepComponent } from './cep.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule.forChild([
      { path: "", component: CepComponent }
    ])
  ],
  declarations: [BuscaCepComponent, ListaEnderecoComponent, CepComponent],
})
export class CepModule {}
