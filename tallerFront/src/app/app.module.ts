import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import { OrdenComponent } from './components/orden/orden.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  {
    path:
      'login',
    loadChildren: () => import('./components/login/login/login.module').then(m => m.LoginModule)
  },
  {
    path:
      'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {path:'**',redirectTo:'login'}
];

registerLocaleData(localeEs, 'es-AR');


@NgModule({
  declarations: [
    AppComponent,
    OrdenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RouterModule,
  ]
})
export class AppModule { }


