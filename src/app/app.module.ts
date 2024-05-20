import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule}  from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VentaComponent } from './venta/venta.component';
import { HistoricoFacturaComponent } from './historico-factura/historico-factura.component';
import { HistoricoVentaComponent } from './historico-venta/historico-venta.component';
import { PagarComponent } from './pagar/pagar.component';
import { FormsModule } from '@angular/forms';
import { EditarVentaComponent } from './editar-venta/editar-venta.component';
import { NgxPayPalModule } from 'ngx-paypal';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    InicioComponent,
    LoginComponent,
    GameDetailComponent,
    PerfilComponent,
    VentaComponent,
    HistoricoFacturaComponent,
    HistoricoVentaComponent,
    PagarComponent,
    EditarVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
