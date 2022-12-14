import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  infoProductos: any[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise<void>((resolve, reject) => {
      this.http.get('https://proyecto-angular-html-default-rtdb.firebaseio.com/productos-idx.json')
        .subscribe((resp: any) => {
          this.infoProductos = resp;
          this.cargando = false;
          resolve();
        })
    })

  }

  obtenerProducto(id: String) {
    return this.http.get(`https://proyecto-angular-html-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if(this.infoProductos.length === 0) {
      // cargar producto
      this.cargarProductos().then( () => {
        // se ejecuta despues de obtener los productos
        // aplicar filtro
        this.filtrarProductos(termino)
      })
    }else{
      // aplicar el filtro
      // this.filtrarProductos(termino)
    }
  }

  private filtrarProductos( termino: string) {
    console.log(this.infoProductos);

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.infoProductos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino)) {
        this.productosFiltrado.push(prod)
      }
    })
  }
}
