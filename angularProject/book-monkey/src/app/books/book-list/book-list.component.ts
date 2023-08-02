import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [{ provide: BookStoreService }],
})
export class BookListComponent {
  // dynamicClass = 'my-dynamic-class';
  // staticClass = 'my-static-class';
  // isClassApplied = true;

  // toggleClass(): void {
  //   this.isClassApplied = !this.isClassApplied;
  // }

  books: Book[] = [];

  constructor(private service: BookStoreService) {
    this.service.getAll().subscribe((books) => {
      this.books = books;
    });
  }
}
