import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Crud7Component } from './components/p7/crud7/crud7.component';
import { Crud8Component } from './components/p8/crud8/crud8.component';
import { Crud9Component } from './components/p9/crud9/crud9.component';
import { HttpClientModule } from '@angular/common/http';
import { P72Component } from './components/p7/p72/p72.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { P82Component } from './components/p8/p82/p82.component';
import { Practica92Component } from './components/p9/practica92/practica92.component';
import { GameComponent } from './components/TIC-TAC-TOE/game/game.component';
import { MenuComponent } from './components/TIC-TAC-TOE/menu/menu.component';
import { RegisterComponent } from './components/TIC-TAC-TOE/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    Crud7Component,
    Crud8Component,
    Crud9Component,
    P72Component,
    P82Component,
    Practica92Component,
    GameComponent,
    MenuComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
