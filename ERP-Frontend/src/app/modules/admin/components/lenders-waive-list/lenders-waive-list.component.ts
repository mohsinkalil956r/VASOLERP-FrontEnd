import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lenders-waive-list',
  templateUrl: './lenders-waive-list.component.html',
  styleUrls: ['./lenders-waive-list.component.scss']
})
export class LendersWaiveListComponent {
  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'lender', flex: 2 },
    {
      field: 'provider',
      flex: 2,
    },
    { field: 'submission', flex: 2 },
    { field: 'dueDate', flex: 2 },
    { field: 'status', flex: 1 },
    {
      field: 'action',
      width: 80,
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
      provider: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      submission:'documnet',
      dueDate: '15-10-2022',
      status: 'Active',
      action: '',
    },
    {
      provider: 'Yamsol tools',
      lender: 'Jeans Marl',
      submission:'documnet',
      dueDate: '27-08-2012',
      status: 'Pending',
      action: '',
    },
    {
      provider: 'Peser Wolm',
      lender: 'Yenly Cotron',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Submitted',
      action: '',
    },
    {
      provider: 'Tens Sonam',
      lender: 'Union Reste',
      submission:'documnet',
      dueDate: '15-10-2012',
      status: 'On Hold',
      action: '',
    },
    {
      provider: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Done',
      action: '',
    },
    {
      provider: 'Yamsol tools',
      lender: 'Jeans Marl',
      submission:'documnet',
      dueDate: '15-10-2012',
      status: 'Active',
      action: '',
    },
    {
      provider: 'Peser Wolm',
      lender: 'Yenly Cotron',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Cancelled',
      action: '',
    },
    {
      provider: 'Tens Sonam',
      lender: 'Union Reste',
      submission:'documnet',
      dueDate: '15-10-2012',
      status: 'Rejected',
      action: '',
    },
    {
      provider: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Active',
      action: '',
    },
    {
      provider: 'Yamsol tools',
      lender: 'Jeans Marl',
      submission:'documnet',
      dueDate: '15-10-2012',
      status: 'Send Back',
      action: '',
    },
    {
      provider: 'Peser Wolm',
      lender: 'Yenly Cotron',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Active',
      action: '',
    },
    {
      provider: 'Tens Sonam',
      lender: 'Union Reste',
      submission:'documnet',
      dueDate: '15-10-2012',
      status: 'Send for Review',
      action: '',
    },
    {
      provider: 'Microsfot tools',
      lender: 'Hoolowwyn Zapya',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Active',
      action: '',
    },
    {
      provider: 'Yamsol tools',
      lender: 'Jeans Marl',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Success',
      action: '',
    },
    {
      provider: 'Peser Wolm',
      lender: 'Yenly Cotron',
      submission:'documnet',
      dueDate: '15-10-2012',
      status: 'Active',
      action: '',
    },
    {
      provider: 'Tens Sonam',
      lender: 'Union Reste',
      submission:'documnet',
      dueDate: '15-10-2023',
      status: 'Done',
      action: '',
    },
  ];
}
