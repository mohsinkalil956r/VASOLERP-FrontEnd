import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { DepartmentService } from 'src/app/services/department.service';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit, AfterViewInit {
  constructor(private toastr: ToastrService, private depatmentService: DepartmentService, private route: Router) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  departments:any[]=[];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'DepartmentCode', field: 'id', flex:2, cellRenderer: function(params: ICellRendererParams) {
      // Format the id with a leading zero
      const formattedId = String(params.value).padStart(4, '0');
      return formattedId;
    }},
    { field: 'name', flex: 2 }, 
    { field: 'hod', flex: 2 },  
    { field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer:  BtnCellRenderer, 
      cellRendererParams: {
          onEdit: this.openEditPage.bind(this),
          onDelete: this.confirmationPopup.bind(this)
      }
    },
  ];
  

  ngOnInit(): void {
    this.getGridData();
  }
  openEditPage(expenseData: any): void {
    const departmentId = expenseData.id;
    this.route.navigate(['/admin/department-add', departmentId]);
  }
    onDelete(result: any) {
    this.getGridData();
  }
  private getGridData() {
    this.depatmentService.getDepartment(this.currentPage, this.pageSize, this.searchQuery).subscribe((r: { isError: any; data: { items: any[]; totalItems: NumberInput; }; })=>{if(!r.isError){
      this.rowData$ = r.data.items;
      this.paginator.length = r.data.totalItems;
    };})
  }

  public paginationPageSize = 10;
  onPageChange(): void {
  }
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    filter: true,
    sortable: true
  };

  public rowData$!: any[];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(ProductPopupComponent) popup: ProductPopupComponent;
  @ViewChild(DeleteConfirmationComponent) confPopup: DeleteConfirmationComponent;

  onGridReady(params: GridReadyEvent) {
    this.getGridData();
  }

  openRightSidebar(data: any = null) {

    if (data) {
      this.popup.openRightSidebar(data.id);
    }
    else {
      this.popup.openRightSidebar();
    }
  }

  confirmationPopup(data: any) {
    this.confPopup.showPopup(data.id);
  }

  popupUpdate(data: any) {
    this.getGridData();
  }

  onConfirmation(result: any) {
    if(result.confirmed) {
      this.depatmentService.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
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
    this.getGridData();
  }

}

