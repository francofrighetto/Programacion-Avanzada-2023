import { Auto } from "./Auto";
import { Tecnico } from "./Tecnico";

export class Orden {
  descripcion?: string;
  auto?: any;
  tecnico?: any;
  estado?: boolean;
  startDate?: Date;
  endDate?: Date;
  total?: number;
  id?: number;
}
