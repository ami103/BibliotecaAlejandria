import { TestBed } from '@angular/core/testing';

import { FavoriteBookService } from './favorite-book.service';

describe('FavoriteBookService', () => {
  let service: FavoriteBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
