
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

import { ProviderRoutingModule } from './provider-routing.module';

// Provider components
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { MbrListComponent } from './components/mbr-list/mbr-list.component';
import { FormSubmissionsComponent } from './components/form-submissions/form-submissions.component';
import { FormSubmissionCreateComponent } from './components/form-submission-create/form-submission-create.component';
import { FormSubmissionDetailComponent } from './components/form-submission-detail/form-submission-detail.component';
import { FormConsolidationComponent } from './components/form-consolidation/form-consolidation.component';
import { FormConsolidationCreateComponent } from './components/form-consolidation-create/form-consolidation-create.component';
import { FormConsolidationDetailComponent } from './components/form-consolidation-detail/form-consolidation-detail.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    ProviderDashboardComponent,
    MbrListComponent,
    FormSubmissionsComponent,
    FormSubmissionCreateComponent,
    FormSubmissionDetailComponent,
    FormConsolidationComponent,
    FormConsolidationCreateComponent,
    FormConsolidationDetailComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    AdminModule,
    ProviderRoutingModule,
    AgGridModule,
    NgxDropzoneModule,
    NgSelectModule, FormsModule, ReactiveFormsModule,
    ToastrModule
  ]
})
export class ProviderModule { }
