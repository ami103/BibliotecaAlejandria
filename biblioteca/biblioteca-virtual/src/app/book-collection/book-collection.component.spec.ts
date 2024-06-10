import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})
export class BookCollectionComponent implements OnInit {
removeFavorite(_t6: any,$event: MouseEvent) {
throw new Error('Method not implemented.');
}
removeFromFavorites(_t6: any) {
throw new Error('Method not implemented.');
}
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

  goToDetail(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
