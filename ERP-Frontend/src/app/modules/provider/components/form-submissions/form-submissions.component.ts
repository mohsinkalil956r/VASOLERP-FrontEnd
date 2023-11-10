import { Component } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-form-submissions',
  templateUrl: './form-submissions.component.html',
  styleUrls: ['./form-submissions.component.scss']
})
export class FormSubmissionsComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'product',
      flex: 2, minWidth: 120
    },
    { field: 'status', flex: 2, minWidth: 120 },
    { field: 'dueDate', flex: 2, minWidth: 120 },
    {
      field: 'action',
      width: 130,
      filter: false,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        return `
        <div class="btn-col">
        <a href="/provider/form-submissions-detail" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
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

  rowData = [
    {
      product: 'Submission',
      dueDate: '10-12-2022',
      status: 'Active',
      action: '',
    },
    {
      product: 'Lender',
      dueDate: '21-08-2023',
      status: 'Pending',
      action: '',
    },
    {
      product: 'Consolidation',
      dueDate: '22-07-2021',
      status: 'Cancelled',
      action: '',
    },
    {
      product: 'Waiver',
      dueDate: '22-07-2021',
      status: 'Approved',
      action: '',
    },
    {
      product: 'MBR Review',
      dueDate: '22-07-2021',
      status: 'In Progress',
      action: '',
    },
    {
      product: 'Submission',
      dueDate: '10-12-2022',
      status: 'Active',
      action: '',
    },
    {
      product: 'Lender',
      dueDate: '21-08-2023',
      status: 'Pending',
      action: '',
    },
    {
      product: 'Consolidation',
      dueDate: '22-07-2021',
      status: 'Cancelled',
      action: '',
    },
    {
      product: 'Waiver',
      dueDate: '22-07-2021',
      status: 'Approved',
      action: '',
    },
    {
      product: 'MBR Review',
      dueDate: '22-07-2021',
      status: 'In Progress',
      action: '',
    },
  ];
}
