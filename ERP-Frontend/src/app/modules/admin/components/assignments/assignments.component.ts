import { Component } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent {
public columnDefs: ColDef[] = [
  {
    field: 'type',
    flex:2, minWidth:120
  },
  { field: 'dueDate', flex:2, minWidth:120},
  { field: 'status', flex:2, minWidth:120},
  {
    field: 'assigned',
    // width:80,
    flex:2,
    filter: false,
    sortable:false,
  },
  {
    field: 'action',
    width:130,
    filter: false,
    sortable:false,
    cellRenderer: (params: ICellRendererParams) => {
      return `
      <div class="btn-col">
      <a data-bs-toggle="modal" data-bs-target="#changeAssignment" class="btn btn-icon-fill-light"><i class="fal fa-user-edit"></i></a>
      <a [routerLink]="null" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
      </div>
      `
    }
  },
];

public paginationPageSize = 10;
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
    assigned: 'John Wichster',
    action: '',
  },
  {
    type: 'Lender',
    dueDate: '21-08-2023',
    status: 'Pending',
    assigned: 'Maokka Rens',
    action: '',
  },
  {
    type: 'Consolidation',
    dueDate: '22-07-2021',
    status: 'Cancelled',
    assigned: 'Shenza Pollar',
    action: '',
  },
  {
    type: 'Waiver',
    dueDate: '22-07-2021',
    status: 'Approved',
    assigned: 'Willsom Hony',
    action: '',
  },
  {
    type: 'MBR Review',
    dueDate: '22-07-2021',
    status: 'In Progress',
    assigned: 'Nieber Zoin',
    action: '',
  },
  {
    type: 'Submission',
    dueDate: '10-12-2022',
    status: 'Active',
    assigned: 'John Wichster',
    action: '',
  },
  {
    type: 'Lender',
    dueDate: '21-08-2023',
    status: 'Pending',
    assigned: 'Maokka Rens',
    action: '',
  },
  {
    type: 'Consolidation',
    dueDate: '22-07-2021',
    status: 'Cancelled',
    assigned: 'Shenza Pollar',
    action: '',
  },
  {
    type: 'Waiver',
    dueDate: '22-07-2021',
    status: 'Approved',
    assigned: 'Willsom Hony',
    action: '',
  },
  {
    type: 'MBR Review',
    dueDate: '22-07-2021',
    status: 'In Progress',
    assigned: 'Nieber Zoin',
    action: '',
  },
];

}
