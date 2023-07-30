import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from '../book-list/book-list.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookListItemComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
  ],
  exports: [
    BookListComponent,
    BookDetailsComponent,
  ]
})
export class BooksModule { }
