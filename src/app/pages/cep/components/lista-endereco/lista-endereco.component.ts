import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EnderecoItem } from '../../../../core/models/endereco.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { DirectionENUM } from 'src/app/core/enums/direction.enum';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-lista-endereco',
  templateUrl: './lista-endereco.component.html',
  styleUrls: ['./lista-endereco.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaEnderecoComponent implements OnInit, OnChanges {
  @Input() enderecos: EnderecoItem[] = [];
  @Output() deleteEndereco = new EventEmitter<string>();
  displayedColumns: string[] = ['cep', 'endereco', 'data', 'acoes'];

  paginatedEnderecos$ = this.paginationService.paginatedItems$;
  pageNumbers$ = this.paginationService.pageNumbers$;
  currentPage$ = this.paginationService.currentPage$;
  totalPages$ = this.paginationService.totalPages$;
  paginationInfo$ = this.paginationService.paginationInfo$;
  DirectionENUM = DirectionENUM;

  constructor(public paginationService: PaginationService<EnderecoItem>) {}

  ngOnInit(): void {
    this.paginationService.setItems(this.enderecos);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enderecos']) {
      this.paginationService.setItems(this.enderecos);
    }
  }

  onDelete(id: string): void {
    this.deleteEndereco.emit(id);
  }

  goToPage(page: number): void {
    this.paginationService.goToPage(page);
  }

  navigatePage(direction: DirectionENUM): void {
    if (direction === DirectionENUM.PREV) {
      this.paginationService.prevPage();
    } else {
      this.paginationService.nextPage();
    }
  }
}
