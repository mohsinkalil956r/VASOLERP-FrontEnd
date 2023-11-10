import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { FormConsolidationComponent } from './components/form-consolidation/form-consolidation.component';
import { FormConsolidationCreateComponent } from './components/form-consolidation-create/form-consolidation-create.component';
import { FormConsolidationDetailComponent } from './components/form-consolidation-detail/form-consolidation-detail.component';
import { FormSubmissionsComponent } from './components/form-submissions/form-submissions.component';
import { FormSubmissionCreateComponent } from './components/form-submission-create/form-submission-create.component';
import { FormSubmissionDetailComponent } from './components/form-submission-detail/form-submission-detail.component';
import { MbrListComponent } from './components/mbr-list/mbr-list.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [

      { path: 'dashboard', component: ProviderDashboardComponent },
      { path: 'mbr-list', component: MbrListComponent },
      { path: 'form-consolidaton', component: FormConsolidationComponent },
      { path: 'form-consolidaton-create', component: FormConsolidationCreateComponent },
      { path: 'form-consolidaton-detail', component: FormConsolidationDetailComponent },
      { path: 'form-submissions', component: FormSubmissionsComponent },
      { path: 'form-submissions-create', component: FormSubmissionCreateComponent },
      { path: 'form-submissions-detail', component: FormSubmissionDetailComponent },
      { path: '', redirectTo: '/provider/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
