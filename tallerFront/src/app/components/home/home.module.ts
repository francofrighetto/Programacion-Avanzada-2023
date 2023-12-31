import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AutoComponent } from '../auto/auto.component';
import { MarcaComponent } from '../marca/marca.component';
import { ModeloComponent } from '../modelo/modelo.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { TecnicoComponent } from '../tecnico/tecnico.component';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrdenComponent } from '../orden/orden.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ServicioComponent } from '../servicio/servicio.component';
import { InformesComponent } from '../informes/informes.component';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
 { path: '',
    children: [
      {path:
        '',
        component:HomeComponent
      },
      {path:
        'auto',
        component:AutoComponent
      },

      {path:
        'modelo',
        component:ModeloComponent,
      },
      {path:
        'marca',
        component:MarcaComponent
      },
      {path:
        'orden',
        component:OrdenComponent
      },

      {path:
        'cliente',
        component:ClienteComponent,
      },
      {path:
        'tecnico',
        component:TecnicoComponent,
      },
      {path:
        'orden',
        component:OrdenComponent,
      },
      {path:
        'servicio',
        component:ServicioComponent,
      },
      {path:
        'informe',
        component:InformesComponent,
      },
      { path: '**',
        redirectTo: '', pathMatch: 'full'
      },

    ]
  }

];

@NgModule({
  declarations: [
    HomeComponent,
    AutoComponent,
    ModeloComponent,
    ClienteComponent,
    TecnicoComponent,
    HeaderComponent,
    MarcaComponent,
    OrdenComponent,
    ServicioComponent,
    InformesComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule,
    NgChartsModule,
  ],
  exports: [RouterModule],

})
export class HomeModule { }
