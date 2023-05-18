import { Component, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';
import { P8ServiceService } from 'src/app/services/p8/p8-service.service';

@Component({
  selector: 'app-crud8',
  templateUrl: './crud8.component.html',
  styleUrls: ['./crud8.component.css']
})
export class Crud8Component {
  constructor(private crud:P7ServiceService) {}
  @ViewChild('bookForm', { static: false }) vehicleForm: any;
  book = { title: '', author: '', description: ''};

  ngOnInit(): void {}

  submitForm() {
    this.crud.bookStore(this.book).subscribe(response => {
      console.log(response);
      if (response.status=200) {
        window.alert('Book added successfully');
        this.vehicleForm.reset();
       
      }

    });
}
}
