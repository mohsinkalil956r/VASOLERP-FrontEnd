import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from 'src/app/services/expense.service';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { NumberInput } from '@angular/cdk/coercion';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, AfterViewInit{
  constructor(private toastr: ToastrService, private expenseService: ExpenseService, private route: Router) { }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  expenses: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  expense:any[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'description', flex: 3 },
    { field: 'amount', flex: 2 },
    { field: 'expenseDate', flex: 2, valueFormatter: this.dateValueFormatter },
    { headerName: 'Expense Type', field: 'expenseType.name', flex:2},
    { headerName: 'Payment Mode', field: 'paymentMode.name', flex:2},
    { field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer:  BtnCellRenderer, 
      cellRendererParams: {
        onEdit: this.openEditPage.bind(this),
        onDelete: this.confirmationPopup.bind(this)
    },}
  ];
  private dateValueFormatter(params: ValueFormatterParams) {
    const dateValue = params.value as string;
    if (dateValue) {
      const date = new Date(dateValue);
      return date.toLocaleDateString(); // Format the date as needed
    }
    return ''; // Handle empty date value if necessary
  }
  ngOnInit(): void {
    this.getGridData();
  }
  openEditPage(expenseData: any): void {
    const expenseId = expenseData.id;
    this.route.navigate(['/admin/expense-add', expenseId]);
  }
    onDelete(result: any) {
    this.getGridData();
  }
  private getGridData() {
    this.expenseService.getExpenses(this.currentPage, this.pageSize, this.searchQuery).subscribe((r: { isError: any; data: { items: any[]; totalItems: NumberInput; }; })=>{if(!r.isError){
      //this.rowData$ = r.data.items;
      this.expense = r.data.items; // Update the contacts array
      this.rowData$ = this.expense; // Bind the data to rowData$
      this.paginator.length = r.data.totalItems;
    };})
  }
  onPageChange(): void {
  }

  
  public paginationPageSize = 10;

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    filter: true,
    sortable: true
  };

  public rowData$!: any[];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(ProductPopupComponent) popup: ProductPopupComponent;
  @ViewChild(DeleteConfirmationComponent) confPopup: DeleteConfirmationComponent;

  onGridReady(params: GridReadyEvent) {
    this.getGridData();
  }

  exportToExcel(): void {
    const dataForExport = this.expense.map((expense) => ({
      description: expense.description,
      amount: expense.amount,
      expenseDate: expense.expenseDate,
      'ExpenseType': expense.expenseType.name, // Ensure correct field name
      'PaymentMode': expense.paymentMode.name, // Ensure correct field name
    }));
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'expense');
  
    const fileName = `expense_export_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
  

  exportToPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Define the columns and column widths
    const columns = [
      { title: 'Expense Date', width: 35 },
      { title: 'Expense Type', width: 30 },
      { title: 'Payment Mode', width: 30 },
      { title: 'Amount', width: 30 },
      { title: 'Description', width: 75 },
    ];
  
    // Define the data
    const data = this.expense.map((expenses) => [
      expenses.expenseDate,
      expenses.expenseType.name,
      expenses.paymentMode.name,
      expenses.amount,
      expenses.description,

    ]);
  
    // Set the initial position (x, y)
    let x = 10;
    let y = 40; // Adjust vertical starting position for the title
  
    // Set the row height and cell padding
    const rowHeight = 10;
    const cellPadding = 2;
  
    // Set font size and style for the title
    const titleFontSize = 10; // Adjust font size as needed
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'bold'); // Set font style to bold for the title
  
    // Calculate the position to center the title
    const titleWidth = doc.getStringUnitWidth('Vasol Expense') * titleFontSize / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  
    // Draw the title at the calculated position
    doc.text('Vasol Expense', titleX, 20);
  
    // Reset font size and style to normal for column titles
    const normalFontSize = 8; // Adjust font size as needed
    doc.setFontSize(normalFontSize);
    doc.setFont('helvetica', 'normal');
  
    // Draw column titles with bold font
    for (let i = 0; i < columns.length; i++) {
      doc.setFont('helvetica', 'bold'); // Set font style to bold for column titles
      doc.text(columns[i].title, x, y);
      x += columns[i].width;
      doc.setFont('helvetica', 'normal'); // Reset font style to normal
    }
    x = 10;
    y += rowHeight + cellPadding;
  
    // Loop through the data and draw the table
    for (const row of data) {
      for (let i = 0; i < columns.length; i++) {
        doc.text(row[i].toString(), x, y);
        x += columns[i].width;
      }
      x = 10;
      y += rowHeight + cellPadding;
    }
  
    // Save the PDF with a specific file name
    doc.save('expense.pdf');
  }

  openRightSidebar(data: any = null) {

    if (data) {
      this.popup.openRightSidebar(data.id);
    }
    else {
      this.popup.openRightSidebar();
    }
  }

  confirmationPopup(data: any) {
    this.confPopup.showPopup(data.id);
  }

  popupUpdate(data: any) {
    this.getGridData();
  }

  clearText(){
    this.searchQuery = ""
  }

  onConfirmation(result: any) {
    if(result.confirmed) {
      this.expenseService.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
  }
  onPage(event: any) {
    if (this.paginator.pageIndex < 0) {
      this.paginator.pageIndex = 0;
      return;
    }
    this.currentPage = this.paginator.pageIndex + 1;
    this.pageSize = this.paginator.pageSize;
    this.getGridData();
  }
  onSearch(): void {
    this.paginator.firstPage();
    this.getGridData();
  }
}
