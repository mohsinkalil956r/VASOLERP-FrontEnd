import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  constructor(private toastr: ToastrService, private productService: ProductsService) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'name', flex: 2 },
    { field: 'description', flex: 4 },
    { field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer: BtnCellRenderer, 
      cellRendererParams: {
          onEdit: this.openRightSidebar.bind(this),
          onDelete: this.confirmationPopup.bind(this)
      }
    },
  ];
  
  public paginationPageSize = 10;

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
      this.productService.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
  }

  private getGridData() {
    this.productService.get().subscribe(r => {
      if(!r.isError) {
        this.rowData$ = r.data;
      }
    });
  }

}
