import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { P8ServiceService } from 'src/app/services/p8/p8-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';

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
  constructor(private p4: P8ServiceService, private modal: NgbModal,private changeDetectorRef: ChangeDetectorRef,private ngZone: NgZone) { }
  
  @ViewChild('contenido') contenido: any;

  books: Book[] = [];
  id?: number;
  
  ngOnInit() {
    this.listenEventSource();
    
  }
  
  listenEventSource() {
    const eventSource = new EventSource('http://127.0.0.1:8000/api/event-source');
    eventSource.onmessage = (event) => {
      const updatedItems = JSON.parse(event.data);
      console.log(updatedItems, 'eventSource');
      this.books = updatedItems;
      console.log(this.books, 'Libros eventSource');
      this.changeDetectorRef.detectChanges();
      
    };
  }
  
  
  editBook(book: Book) {
    this.id = book.id;
    console.log(this.id, 'id');
    this.selectedBook = {
      title: book.title,
      author: book.author,
      description: book.description
    };
    console.log(this.selectedBook, 'libro');
    
  this.ngZone.run(() => {
    this.modal.open(this.contenido);
  });
  }

  updateBook() {
    const id= this.id;
    
    console.log(id, 'id en update');
    const book: Book = {
      title: this.selectedBook?.title || '',
      author: this.selectedBook?.author || '',
      description: this.selectedBook?.description || '',
    };
    this.p4.updateBook(id, book).subscribe(
      (updatedBook: Book) => {
        this.modal.dismissAll();
        this.listenEventSource();

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
        this.listenEventSource();

      }
    });
  }


}
