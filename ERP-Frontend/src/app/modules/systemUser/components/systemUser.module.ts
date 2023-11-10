import { AgGridModule } from 'ag-grid-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
// Shared components from admin module

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';


@NgModule({
  declarations: [

     LeftSidebarComponent,
     DashboardComponent,
     HomeComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    AgGridModule,
    NgxDropzoneModule,
    NgSelectModule, FormsModule, ReactiveFormsModule,
    ToastrModule
  ],
  exports: [
    LeftSidebarComponent,
  
  ]
})
export class AdminModule { }
