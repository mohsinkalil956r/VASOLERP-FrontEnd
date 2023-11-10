import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { ClientsService } from 'src/app/services/clients.service';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { Router } from '@angular/router';import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent  implements OnInit, AfterViewInit{
  constructor(private toastr: ToastrService,private clientsService:ClientsService,private route: Router) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  clients:any[]=[];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  public paginationPageSize = 10;

  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'ClientCode', field: 'id', flex:2, cellRenderer: function(params: ICellRendererParams) {
      // Format the id with a leading zero
      const formattedId = String(params.value).padStart(4, '0');
      return formattedId;
    }},
    { field: 'firstName', flex: 2 },
    { field: 'lastName', flex: 2 },
    { headerName: 'Country', field: 'address',flex: 2 },
    { headerName: 'phoneNumber', field: 'phoneNumber',flex: 2 },
    { headerName: 'Email', field: 'email',flex: 2 },
    { headerName: 'website', field: 'website',flex: 2 },
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
  


  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    filter: true,
    sortable: true
  };

  public rowData$!: any[];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(ProductPopupComponent) popup: ProductPopupComponent;
  @ViewChild(DeleteConfirmationComponent) confPopup: DeleteConfirmationComponent;
  onPageChange(): void {
  }
  ngOnInit(): void {
    this.getGridData();
  }
  openEditPage(clientsData: any): void {
    const clientId = clientsData.id;
    this.route.navigate(['/admin/client-add', clientId]);
  }
  private getGridData() {
    this.clientsService.getClients(this.currentPage, this.pageSize, this.searchQuery).subscribe((r: { isError: any; data: { items: any[]; totalItems: NumberInput; }; })=>{if(!r.isError){
      this.rowData$ = r.data.items;
      this.paginator.length = r.data.totalItems;
    };})
  }
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
      this.clientsService.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
  }
 
  onDelete(result: any) {
    this.getGridData();
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
