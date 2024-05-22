import { Component } from '@angular/core';
import { Juego } from '../model/games';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from '../servicios/datos.service';
import { CarritoService } from '../servicios/carrito.service';
import { Usuario } from '../model/user';
import { AuthService } from '../servicios/auth.service';
import { Comentario } from '../model/comentario';
import { ComentarioService } from '../servicios/comentario.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  id!: number;
  game!: Juego;
  public user!: Usuario;
  public comentarios: Comentario[] = [];
  public nuevosComentario: Comentario = new Comentario
  public textocomentarios!: string
  public separatedWords: any;
  public categorias: string[] = [];


  constructor(public datosService: DatosService, private route: ActivatedRoute, private carrito: CarritoService, private authService: AuthService, private comentarioService: ComentarioService) { } // Agrega el servicio de usuarios

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idJuego'];

    this.datosService.getJuego(this.id).subscribe((juego: Juego) => {
      this.game = juego;
      this.categorias =this.game.categoria.split(',').map(word => word.trim());
      console.log(this.categorias)
    })
    this.datosService.getJuego(this.id).subscribe((juego: Juego) => {
      this.game = juego;
      this.categorias =this.game.categoria.split(',').map(word => word.trim());
      console.log(this.categorias)
    })
    this.user = this.authService.getUsuario()
    console.log(this.user)

    this.comentarioService.getByGame(this.id).subscribe((comentarios: Comentario[]) => {
      this.comentarios = comentarios;

      this.comentarios.forEach((comentario: Comentario) => {
        this.authService.getUserById(comentario.idUsuario).subscribe((usuario: Usuario) => {
          this.separatedWords = this.splitWordsByUppercase(usuario.nombreCompleto);
          comentario.nombreUsuario = this.separatedWords[0]+" :";
        });
      });
    })
  }

  nuevoComentario() {
    this.nuevosComentario.comentario = this.textocomentarios
    this.nuevosComentario.idJuego = this.game.idJuego
    this.nuevosComentario.idUsuario = this.user.idUsuario
    console.log(this.nuevosComentario)

    this.comentarioService.createComent(this.nuevosComentario).subscribe(response => {
      console.log('Comentario creado exitosamente', response);
      this.comentarioService.getByGame(this.id).subscribe((comentarios: Comentario[]) => {
        this.comentarios = comentarios;

        this.comentarios.forEach((comentario: Comentario) => {
          this.authService.getUserById(comentario.idUsuario).subscribe((usuario: Usuario) => {
            comentario.nombreUsuario = usuario.nombreCompleto;
          });
        });
      });
    }, error => {
      console.error('Error al crear el comentario', error);
    });
  }

  splitWordsByUppercase(input: string): string[] {
    return input.split(/(?=[A-Z])/).map(word => word.toLowerCase());
  }

  addTocart() {
    console.log(this.game)
    this.carrito.addToCart(this.game)
  }
}
