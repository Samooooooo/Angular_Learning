import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from '../books/book-list/book-list.component';
import { BookDetailsComponent } from '../books/book-details/book-details.component';
import { BookListItemComponent } from '../books/book-list-item/book-list-item.component';
import { IsbnPipe } from './shared/isbn.pipe';
import { ConfirmDirective } from './shared/confirm.directive';
import { LoggedinOnlyDirective } from './shared/loggedin-only.directive';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookListItemComponent,
    IsbnPipe,
    ConfirmDirective,
    LoggedinOnlyDirective,
  ],
  imports: [CommonModule, BooksRoutingModule],
})
export class BooksModule {}
