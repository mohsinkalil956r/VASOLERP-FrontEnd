import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { EmployeeContactsService } from 'src/app/services/employee-contacts.service ';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-employee-contacts',
  templateUrl: './employee-contacts.component.html',
  styleUrls: ['./employee-contacts.component.scss']
})
export class EmployeeContactsComponent {
  constructor(private toastr: ToastrService, private employeeContactsService: EmployeeContactsService) { }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr Title');
  // }
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    //{ field: 'employee', flex: 2 },
    { field: 'email', flex: 2 },
    { field: 'phoneNumber', flex: 2 },
    { field: 'website', flex: 2 },
    { field: 'address', flex: 2 },
    { field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="btn-col">
        <a href="/admin/employee-contact-add/${params.data.id}"" class="btn btn-icon-fill-light"><i class="fal fa-pen"></i></a>

        </div>
        `
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
      this.employeeContactsService.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
  }

  private getGridData() {
    this.employeeContactsService.get().subscribe(r => {
      if(!r.isError) {
        this.rowData$ = r.data.results;
      }
    });
  }

}
