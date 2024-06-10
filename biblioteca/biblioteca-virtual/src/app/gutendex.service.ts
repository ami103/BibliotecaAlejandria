import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GutendexService {
  private baseUrl = 'https://gutendex.com/books';

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, searchQuery: string = ''): Observable<any> {
    let url = `${this.baseUrl}?page=${page}`;
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    return this.http.get(url);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  fetchBookContent(url: string): Observable<string> {
    return this.http.get(`/fetchBookContent?url=${encodeURIComponent(url)}`, { responseType: 'text' });
  }
}
