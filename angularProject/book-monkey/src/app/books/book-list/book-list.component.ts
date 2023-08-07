import { Component } from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [{ provide: BookStoreService }],
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(
    private service: BookStoreService,
    private router: Router,
  ) {
    this.books$ = this.service.getAll();
  }
  deleteAllBooks(books: Book[]) {
    if (window.confirm(` ( Delete all the Books )`)) {
      this.service
        .removeall(books)
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
  }
  resetBooks() {
    if (window.confirm(`Are you Sure ( Load the Books )`)) {
      this.service.loadBooks().subscribe();
      setTimeout(() => {
        this.router
          .navigateByUrl('/')
          .then(() => this.router.navigateByUrl('/books'));
      }, 1000);
    }
  }
}

// dynamicClass = 'my-dynamic-class';
// staticClass = 'my-static-class';
// isClassApplied = true;

// toggleClass(): void {
//   this.isClassApplied = !this.isClassApplied;
