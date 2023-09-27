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
        'cliente',
        component:ClienteComponent,
      },
      {path:
        'tecnico',
        component:TecnicoComponent,
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
    MarcaComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [RouterModule],

})
export class HomeModule { }