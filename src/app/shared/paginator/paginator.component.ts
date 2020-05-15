import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {BaseSearch} from '../model/base-search';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input()
  searchObject: BaseSearch;

  @Output()
  searchFunction: EventEmitter<any> =  new EventEmitter();

  arrPage: number[];

  constructor() { }

  ngOnInit(): void {
    this.redrawPage();
  }
  ngOnChanges(): void {
    this.redrawPage();
  }
  goToPage(page: number) {
    this.searchObject.page = page;
    this.searchFunction.emit();
    this.redrawPage();
  }

  previousPage() {
    if (this.searchObject.page > 0) {
      this.searchObject.page--;
      this.searchFunction.emit();
      this.redrawPage();
    }
  }

  nextPage() {
    if (this.searchObject.page < this.searchObject.totalPages - 1) {
      this.searchObject.page++;
      this.searchFunction.emit();
      this.redrawPage();
    }
  }

  redrawPage() {
    this.arrPage = [];
    const totalPages = this.searchObject.totalPages - 1;
    const page = this.searchObject.page;

    let start;
    let end;
    if ( page < 3 ) {
      start = 0;
      end = totalPages > 4 ? 4 : totalPages;
    } else {
      end = page + 1 >= totalPages ? totalPages : page + 2;
      start = end - page - 2 > 0 ? page - 2 : end - 4;
      start = start > 0 ? start : 0;
    }
    for (let i = start; i <= end; i++) {
      this.arrPage.push(i);
    }
  }

  // recursive() {
  //   if (this.searchObject.totalPages === undefined) {
  //     setTimeout(() => {this.recursive(); } , 500);
  //   }
  //   this.redrawPage();
  // }
}
