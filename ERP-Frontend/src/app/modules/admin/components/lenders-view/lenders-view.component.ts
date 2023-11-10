import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-lenders-view',
  templateUrl: './lenders-view.component.html',
  styleUrls: ['./lenders-view.component.scss']
})
export class LendersViewComponent {
// Each Column Definition results in one Column.
public columnDefs: ColDef[] = [
  {
    field: 'type',
    flex:2, minWidth:120
  },
  { field: 'dueDate', flex:2, minWidth:120},
  { field: 'status', flex:2, minWidth:120},
  {
    field: 'action',
    width:80,
    filter: false,
    sortable:false,
    cellRenderer: (params: ICellRendererParams) => {
      return `<div class="btn-col">
      <a [routerLink]="/admin/lenders-list" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
      </div>
      `
    }
  },
];
public paginationPageSize = 5;
// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  filter: true,
  sortable:true
};

rowData = [
  {
    type: 'Submission',
    dueDate: '10-12-2022',
    status: 'Active',
    action: '',
  },
  {
    type: 'Lender',
    dueDate: '21-08-2023',
    status: 'Pending',
    action: '',
  },
  {
    type: 'Consolidation',
    dueDate: '22-07-2021',
    status: 'Cancelled',
    action: '',
  },
  {
    type: 'Waiver',
    dueDate: '22-07-2021',
    status: 'Approved',
    action: '',
  },
  {
    type: 'MBR Review',
    dueDate: '22-07-2021',
    status: 'In Progress',
    action: '',
  },
];
}
