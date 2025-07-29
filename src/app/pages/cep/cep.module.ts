import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaCepComponent } from './components/busca-cep/busca-cep.component';
import { ListaEnderecoComponent } from './components/lista-endereco/lista-endereco.component';
import { CepComponent } from './cep.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: CepComponent }
    ])
  ],
  declarations: [BuscaCepComponent, ListaEnderecoComponent, CepComponent],
})
export class CepModule {}
