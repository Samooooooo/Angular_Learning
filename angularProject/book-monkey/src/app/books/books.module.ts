import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from '../books/book-list/book-list.component';
import { BookDetailsComponent } from '../books/book-details/book-details.component';
import { BookListItemComponent } from '../books/book-list-item/book-list-item.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookListItemComponent,
  ],
  imports: [CommonModule, BooksRoutingModule],
  exports: [],
})
export class BooksModule {}
