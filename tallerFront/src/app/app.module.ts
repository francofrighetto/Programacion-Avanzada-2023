import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import { AutoComponent } from './components/auto/auto.component';
import { MarcaComponent } from './components/marca/marca.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { MatSelectModule } from '@angular/material/select';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: 'auto', component: AutoComponent },
  { path: 'marca', component: MarcaComponent },
  { path: 'modelo', component: ModeloComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'tecnico', component: TecnicoComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },

];

registerLocaleData(localeEs, 'es-AR');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutoComponent,
    MarcaComponent,
    ModeloComponent,
    ClienteComponent,
    TecnicoComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
