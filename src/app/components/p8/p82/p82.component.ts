import { Component, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { P8ServiceService } from 'src/app/services/p8/p8-service.service';

@Component({
  selector: 'app-p82',
  templateUrl: './p82.component.html',
  styleUrls: ['./p82.component.css']
})
export class P82Component {

  selectedBook: Partial<Book> = {
    title: '',
    author: '',
    description: ''
  };
  constructor(private p4: P8ServiceService, private modal: NgbModal) { }
  
  @ViewChild('contenido') contenido: any;

  books: Book[] = [];
  id?: number;
  eventSource: EventSource | undefined;
  
  ngOnInit() {
    this.startEventSource();
  }
  
  startEventSource() {
    const eventSource = new EventSource('http://127.0.0.1:8000/sse');
  
    eventSource.addEventListener('message', (event) => {
      const bookData = JSON.parse(event.data);
      this.handleBookUpdate(bookData);
    });
  
    eventSource.addEventListener('error', (error) => {
      // Verificar si el estado del evento es 0 (No Connect)
      if (error.eventPhase === EventSource.CLOSED) {
        // No mostrar mensaje de error si el evento fue cerrado intencionalmente
        return;
      }
  
      console.error('Error with SSE connection:', error);
    });
  
    this.loadBooks();
  }
  
  
  loadBooks() {
    this.p4.getBooks().subscribe((data: any) => {
      this.books = data;
      console.log(this.books, 'librossss');
    });
  }
  
  handleBookUpdate(updatedBook: Book) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
    } else {
      this.books.push(updatedBook);
    }
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
    this.p4.updateBook(id, book).subscribe(
      (updatedBook: Book) => {
        this.handleBookUpdate(updatedBook);
        this.modal.dismissAll();
      },
      (error: any) => {
        console.error('Error updating book:', error);
        // Handle the error (display error message, etc.)
      }
    );
    this.modal.dismissAll();
  }
  


  deleteBook(book: Book) {
    this.p4.deleteBook(book.id).subscribe((data: any) => {
      console.log(data);
      const index = this.books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        this.books.splice(index, 1);
      }
    });
  }

  ngOnDestroy() {
    this.eventSource?.close();
  }
}
