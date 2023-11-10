import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lenders-mbr-list',
  templateUrl: './lenders-mbr-list.component.html',
  styleUrls: ['./lenders-mbr-list.component.scss']
})
export class LendersMbrListComponent {
  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'lender', flex: 2 },
    {
      field: 'product',
      flex: 2,
    },
    { field: 'dueDate', flex: 2 },
    { field: 'status', flex: 1 },
    {
      field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="btn-col">
      <a href="/admin/lenders-mbr-request" class="btn btn-icon-fill-light"><i class="fal fa-eye"></i></a>
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
      product: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      dueDate: '15-10-2022',
      status: 'Active',
      action: '',
    },
    {
      product: 'Yamsol tools',
      lender: 'Jeans Marl',
      dueDate: '27-08-2012',
      status: 'Pending',
      action: '',
    },
    {
      product: 'Peser Wolm',
      lender: 'Yenly Cotron',
      dueDate: '15-10-2023',
      status: 'Submitted',
      action: '',
    },
    {
      product: 'Tens Sonam',
      lender: 'Union Reste',
      dueDate: '15-10-2012',
      status: 'On Hold',
      action: '',
    },
    {
      product: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      dueDate: '15-10-2023',
      status: 'Done',
      action: '',
    },
    {
      product: 'Yamsol tools',
      lender: 'Jeans Marl',
      dueDate: '15-10-2012',
      status: 'Active',
      action: '',
    },
    {
      product: 'Peser Wolm',
      lender: 'Yenly Cotron',
      dueDate: '15-10-2023',
      status: 'Cancelled',
      action: '',
    },
    {
      product: 'Tens Sonam',
      lender: 'Union Reste',
      dueDate: '15-10-2012',
      status: 'Rejected',
      action: '',
    },
    {
      product: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      dueDate: '15-10-2023',
      status: 'Active',
      action: '',
    },
    {
      product: 'Yamsol tools',
      lender: 'Jeans Marl',
      dueDate: '15-10-2012',
      status: 'Send Back',
      action: '',
    },
    {
      product: 'Peser Wolm',
      lender: 'Yenly Cotron',
      dueDate: '15-10-2023',
      status: 'Active',
      action: '',
    },
    {
      product: 'Tens Sonam',
      lender: 'Union Reste',
      dueDate: '15-10-2012',
      status: 'Send for Review',
      action: '',
    },
    {
      product: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      dueDate: '15-10-2023',
      status: 'Active',
      action: '',
    },
    {
      product: 'Yamsol tools',
      lender: 'Jeans Marl',
      dueDate: '15-10-2023',
      status: 'Success',
      action: '',
    },
    {
      product: 'Peser Wolm',
      lender: 'Yenly Cotron',
      dueDate: '15-10-2012',
      status: 'Active',
      action: '',
    },
    {
      product: 'Tens Sonam',
      lender: 'Union Reste',
      dueDate: '15-10-2023',
      status: 'Done',
      action: '',
    },
  ];

}
