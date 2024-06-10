import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GutendexService } from '../gutendex.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: any;
  proxyUrl: string = '';
  previewContent: string = '';
  downloadUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private gutendexService: GutendexService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.gutendexService.getBookById(+id).subscribe(data => {
        this.book = data;
        this.proxyUrl = `http://localhost:8080/api/proxy/${id}/html`;

        // Fetch preview content from the proxy
        fetch(this.proxyUrl)
          .then(response => response.text())
          .then(html => {
            this.previewContent = html;
          })
          .catch(error => {
            console.error('Error fetching preview content', error);
          });

        // Set download URL to the second format
        const formatKeys = Object.keys(this.book.formats);
        if (formatKeys.length > 1) {
          this.downloadUrl = this.book.formats[formatKeys[2]];
        }
      });
    } else {
      console.error('No se proporcionó un ID de libro válido.');
    }
  }

  openFormat(url: string): void {
    window.open(url, '_blank');
  }
}
