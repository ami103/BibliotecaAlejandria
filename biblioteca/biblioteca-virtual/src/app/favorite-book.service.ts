import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class FavoriteBookService {

  private apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addFavorite(book: Book): Observable<Book> {
    const favoriteBook = {
      bookId: book.id,
      title: book.title,
      subjects: book.subjects.join(', '),
      authors: book.authors.map(author => author.name).join(', '),
      translators: book.translators.map(translator => translator.name).join(', '),
      bookshelves: book.bookshelves.join(', '),
      languages: book.languages.join(', '),
      copyright: book.copyright,
      mediaType: book.media_type,
      formats: JSON.stringify(book.formats),
      downloadCount: book.download_count
    };
    return this.http.post<Book>(this.apiUrl, favoriteBook);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
