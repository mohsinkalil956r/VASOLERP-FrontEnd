import { Component } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'product',
      flex: 2, minWidth: 120
    },
    {
      field: 'provider',
      flex: 2,
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
        <a href="/lender/form-submission-detail" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
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
      provider: 'Samsung GSM',
      action: '',
    },
    {
      product: 'Lender',
      dueDate: '21-08-2023',
      status: 'Pending',
      provider: 'Microsoft ',
      action: '',
    },
    {
      product: 'Consolidation',
      dueDate: '22-07-2021',
      status: 'Cancelled',
      provider: 'World wide web',
      action: '',
    },
    {
      product: 'Waiver',
      dueDate: '22-07-2021',
      status: 'Approved',
      provider: 'Rental Minst',
      action: '',
    },
    {
      product: 'MBR Review',
      dueDate: '22-07-2021',
      status: 'In Progress',
      provider: 'Oppo GSM',
      action: '',
    },
    {
      product: 'Submission',
      dueDate: '10-12-2022',
      status: 'Active',
      provider: 'MAC GSM',
      action: '',
    },
    {
      product: 'Lender',
      dueDate: '21-08-2023',
      status: 'Pending',
      provider: 'LIvern GSM',
      action: '',
    },
    {
      product: 'Consolidation',
      dueDate: '22-07-2021',
      status: 'Cancelled',
      provider: 'Polo G.',
      action: '',
    },
    {
      product: 'Waiver',
      dueDate: '22-07-2021',
      status: 'Approved',
      provider: 'Toro Mesta',
      action: '',
    },
    {
      product: 'MBR Review',
      dueDate: '22-07-2021',
      status: 'In Progress',
      provider: 'Lemon Onsa',
      action: '',
    },
  ];
}
