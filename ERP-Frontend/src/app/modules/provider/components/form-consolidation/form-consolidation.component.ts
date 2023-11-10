import { Component } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-form-consolidation',
  templateUrl: './form-consolidation.component.html',
  styleUrls: ['./form-consolidation.component.scss']
})
export class FormConsolidationComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'title',
      flex: 2, minWidth: 120
    },
    { field: 'status', flex: 2, minWidth: 120 },
    { field: 'createdDate', flex: 2, minWidth: 120 },
    { field: 'dueDate', flex: 2, minWidth: 120 },
    {
      field: 'action',
      width: 130,
      filter: false,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        return `
        <div class="btn-col">
        <a href="/provider/form-consolidaton-detail" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
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
      title: 'Submission of Asc',
      dueDate: '10-12-2022',
      createdDate: '25-08-2015',
      status: 'Active',
      action: '',
    },
    {
      title: 'Lender morality',
      dueDate: '21-08-2023',
      createdDate: '25-08-2015',
      status: 'Pending',
      action: '',
    },
    {
      title: 'Consolidation checks',
      dueDate: '22-07-2021',
      createdDate: '25-08-2015',
      status: 'Cancelled',
      action: '',
    },
    {
      title: 'Waiver Porosic',
      dueDate: '22-07-2021',
      createdDate: '25-08-2015',
      status: 'Approved',
      action: '',
    },
    {
      title: 'MBR Review Helion',
      dueDate: '22-07-2021',
      createdDate: '25-08-2015',
      status: 'In Progress',
      action: '',
    },
    {
      title: 'Submission of Asc',
      dueDate: '10-12-2022',
      createdDate: '25-08-2015',
      status: 'Active',
      action: '',
    },
    {
      title: 'Lender morality',
      dueDate: '21-08-2023',
      createdDate: '25-08-2015',
      status: 'Pending',
      action: '',
    },
    {
      title: 'Consolidation checks',
      dueDate: '22-07-2021',
      createdDate: '25-08-2015',
      status: 'Cancelled',
      action: '',
    },
    {
      title: 'Waiver Porosic',
      dueDate: '22-07-2021',
      createdDate: '25-08-2015',
      status: 'Approved',
      action: '',
    },
    {
      title: 'MBR Review Helion',
      dueDate: '22-07-2021',
      createdDate: '25-08-2015',
      status: 'In Progress',
      action: '',
    },

  ];
}
