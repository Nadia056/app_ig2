import { Component, OnDestroy, OnInit, VERSION, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs';
import { P7ServiceService } from 'src/app/services/p7/p7-service.service';

@Component({
  selector: 'app-crud7',
  templateUrl: './crud7.component.html',
  styleUrls: ['./crud7.component.css']
})
export class Crud7Component  {
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
