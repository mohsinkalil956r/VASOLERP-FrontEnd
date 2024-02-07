import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { ProvidersFormConsolidationComponent } from './components/providers-form-consolidation/providers-form-consolidation.component';
import { ProvidersFormSubmissionComponent } from './components/providers-form-submission/providers-form-submission.component';
import { ThemeUiComponent } from './components/theme-ui/theme-ui.component';
import { PagesLogComponent } from './components/pages-log/pages-log.component';
import { ProvidersAddComponent } from './components/providers-add/providers-add.component';
import { ProvidersSubmissionDetailsComponent } from './components/providers-submission-details/providers-submission-details.component';
import { ConsolidationRequestComponent } from './components/consolidation-request/consolidation-request.component';
import { ConsolidationAddComponent } from './components/consolidation-add/consolidation-add.component';
import { LendersListComponent } from './components/lenders-list/lenders-list.component';
import { LendersAddComponent } from './components/lenders-add/lenders-add.component';
import { LendersMbrListComponent } from './components/lenders-mbr-list/lenders-mbr-list.component';
import { LendersMbrRequestComponent } from './components/lenders-mbr-request/lenders-mbr-request.component';
import { LendersWaiveListComponent } from './components/lenders-waive-list/lenders-waive-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ProvidersViewComponent } from './components/providers-view/providers-view.component';
import { LendersViewComponent } from './components/lenders-view/lenders-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { LendersWaiveRequestComponent } from './components/lenders-waive-request/lenders-waive-request.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminAuthenticationGuard } from './admin-authentication.guard';
import { PaymentModesComponent } from './components/payment-modes/payment-modes.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsAddComponent } from './components/clients-add/clients-add.component';
import { PaymentModeAddComponent } from './components/payment-mode-add/payment-mode-add.component';
import { ExpenseTypesComponent } from './components/expense-types/expense-types.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpenseAddComponent } from './components/expense-add/expense-add.component';
import { ExpenseTypeAddComponent } from './components/expense-type-add/expense-type-add.component';
import { EmployeeContactsComponent } from './components/employee-contacts/employee-contacts.component';
import { EmployeeContactAddComponent } from './components/employee-contact-add/employee-contact-add.component';
import { ClientContactsComponent } from './components/client-contacts/client-contacts.component';
import { ClientContactAddComponent } from './components/client-contact-add/client-contact-add.component';
import { AssetsComponent } from './components/assets/assets.component';
import { DepartmentComponent } from './components/department/department.component';
import { AssetTypesComponent } from './components/asset-types/asset-types.component';
import { AssetsAddComponent } from './components/asset-add/asset-add.component';
import { AssetTypesAddComponent } from './components/asset-types-add/asset-types-add.component';
import { Component } from 'ag-grid-community';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ItemBasicComponent } from './components/item-basic/item-basic.component';
import { ItemPriceComponent } from './components/item-price/item-price.component';
import { ItemComponent } from './components/item/item.component';


const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'providers-list', component: ProvidersListComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Providers" }},
    {path: 'providers-add', component: ProvidersAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Providers" }},
    {path: 'providers-add/:id', component: ProvidersAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Providers" }},
    {path: 'providers-view', component: ProvidersViewComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Providers" }},
    {path: 'providers-form-consolidation', component: ProvidersFormConsolidationComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "FormConsolidation" }},
    {path: 'consolidation-request', component: ConsolidationRequestComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "FormConsolidation" }},
    {path: 'consolidation-add', component: ConsolidationAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "FormConsolidation" }},
    {path: 'providers-form-submission', component: ProvidersFormSubmissionComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "FormSubmission" }},
    {path: 'providers-submission-details', component: ProvidersSubmissionDetailsComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "ProFormSubmissionviders" }},
    {path: 'lenders-list', component: LendersListComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Lenders" }},
    {path: 'lenders-add', component: LendersAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Lenders" }},
    {path: 'lenders-add/:id', component: LendersAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Lenders" }},
    {path: 'lenders-view', component: LendersViewComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Lenders" }},
    {path: 'lenders-mbr-list', component: LendersMbrListComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "MBRReview" }},
    {path: 'lenders-mbr-request', component: LendersMbrRequestComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "MBRReview" }},
    {path: 'lenders-waive-list', component: LendersWaiveListComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "WaiveRequest" }},
    {path: 'lenders-waive-request', component: LendersWaiveRequestComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "WaiveRequest" }},
    {path: 'user-list', component: UserListComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Admin" }},
    {path: 'user-add', component: UserAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Admin" }},
    {path: 'user-add/:id', component: UserAddComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Admin" }},
    {path: 'user-view', component: UserViewComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Admin" }},
    {path: 'user-view/:id', component: UserViewComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Admin" }},
    {path: 'user-profile', component: UserProfileComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'products-list', component: ProductsListComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'orgnization-list', component: OrganizationListComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'payment-modes', component: PaymentModesComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'assets', component: AssetsComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'assets-add', component: AssetsAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'assets-add/:id', component: AssetsAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'asset-types', component: AssetTypesComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'asset-types-add', component: AssetTypesAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'asset-types-add/:id', component: AssetTypesAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'department', component: DepartmentComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'department-add', component: DepartmentAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'payment-mode-add', component: PaymentModeAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'payment-mode-add/:id', component: PaymentModeAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'expense-types', component: ExpenseTypesComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'expense-type-add', component: ExpenseTypeAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'expense-type-add/:id', component: ExpenseTypeAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'department-add/:id', component: DepartmentAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'expense', component: ExpenseComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'expense-add', component: ExpenseAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'expense-add/:id', component: ExpenseAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
   {path: 'item', component: ItemComponent, canActivate: [AdminAuthenticationGuard], data: { }},

    {path: 'employee-contacts', component: EmployeeContactsComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'employee-contact-add', component: EmployeeContactAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'employee-contact-add/:id', component: EmployeeContactAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},

    {path: 'client-contacts', component: ClientContactsComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'client-contact-add', component: ClientContactAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'client-contact-add/:id', component: ClientContactAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'employee', component: EmployeeComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'employee-add', component: EmployeeAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'employee-add/:id', component: EmployeeAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'project', component: ProjectsComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'project-add', component: ProjectAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'project-add/:id', component: ProjectAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},

    {path: 'contacts', component: ContactsComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'contact-add', component: ContactAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'contact-add/:id', component: ContactAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},


    {path: 'clients', component: ClientsComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'client-add', component: ClientsAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'client-add/:id', component: ClientsAddComponent, canActivate: [AdminAuthenticationGuard], data: { }},
    {path: 'assignments', component: AssignmentsComponent, canActivate: [AdminAuthenticationGuard], data: { permission: "Admin" }},
    {path: 'theme', component: ThemeUiComponent},
    {path: 'pages', component: PagesLogComponent},
    {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
   
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
