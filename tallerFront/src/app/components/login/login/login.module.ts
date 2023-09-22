import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
     children: [
       {path:
         '',
         component:LoginComponent
       },


     ]
   }

 ];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule // Agrega FormsModule a la lista de imports
  ],
  exports:[RouterModule]
})
export class LoginModule { 
}
