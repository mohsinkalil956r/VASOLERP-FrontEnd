import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { param } from 'jquery';
@Component({
  selector: 'app-products-mbr',
  templateUrl: './products-mbr.component.html',
  styleUrls: ['./products-mbr.component.scss']
})
export class ProductsMbrComponent {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'product',
      flex: 2,
      sortable: true,
    },
    {
      field: 'mbrDocument', flex: 3,
      cellRenderer: (params: ICellRendererParams) => {
        console.log(params);
        if(params.value == ''){
          return `<span class='cell-text'>No requirement Click to upload </span> <button class="btn btn-primary custom-btn" data-bs-toggle="modal" data-bs-target="#uploadMbrDocument"><i class="fal fa-cloud-upload"></i> Upload </button`
        }
        else{
          return  `<span class='cell-text'>`+params.value+`</span> <button class="btn btn-primary custom-btn"><i class="fal fa-arrow-to-bottom"></i> Download </button>  `
        }
      }
    },
    { field: 'version', flex: 1 },
    {
      field: 'action',
      width: 150,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="btn-col">
      <a routerLink="/lender/mbr-request" class="btn btn-primary-light"><i class="fal fa-hand-pointer"></i> Request</a>
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
    },
    {
      product: 'Beta',
      mbrDocument: '',
      version: '1.0',
      action: '',
    },
    {
      product: 'Gama',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
    },
    {
      product: 'Yella',
      mbrDocument: '',
      version: '1.0',
      action: '',
    },
    {
      product: 'Beta',
      mbrDocument: '',
      version: '1.0',
      action: '',
    },
    {
      product: 'Gama',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
    },
    {
      product: 'Yella',
      mbrDocument: '',
      version: '1.0',
      action: '',
    },
    {
      product: 'Beta',
      mbrDocument: '',
      version: '1.0',
      action: '',
    },
    {
      product: 'Gama',
      mbrDocument: 'A Requirement.pdf',
      version: '1.0',
      action: '',
    },
    {
      product: 'Yella',
      mbrDocument: '',
      version: '1.0',
      action: '',
    },

  ];
}
