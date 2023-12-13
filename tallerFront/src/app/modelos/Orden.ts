import { Auto } from "./Auto";
import { DetalleOrden } from "./DetalleOrden";
import { Estado } from "./Estado";
import { Tecnico } from "./Tecnico";

export class Orden {
  descripcion?: string;
  auto?: any;
  tecnico?: any;
  habilitado?: boolean;
  estado?: Estado;
  fechaInicio?: string;
  fechaFin?: string;
  total: number=0;
  id?: number;
  detalle:DetalleOrden[]=[];
}
