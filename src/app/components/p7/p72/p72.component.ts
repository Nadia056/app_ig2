import { Component, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-p72',
  templateUrl: './p72.component.html',
  styleUrls: ['./p72.component.css']
})
export class P72Component {
  selectedBook: Partial<Book> = {
    title: '',
    author: '',
    description: ''
  };
  constructor(private p4: P7ServiceService, private modal: NgbModal) { }
  
  @ViewChild('contenido') contenido: any;

  books: Book[] = [];
  id?: number;
  pollInterval: number = 15000; // Set the polling interval to 15 seconds

  ngOnInit(): void {
    this.loadBooks();
    this.startLongPolling();
  }

  loadBooks() {
    this.p4.getBooks().subscribe((data: any) => {
      this.books = data;
      console.log(this.books, 'libros');
    });
  }

  startLongPolling() {
    const poll = () => {
      this.p4.getBooks().subscribe((data: any) => {
        this.books = data;
        console.log(this.books, 'libros');
        setTimeout(poll, this.pollInterval); // Start the next long polling request after the specified interval
      });
    };
    poll();
  }

  editBook(book: Book) {
    this.id = book.id;
    this.selectedBook = {
      title: book.title,
      author: book.author,
      description: book.description
    };
    console.log(this.selectedBook, 'libro');
    this.modal.open(this.contenido);
  }

  updateBook() {
    const id = this.id ?? 0;
    const book: Book = {
      title: this.selectedBook?.title || '',
      author: this.selectedBook?.author || '',
      description: this.selectedBook?.description || '',
    };
    console.log(book, 'actualizacion');
    this.p4.updateBook(id, book).subscribe((res) => {
      console.log(res);
      this.modal.dismissAll();
    });
  }

  deleteBook(book: Book) {
    this.p4.deleteBook(book.id).subscribe((data: any) => {
      console.log(data);
      this.startLongPolling(); // Restart long polling after deletion
    });
  }


  abrirC()
  {
    const id = this.id ?? 0;
    const book: Book = {
      title: this.selectedBook?.title || '',
      author: this.selectedBook?.author || '',
      description: this.selectedBook?.description || '',
    };
    console.log(book, 'actualizacion');
    this.p4.updateBook(id, book).subscribe((res) => {
      console.log(res);
      this.modal.dismissAll();
    });
  
  }
}
