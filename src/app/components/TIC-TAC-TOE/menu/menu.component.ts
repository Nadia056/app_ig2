import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TicService } from 'src/app/services/TIC/tic.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private p6:TicService,private route:Router) { }

  email='';
  password='';
  onSubmit()
  {
    const form={
      email:this.email,
      password:this.password
    }
    console.log(form);
    this.p6.login(form).subscribe(
      (res)=>{
       
          console.log(res);
          this.route.navigate(['/menu']);
          localStorage.setItem('token',res.token);

        
      }
    )
  }
}
