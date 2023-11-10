import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { AssetsService } from 'src/app/services/assets.service';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-assets-modes',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, AfterViewInit{
  constructor(private toastr: ToastrService, private assetService: AssetsService, private route: Router) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  assetData: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  assets: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild(ProductPopupComponent) popup: ProductPopupComponent;
  @ViewChild(DeleteConfirmationComponent) confPopup: DeleteConfirmationComponent;

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'Asset Code', field: 'id', flex:3, cellRenderer: function(params: ICellRendererParams) {
      // Format the id with a leading zero
      const formattedId = String(params.value).padStart(4, '0');
      return formattedId;
    }},
    { field: 'name', flex: 2 },
    { field: 'description', flex: 3 },
    { field: 'purchasePrice', flex: 3 },
    { field: 'purchaseDate', flex: 3, valueFormatter: this.dateValueFormatter },
    { headerName: 'Asset Type', field: 'assetType.name' ,flex: 3 },
    { headerName: 'Employee Name',
      valueGetter: params => {
        const employees = params.data.employees;
        if (employees && employees.length > 0) {
          return employees[0].firstName;
        }
        return '';
      },
      flex: 3
    },
    
    { field: 'action',
      width: 110,
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
  public rowData$!: any[];
  public paginationPageSize = 10;
  openEditPage(assetData: any): void {
    const assetId = assetData.id;
    this.route.navigate(['/admin/assets-add', assetId]);
  }
    onDelete(result: any) {
    this.getGridData();
  }
  private getGridData() {
    this.assetService.getAssets(this.currentPage, this.pageSize, this.searchQuery).subscribe((r:
       { isError: any; data: { items: any[]; 
        totalItems: NumberInput; }; })=>{if(!r.isError){
       
      this.assets = r.data.items;
      this.rowData$ = this.assets;
      this.paginator.length = r.data.totalItems;
    };})
  }
  onPageChange(): void {
  }
  

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    filter: true,
    sortable: true
  };


 
  onGridReady(params: GridReadyEvent) {
    this.getGridData();
  }

  exportToExcel(): void {
    // Fetch related data (e.g., asset type and employee name)
    const relatedData = this.assets.map(asset => ({
      'Asset Code': asset.id,
      'Name': asset.name,
      'Description': asset.description,
      'Purchase Price': asset.purchasePrice,
      'Purchase Date': asset.purchaseDate,
      'Asset Type': asset.assetType ? asset.assetType.name : '', // Include asset type if available
      'Employee Name': asset.employees && asset.employees.length > 0 ? asset.employees[0].firstName : '', // Include employee name if available
    }));
  
    // Create Excel sheet from the related data
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(relatedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assets');
  
    // Generate a unique filename (e.g., based on timestamp)
    const fileName = `assets_export_${Date.now()}.xlsx`;
  
    // Trigger a file download
    XLSX.writeFile(wb, fileName);
  }

  exportToPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    // Define the columns and column widths
    const columns = [
      { title: 'Asset Code', width: 20 },
      { title: 'Name', width: 20 },
      { title: 'Description', width: 45 }, // Corrected title
      { title: 'Purchase Price', width: 25 },
      { title: 'Purchase Date', width: 30 },
      { title: 'Asset Type', width: 25 },
      { title: 'Employee Name', width: 25 },
    ];
    
    // Define the data
    const data = this.assets.map((asset) => [
      asset.id, // Asset Code
      asset.name, // Name
      asset.description, // Description (corrected)
      asset.purchasePrice, // Purchase Price
      asset.purchaseDate, // Purchase Date
      asset.assetType ? asset.assetType.name : '', // Asset Type
      asset.employees && asset.employees.length > 0 ? asset.employees[0].firstName : '', // Employee Name
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
    const titleWidth = doc.getStringUnitWidth('Vasol Assets') * titleFontSize / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    
    // Draw the title at the calculated position
    doc.text('Vasol Assets', titleX, 20);
    
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
    doc.save('assets.pdf');
  }
  
  clearText(){
    this.searchQuery = ""
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
    this.getGridData();}
  onConfirmation(result: any) {
    if(result.confirmed) {
      this.assetService.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
  }


}
