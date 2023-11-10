import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { param } from 'jquery';
@Component({
  selector: 'app-mbr-list',
  templateUrl: './mbr-list.component.html',
  styleUrls: ['./mbr-list.component.scss']
})
export class MbrListComponent {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'lender',
      flex: 2,
      sortable: true,
    },
    {
      field: 'product',
      flex: 1,
      sortable: true,
    },
    {
      field: 'mbrDocument', flex: 4,
      cellRenderer: (params: ICellRendererParams) => {
        console.log(params);
        if (params.value == '') {
          return `<span class='cell-text'>No requirement Click to upload </span> <button class="btn btn-primary custom-btn" data-bs-toggle="modal" data-bs-target="#uploadMbrDocument"><i class="fal fa-cloud-upload"></i> Upload </button`
        }
        else {
          return `<span class='cell-text'>` + params.value + `</span> <button class="btn btn-primary custom-btn"><i class="fal fa-arrow-to-bottom"></i> Download </button>  `
        }
      }
    },
    { field: 'dueDate', width: 150 },
    { field: 'version', flex: 1 },
    {
      field: 'action',
      width: 100,
      filter: false,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="btn-col"><a href="/admin/providers-view" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
      </div>
      `
      }
    },
  ];
  public paginationPageSize = 10;
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    filter: true,
  };

  rowData = [
    {
      product: 'Alexa',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
      lender: 'Winter helsy',
      dueDate: '10-12-2020'

    },
    {
      product: 'Beta',
      mbrDocument: '',
      version: '1.0',
      action: '',
      lender: 'Toyota Remsy',
      dueDate: '28-10-2015'
    },
    {
      product: 'Gama',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
      lender: 'Winter helsy',
      dueDate: '10-12-2020'
    },
    {
      product: 'Yella',
      mbrDocument: '',
      version: '1.0',
      action: '',
      lender: 'Toyota Remsy',
      dueDate: '28-10-2015'
    },
    {
      product: 'Beta',
      mbrDocument: '',
      version: '1.0',
      action: '',
      lender: 'Toyota Remsy',
      dueDate: '28-10-2015'
    },
    {
      product: 'Gama',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
      lender: 'Winter helsy',
      dueDate: '10-12-2020'
    },
    {
      product: 'Yella',
      mbrDocument: '',
      version: '1.0',
      action: '',
      lender: 'Toyota Remsy',
      dueDate: '28-10-2015'
    },
    {
      product: 'Beta',
      mbrDocument: '',
      version: '1.0',
      action: '',
      lender: 'Winter helsy',
      dueDate: '10-12-2020'
    },
    {
      product: 'Gama',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
      lender: 'Toyota Remsy',
      dueDate: '28-10-2015'
    },
    {
      product: 'Yella',
      mbrDocument: '',
      version: '1.0',
      action: '',
      lender: 'Winter helsy',
      dueDate: '10-12-2020'
    },

  ];
}
