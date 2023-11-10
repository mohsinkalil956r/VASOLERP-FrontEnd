import { NumberInput } from '@angular/cdk/coercion';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  constructor(private userService: UsersService,private route:Router) {
  }

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'firstName',
      flex:2,
    },
    { field: 'lastName', flex:2},
    { field: 'email', flex:3},
    { field: 'phoneNumber', headerName: 'Phone', flex:2},
    { headerName: 'User Type', field: 'roles', flex:2},
    {
      field: 'action',
      width:150,
      filter: false,
      sortable:false,
      cellRenderer: (params: ICellRendererParams) => {
        
        return `<div class="btn-col">
        <a href="/admin/user-add/${params.data.id}" class="btn btn-icon-fill-light"><i class="fal fa-pen"></i></a>
        <a href="/admin/user-view/${params.data.id}" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
        <a [routerLink]="null" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-icon-fill-light"><i class="fal fa-lock-alt"></i></a>
        </div>
        `
      }
    },
  ];
  companyData: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';

  clearSearch(): void { 
    this.searchQuery = '';
  }
  public paginationPageSize = 10;
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    filter: true,
    sortable:true
  };

  public rowData$!: any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(ProductPopupComponent) popup: ProductPopupComponent;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  ngOnInit(): void {
    this.getGridData();
  }
  onGridReady(params: GridReadyEvent) {
    this.getGridData();
  }

  private getGridData() {
    this.userService.getUsers(this.currentPage, this.pageSize, this.searchQuery).subscribe((r:
      
      { isError: any; data: { items: any[]; 
        
        totalItems: NumberInput; }; })=>{if(!r.isError){
       console.log(this.rowData$);
       console.log(r.data.items)
      this.rowData$ = r.data.items;
      this.paginator.length = r.data.totalItems;
    };})
  }
  onPageChange(): void {
  }
  onPage(event: any) {
    if (this.paginator.pageIndex < 0) {
      this.paginator.pageIndex = 0;
      return;
    }
    this.currentPage = this.paginator.pageIndex + 1;
    this.pageSize = this.paginator.pageSize;
    this.getGridData();
  }

  onSearch(): void {
    this.paginator.firstPage();
    this.getGridData();}
}

