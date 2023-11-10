
import { AgGridModule } from 'ag-grid-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
// Shared components from admin module
import { MainNavigationComponent } from '../admin/components/main-navigation/main-navigation.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin/admin.module';

import { LenderRoutingModule } from './lender-routing.module';

// Lender componenet
import { HomeComponent } from './components/home/home.component';
import { DashboardLenderComponent } from './components/dashboard-lender/dashboard-lender.component';
import { ProductsMbrComponent } from './components/products-mbr/products-mbr.component';
import { MbrRequestComponent } from './components/mbr-request/mbr-request.component';
import { MbrRequestDetailComponent } from './components/mbr-request-detail/mbr-request-detail.component';
import { FormSubmissionComponent } from './components/form-submission/form-submission.component';
import { FormSubmissionDetailComponent } from './components/form-submission-detail/form-submission-detail.component';
import { WaiverRequestComponent } from './components/waiver-request/waiver-request.component';
import { WaiverRequestDetailComponent } from './components/waiver-request-detail/waiver-request-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardLenderComponent,
    ProductsMbrComponent,
    MbrRequestComponent,
    MbrRequestDetailComponent,
    FormSubmissionComponent,
    FormSubmissionDetailComponent,
    WaiverRequestComponent,
    WaiverRequestDetailComponent
  ],
  imports: [
    CommonModule,
    AdminModule,
    LenderRoutingModule,
    AgGridModule,
    NgxDropzoneModule,
    NgSelectModule, FormsModule, ReactiveFormsModule,
    ToastrModule
  ],
  exports: [
  ]
})
export class LenderModule { }
