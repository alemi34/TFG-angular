import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VentaComponent } from './venta/venta.component';
import { HistoricoVentaComponent } from './historico-venta/historico-venta.component';
import { PagarComponent } from './pagar/pagar.component';
import { HistoricoFacturaComponent } from './historico-factura/historico-factura.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component:InicioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'details/:idJuego', component:GameDetailComponent},
  {path: 'perfil', component:PerfilComponent},
  {path: 'venta', component:VentaComponent},
  {path: 'ventas', component:HistoricoVentaComponent},
  {path: 'pagar', component:PagarComponent},
  {path: 'facturas', component:HistoricoFacturaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
