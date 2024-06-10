import { Component, OnInit } from '@angular/core';
import { GutendexService } from '../gutendex.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteBookService } from '../favorite-book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  favorites: Book[] = [];
  noResultsMessage: string = '';
  page: number = 1;
  searchQuery: string = '';

  constructor(
    private gutendexService: GutendexService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteBookService: FavoriteBookService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.page = 1;
      this.getBooks();
    });
    this.getFavorites();
  }

  getFavorites(): void {
    this.favoriteBookService.getFavorites().subscribe(favorites => this.favorites = favorites);
  }

  getBooks() {
    this.gutendexService.getBooks(this.page, this.searchQuery).subscribe(data => {
      this.books = data.results.map((book: Book) => {
        if (book.title.includes(';') || book.title.includes(':')) {
          book.title = book.title.split(/[:;]/)[0];
        }
        if (!book.authors || book.authors.length === 0) {
          book.authors = [{ name: 'Autor desconocido' }];
        }
        return book;
      });
      if (data.count === 0) {
        this.noResultsMessage = `No results for "${this.searchQuery}"`;
      } else {
        this.noResultsMessage = '';
      }
    });
  }

  goToDetail(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  toggleFavorite(book: any, event: Event): void {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.isFavorite(book)) {
      favorites = favorites.filter((favBook: any) => favBook.id !== book.id);
    } else {
      favorites.push(book);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  isFavorite(book: any): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((favBook: any) => favBook.id === book.id);
  }  

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getBooks();
      window.scrollTo(0, 0);
    }
  }

  nextPage(): void {
    this.page++;
    this.getBooks();
    window.scrollTo(0, 0);
  }
}
