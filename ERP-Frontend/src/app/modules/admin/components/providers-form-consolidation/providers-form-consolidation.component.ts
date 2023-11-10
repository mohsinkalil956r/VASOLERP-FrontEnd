import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-providers-form-consolidation',
  templateUrl: './providers-form-consolidation.component.html',
  styleUrls: ['./providers-form-consolidation.component.scss']
})
export class ProvidersFormConsolidationComponent {
 // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
  {
    field: 'provider',
    flex:4,
    sortable: true,
    
  },
  { field: 'dueDate', flex:3},
  { field: 'status', flex:2},
  {
    field: 'action',
    width:150,
    cellRenderer: (params: ICellRendererParams) => {
      return `<div class="btn-col">
      <a href="/admin/consolidation-request" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
      </div>
      `
    }
  },
];
public paginationPageSize = 10;
// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  filter: 'agMultiColumnFilter',
};

rowData = [
  {
    provider: 'Moicrosoft Corporration',
    dueDate: '10-25-2022',
    status: 'Active',
    action: '',
  },
  {
    provider: 'Peter Workspace',
    dueDate: '10-19-2022',
    status: 'In Progress',
    action: '',
  },
  {
    provider: 'Synder Warehourse',
    dueDate: '08-31-2022',
    status: 'Pending',
    action: '',
  },
  {
    provider: 'John Doe',
    dueDate: '12-15-2022',
    status: 'Success',
    action: '',
  },
  {
    provider: 'Peter Sen',
    dueDate: '12-01-2022',
    status: 'Done',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Cancelled',
    action: '',
  },
  {
    provider: 'Roin Webrammers',
    dueDate: '10-25-2022',
    status: 'Overdue',
    action: '',
  },
  {
    provider: 'Nessa Webrammers',
    dueDate: '10-25-2022',
    status: 'Active',
    action: '',
  },
  {
    provider: 'Zack Legend',
    dueDate: '10-19-2022',
    status: 'In Progress',
    action: '',
  },
  {
    provider: 'Synder Reals',
    dueDate: '08-31-2022',
    status: 'Pending',
    action: '',
  },
  {
    provider: 'John Doe',
    dueDate: '12-15-2022',
    status: 'Success',
    action: '',
  },
  {
    provider: 'Peter Sen',
    dueDate: '12-01-2022',
    status: 'Done',
    action: '',
  },
  {
    provider: 'Onions Webrammers',
    dueDate: '10-25-2022',
    status: 'Cancelled',
    action: '',
  },
  {
    provider: 'Yella Webrammers',
    dueDate: '10-25-2022',
    status: 'Overdue',
    action: '',
  },
  {
    provider: 'Vendata Webrammers',
    dueDate: '10-25-2022',
    status: 'Active',
    action: '',
  },
  {
    provider: 'Zack Legend',
    dueDate: '10-19-2022',
    status: 'In Progress',
    action: '',
  },
  {
    provider: 'Synder Reals',
    dueDate: '08-31-2022',
    status: 'Pending',
    action: '',
  },
  {
    provider: 'John Doe',
    dueDate: '12-15-2022',
    status: 'Success',
    action: '',
  },
  {
    provider: 'Peter Sen',
    dueDate: '12-01-2022',
    status: 'Done',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Cancelled',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Overdue',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Active',
    action: '',
  },
  {
    provider: 'Zack Legend',
    dueDate: '10-19-2022',
    status: 'In Progress',
    action: '',
  },
  {
    provider: 'Synder Reals',
    dueDate: '08-31-2022',
    status: 'Pending',
    action: '',
  },
  {
    provider: 'John Doe',
    dueDate: '12-15-2022',
    status: 'Success',
    action: '',
  },
  {
    provider: 'Peter Sen',
    dueDate: '12-01-2022',
    status: 'Done',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Cancelled',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Overdue',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Active',
    action: '',
  },
  {
    provider: 'Zack Legend',
    dueDate: '10-19-2022',
    status: 'In Progress',
    action: '',
  },
  {
    provider: 'Synder Reals',
    dueDate: '08-31-2022',
    status: 'Pending',
    action: '',
  },
  {
    provider: 'John Doe',
    dueDate: '12-15-2022',
    status: 'Success',
    action: '',
  },
  {
    provider: 'Peter Sen',
    dueDate: '12-01-2022',
    status: 'Done',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Cancelled',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Overdue',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Active',
    action: '',
  },
  {
    provider: 'Zack Legend',
    dueDate: '10-19-2022',
    status: 'In Progress',
    action: '',
  },
  {
    provider: 'Synder Reals',
    dueDate: '08-31-2022',
    status: 'Pending',
    action: '',
  },
  {
    provider: 'John Doe',
    dueDate: '12-15-2022',
    status: 'Success',
    action: '',
  },
  {
    provider: 'Peter Sen',
    dueDate: '12-01-2022',
    status: 'Done',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Cancelled',
    action: '',
  },
  {
    provider: 'Alexa Webrammers',
    dueDate: '10-25-2022',
    status: 'Overdue',
    action: '',
  },
  
];
}
