import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion | undefined;
  id: String | undefined;

  constructor(private _route: ActivatedRoute, public productoService: ProductosService) {}

  ngOnInit(): void {
    
    this._route.params.subscribe(parametros => {
      this.productoService.obtenerProducto(parametros['id'])
        .subscribe( (producto: any) => {
          this.id = parametros['id'];
          this.producto = producto;
        })
    })
  }
}
