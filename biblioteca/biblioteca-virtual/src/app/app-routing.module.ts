import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'book-collection', component: BookCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, CommonModule, NgIf, NgFor, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
