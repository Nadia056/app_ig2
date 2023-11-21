import { Component, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';
import { io, Socket } from 'socket.io-client';
import { OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { P9ServiceService } from 'src/app/services/p9/p9-service.service';



@Component({
  selector: 'app-practica92',
  templateUrl: './practica92.component.html',
  styleUrls: ['./practica92.component.css']
})
export class Practica92Component implements OnInit {
  @ViewChild('contenido') contenido: any;


  selectedBook: Partial<Book> = {
    title: '',
    author: '',
    description: ''
  };
  id: number | undefined;
  books: Book[] = [];
  mensaje: any;

  constructor(private p9: P9ServiceService, private modal: NgbModal) {
   
  }

  ngOnInit(): void {
    this.webSocket();
    this.loadBooks();
  }

  webSocket()
  {
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'asdfgh',
      cluster: 'mt1',
      enableTransports: ['ws'],
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });
    echo.channel('channel-message').listen('MessageEvent', (data: any) => {
      this.mensaje = data.message;
      console.log(data);
      this.loadBooks(); // Update the table data when a new message is received
    });
  }

  editBook(book: Book) {
    this.id = book.id;
    this.selectedBook = {
      title: book.title,
      author: book.author,
      description: book.description
    };
    this.modal.open(this.contenido);
  }

  updateBook() {
    const id = this.id || 0;
    const book: Book = {
      title: this.selectedBook?.title || '',
      author: this.selectedBook?.author || '',
      description: this.selectedBook?.description || ''
    };

    this.p9.updateBook(id, book).subscribe((res) => {
      console.log(res);
      this.modal.dismissAll();
      this.loadBooks(); // Update the table data after the book is updated
    });
  }

  deleteBook(book: Book) {
    this.p9.deleteBook(book.id).subscribe((data: any) => {
      console.log(data);
      this.loadBooks(); // Update the table data after the book is deleted
    });
  }

  loadBooks() {
    this.p9.getBooks().subscribe((data: any) => {
      this.books = data;
      console.log(this.books, 'libros');
    });
  }
}