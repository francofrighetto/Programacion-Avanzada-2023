import { Auto } from "./Auto";
import { DetalleOrden } from "./DetalleOrden";
import { Estado } from "./Estado";
import { Tecnico } from "./Tecnico";

export class Orden {
  descripcion?: string;
  auto?: any;
  tecnico?: any;
  habilitado?: boolean;
  fechaInicio?: string;
  fechaFin?: string;
  total: number=0;
  id?: number;
  detalle:DetalleOrden[]=[];
  estado:Estado = new Estado;
}
