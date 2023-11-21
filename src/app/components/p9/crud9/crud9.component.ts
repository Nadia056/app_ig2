import { Component, ViewChild } from '@angular/core';
import Echo from 'laravel-echo';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';
import { P9ServiceService } from 'src/app/services/p9/p9-service.service';

@Component({
  selector: 'app-crud9',
  templateUrl: './crud9.component.html',
  styleUrls: ['./crud9.component.css']
})
export class Crud9Component {
  constructor(private crud:P9ServiceService
    
    ) {}
  @ViewChild('bookForm', { static: false }) vehicleForm: any;
  book = { title: '', author: '', description: ''};

  ngOnInit(): void {
    this.webSocket();
  }

  submitForm() {
    this.crud.bookStore(this.book).subscribe(response => {
      if (response.status=200) {
        window.alert('Book added successfully');
        this.vehicleForm.reset();
       
       
      }

    });
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
    console.log('Received WebSocket message');
    console.log(data);
  });
}



}
