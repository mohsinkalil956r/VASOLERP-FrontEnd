import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AdminRoutingModule } from './admin-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { PaymentModesComponent } from './components/payment-modes/payment-modes.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProvidersFormSubmissionComponent } from './components/providers-form-submission/providers-form-submission.component';
import { ProvidersFormConsolidationComponent } from './components/providers-form-consolidation/providers-form-consolidation.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { HomeComponent } from './components/home/home.component';
import { PagesLogComponent } from './components/pages-log/pages-log.component';
import { ThemeUiComponent } from './components/theme-ui/theme-ui.component';
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
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LenderRoutingModule } from '../lender/lender-routing.module';
import { ProductPopupComponent } from './components/popups/product-popup/product-popup.component';
import { OrganizationPopupComponent } from './components/popups/organization-popup/organization-popup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProfileWidgetComponent } from 'src/app/components/profile-widget/profile-widget.component';
import { AssetsComponent } from './components/assets/assets.component';
import { AssetTypesComponent } from './components/asset-types/asset-types.component';
import  {AssetsAddComponent} from './components/asset-add/asset-add.component';
import { AssetTypesAddComponent } from './components/asset-types-add/asset-types-add.component';
import { PaymentModeAddComponent } from './components/payment-mode-add/payment-mode-add.component';
import { ExpenseTypesComponent } from './components/expense-types/expense-types.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpenseAddComponent } from './components/expense-add/expense-add.component';
import { ExpenseTypeAddComponent } from './components/expense-type-add/expense-type-add.component';
import { ClientContactsComponent } from './components/client-contacts/client-contacts.component';
import { ClientContactAddComponent } from './components/client-contact-add/client-contact-add.component';
import { EmployeeContactsComponent } from './components/employee-contacts/employee-contacts.component';
import { EmployeeContactAddComponent } from './components/employee-contact-add/employee-contact-add.component';
import { ClientsAddComponent } from './components/clients-add/clients-add.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectAddComponent } from './components/project-add/project-add.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemBasicComponent } from './components/item-basic/item-basic.component';
import { ItemPriceComponent } from './components/item-price/item-price.component';
import { ItemComponent } from './components/item/item.component';
import { ItemListingComponent } from './components/item-listing/item-listing.component';





@NgModule({
  declarations: [
    DashboardComponent,
    ProvidersListComponent,
    ProvidersFormSubmissionComponent,
    ProvidersFormConsolidationComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    MainNavigationComponent,
    HomeComponent,
    PagesLogComponent,
    ThemeUiComponent,
    ProvidersAddComponent,
    ProvidersSubmissionDetailsComponent,
    ConsolidationRequestComponent,
    ConsolidationAddComponent,
    LendersListComponent,
    LendersAddComponent,
    LendersMbrListComponent,
    LendersMbrRequestComponent,
    LendersWaiveListComponent,
    UserListComponent,
    UserAddComponent,
    ProvidersViewComponent,
    LendersViewComponent,
    UserViewComponent,
    ProductsListComponent,
    OrganizationListComponent,
    AssignmentsComponent,
    UserProfileComponent,
    ProductPopupComponent,
    OrganizationPopupComponent,
    ProfileWidgetComponent,
    PaymentModesComponent,
    PaymentModeAddComponent,
    ClientContactsComponent,
    ClientContactAddComponent,
    AssetsComponent,
    AssetTypesComponent,
    AssetsAddComponent,
    AssetTypesAddComponent,
    EmployeeContactsComponent,
    EmployeeContactAddComponent,
    PaymentModeAddComponent,
    ExpenseTypesComponent,
    ExpenseComponent,
    ExpenseAddComponent,
    ExpenseTypeAddComponent,
    PaymentModesComponent,
    ClientsComponent,
    ClientsAddComponent,
    DepartmentComponent,
    DepartmentAddComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    ProjectsComponent,
    ProjectAddComponent,
    ContactsComponent,
    ContactAddComponent,
    ItemComponent,
   ItemBasicComponent,
   ItemPriceComponent,
   ItemListingComponent  
  ],
  imports: [
    // LenderModule,
    LenderRoutingModule,
    CommonModule,
    AdminRoutingModule,
    AgGridModule,
    NgxDropzoneModule,
    NgSelectModule, FormsModule, ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    ToastrModule,
    SharedModule,
    FormsModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  exports: [
    MainNavigationComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
  ]
})
export class AdminModule { }
