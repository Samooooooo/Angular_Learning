import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, from, last, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  private apiUrl = 'https://api5.angular-buch.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`);
  }
  remove(isbn: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/books/${isbn}`);
  }
  removeall(books: Book[]): Observable<undefined> {
    return from(books).pipe(
      concatMap((book) =>
        this.http.delete(`${this.apiUrl}/books/${book.isbn}`),
      ),
      last(),
      map(() => undefined),
    );
  }

  loadBooks(): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/books`);
  }

  getAllSearch(term: string) {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search/${term}`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }
}
