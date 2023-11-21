import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicService } from 'src/app/services/TIC/tic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('contenido') contenido: any;
  id: number = 0;
  email: string = '';
  name: string = '';
  phone: string = '';
  password: string = '';
  password_confirmation: string = '';
 
  codigo: string = '';
  constructor(private modal: NgbModal, private p5:TicService,private route:Router) { }
  @ViewChild('form', { static: false }) form: any;
  ngOnInit(): void {}

  abrirC() {
    id: this.id;
  
    const form = {
      email: this.email,
      name: this.name,
      phone: this.phone,
      password: this.password,
      password_confirmation: this.password_confirmation,
      
    }
    this.email=this.email
    console.log("formulario",form);
    console.log("Email", this.email)

    this.p5.storeClient(form).subscribe(
      (res) => {
        console.log(res);
      
        if(res==201){
          alert("Successful");
          this.form.reset();
          this.route.navigate(['/login']);
        } 
       
        else if(res=401)
        {
          alert("Email error")
        }
        else if(res=400)
        {
          alert("Password incorrecto")
        }

      }
    );

    


    
   

  }
}
