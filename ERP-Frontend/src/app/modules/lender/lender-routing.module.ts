import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardLenderComponent } from './components/dashboard-lender/dashboard-lender.component';
import { ProductsMbrComponent } from './components/products-mbr/products-mbr.component';
import { MbrRequestComponent } from './components/mbr-request/mbr-request.component';
import { MbrRequestDetailComponent } from './components/mbr-request-detail/mbr-request-detail.component';
import { FormSubmissionComponent } from './components/form-submission/form-submission.component';
import { FormSubmissionDetailComponent } from './components/form-submission-detail/form-submission-detail.component';
import { WaiverRequestComponent } from './components/waiver-request/waiver-request.component';
import { WaiverRequestDetailComponent } from './components/waiver-request-detail/waiver-request-detail.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'dashboard-lender', component: DashboardLenderComponent },
      { path: 'products-mbr', component: ProductsMbrComponent },
      { path: 'mbr-request', component: MbrRequestComponent },
      { path: 'mbr-request-detail', component: MbrRequestDetailComponent },
      { path: 'form-submission', component: FormSubmissionComponent },
      { path: 'form-submission-detail', component: FormSubmissionDetailComponent },
      { path: 'waiver-request', component: WaiverRequestComponent },
      { path: 'waiver-request-detail', component: WaiverRequestDetailComponent },
      { path: '', redirectTo: '/lender/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LenderRoutingModule { }
