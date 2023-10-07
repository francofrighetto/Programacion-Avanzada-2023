import { Auto } from "./Auto";
import { Tecnico } from "./Tecnico";

export class Orden {
  descripcion?: string;
  auto?: any;
  tecnico?: any;
  estado?: boolean;
  fechaInicio?: Date;
  fechaFin?: Date;
  total?: number;
  id?: number;
}
