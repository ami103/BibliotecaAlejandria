import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {
  favoriteBooks: any[] = [];
  noResultsMessage: string = 'No books in your collection yet.';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadFavoriteBooks();
  }

  loadFavoriteBooks(): void {
    this.favoriteBooks = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.favoriteBooks.length === 0) {
      this.noResultsMessage = 'No books in your collection yet.';
    } else {
      this.noResultsMessage = '';
    }
  }

  removeFromFavorites(book: any): void {
    this.favoriteBooks = this.favoriteBooks.filter(favBook => favBook.id !== book.id);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteBooks));
    if (this.favoriteBooks.length === 0) {
      this.noResultsMessage = 'No books in your collection yet.';
    }
  }

  goToDetail(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
