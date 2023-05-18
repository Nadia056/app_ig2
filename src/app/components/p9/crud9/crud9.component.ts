import { Component, ViewChild } from '@angular/core';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';

@Component({
  selector: 'app-crud9',
  templateUrl: './crud9.component.html',
  styleUrls: ['./crud9.component.css']
})
export class Crud9Component {
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
