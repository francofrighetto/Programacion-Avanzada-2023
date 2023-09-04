import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoComponent } from './auto.component';
import { Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: AutoComponent },
];

@NgModule({
  declarations: [
    AutoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AutoModule { }
