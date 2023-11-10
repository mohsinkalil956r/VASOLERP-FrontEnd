import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { PaymentModesService } from 'src/app/services/payment-modes.service ';
import { SingleFieldPopupComponent } from 'src/app/modules/shared/components/single-field-popup/single-field-popup.component';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-payment-modes',
  templateUrl: './payment-modes.component.html',
  styleUrls: ['./payment-modes.component.scss']
})
export class PaymentModesComponent {
  constructor(private toastr: ToastrService, private paymentModesService: PaymentModesService) { }

  showSuccess() {

    this.toastr.success('Hello world!', 'Toastr Title');
  }
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'name', flex: 2 },
    { field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer:  BtnCellRenderer, 
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
  @ViewChild(SingleFieldPopupComponent) popup: SingleFieldPopupComponent;
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

  onDelete(result: any) {
    this.getGridData();
  }

  private getGridData() {
    this.paymentModesService.get().subscribe(r => {
      if(!r.isError) {
        this.rowData$ = r.data.items;
      }
    });
  }

}
