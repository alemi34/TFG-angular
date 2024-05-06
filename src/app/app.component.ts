import { AfterViewInit, Component } from '@angular/core';
import { Usuario } from './model/user';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'TFG';
  public user!: Usuario;

  constructor(private authService:AuthService){}

  ngAfterViewInit() {
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }
}
