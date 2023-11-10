import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, ColDef, GridReadyEvent } from 'ag-grid-community';
import { LendersService } from 'src/app/services/lenders.service';
@Component({
  selector: 'app-lenders-list',
  templateUrl: './lenders-list.component.html',
  styleUrls: ['./lenders-list.component.scss']
})
export class LendersListComponent {

  constructor(private lenderService: LendersService) {

  }

 // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      field: 'firstName',
      flex:2,
    },
    { field: 'lastName', flex:2},
    { field: 'email', flex:3},
    { field: 'phoneNumber', flex:2},
    { field: 'organization', flex:1, minWidth:150},
    {
      field: 'action',
      width:150,
      filter: false,
      sortable:false,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="btn-col">
        <a href="/admin/lenders-add/${params.data.id}"" class="btn btn-icon-fill-light"><i class="fal fa-pen"></i></a>
        <a href="/admin/user-view/${params.data.userId}" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
        <a [routerLink]="null" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-icon-fill-light"><i class="fal fa-lock-alt"></i></a>
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

  
  public rowData$!: any[];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.getGridData();
  }

  private getGridData() {
    this.lenderService.get().subscribe(r => {
      this.rowData$ = r.data;
    });
  }

}
