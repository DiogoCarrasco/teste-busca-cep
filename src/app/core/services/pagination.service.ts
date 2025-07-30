import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../models/pagination.model';

@Injectable({ providedIn: 'root' })
export class PaginationService<T> {
  private itemsSubject = new BehaviorSubject<T[]>([]);
  private currentPageSubject = new BehaviorSubject<number>(1);
  private itemsPerPageSubject = new BehaviorSubject<number>(5);
  private totalItemsSubject = new BehaviorSubject<number>(0);

  readonly items$ = this.itemsSubject.asObservable();
  readonly currentPage$ = this.currentPageSubject.asObservable();
  readonly itemsPerPage$ = this.itemsPerPageSubject.asObservable();
  readonly totalItems$ = this.totalItemsSubject.asObservable();

  readonly totalPages$ = combineLatest([
    this.totalItems$,
    this.itemsPerPage$
  ]).pipe(
    map(([total, perPage]) => Math.ceil(total / perPage) || 0)
  );

  readonly pageNumbers$ = this.totalPages$.pipe(
    map(totalPages => Array.from({ length: totalPages }, (_, i) => i + 1))
  );

  readonly paginatedItems$ = combineLatest([
    this.currentPage$,
    this.itemsPerPage$,
    this.items$
  ]).pipe(
    map(([page, perPage, items]: [number, number, T[]]) => {
      const pageNum = Number(page);
      const perPageNum = Number(perPage);
      const start = (pageNum - 1) * perPageNum;
      return items.slice(start, start + perPageNum);
    })
  );

  readonly paginationInfo$ = combineLatest([
    this.currentPage$,
    this.itemsPerPage$,
    this.totalItems$
  ]).pipe(
    map(([page, perPage, total]) => {
      const start = (page - 1) * perPage + 1;
      const end = Math.min(page * perPage, total);
      return { start, end, total };
    })
  );

  setItems(items: T[]): void {
    this.itemsSubject.next(items || []);
    this.totalItemsSubject.next((items || []).length);
    this.validateCurrentPage();
  }

  setItemsPerPage(count: number): void {
    this.itemsPerPageSubject.next(count);
    this.validateCurrentPage();
  }

  goToPage(page: number): void {
    this.totalPages$.subscribe(totalPages => {
      if (page >= 1 && page <= totalPages) {
        this.currentPageSubject.next(page);
      }
      this.validateCurrentPage();
    }).unsubscribe();
  }

  nextPage(): void {
    this.currentPage$.subscribe(page => {
      this.goToPage(page + 1);
    }).unsubscribe();
  }

  prevPage(): void {
    this.currentPage$.subscribe(page => {
      this.goToPage(page - 1);
    }).unsubscribe();
  }

  private validateCurrentPage(): void {
    this.totalPages$.subscribe(totalPages => {
      const currentPage = this.currentPageSubject.value;
      if (currentPage > totalPages) {
        this.currentPageSubject.next(totalPages > 0 ? totalPages : 1);
      }
      if (currentPage < 1) {
        this.currentPageSubject.next(1);
      }
    }).unsubscribe();
  }
}