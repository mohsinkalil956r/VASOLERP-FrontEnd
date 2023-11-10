import { Component, ViewChild } from '@angular/core';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { ContactsService } from 'src/app/services/contacts.service';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { MatPaginator } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import { Router } from '@angular/router'; 
import * as XLSX from 'xlsx';
import { AgGridAngular } from 'ag-grid-angular';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-contacts-',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(private toastr: ToastrService, private contactsService: ContactsService, private route: Router) { }

  contacts:any[]=[];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
   
    { field: 'type', flex: 2 },
    { field: 'firstName', flex: 2 },
    { field: 'lastName', flex: 2 },
    { field: 'email', flex: 2 },
    { field: 'phoneNumber', flex: 2 },
    { field: 'address', flex: 2 },
    { field: 'action',
      width: 150,
      filter: false,
      sortable: false,
      cellRenderer:  BtnCellRenderer, 
      cellRendererParams: {
          onEdit: this.openEditPage.bind(this),
          onDelete: this.confirmationPopup.bind(this)
      }
    },
  ];
  

  ngOnInit(): void {
    this.getGridData();
  }
  openEditPage(contacts: any): void {
    const contactId = contacts.id;
    this.route.navigate(['/admin/contact-add', contactId]);
  }
    onDelete(result: any) {
    this.getGridData();
  }
  private getGridData() {
    this.contactsService.getContacts(this.currentPage, this.pageSize, this.searchQuery)
    .subscribe((r: { isError: any; data: { items: any[]; totalItems: NumberInput; }; })=>{if(!r.isError)
      {
      //this.rowData$ = r.data.items;
      this.contacts = r.data.items; // Update the contacts array
      this.rowData$ = this.contacts; // Bind the data to rowData$
      this.paginator.length = r.data.totalItems;
    };})
  }


  public paginationPageSize = 10;
  onPageChange(): void {
  }

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
    console.log(this.contacts);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.contacts);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts'); // 'Contacts' is the sheet name
  
    // Generate a unique filename (e.g., based on timestamp)
    const fileName = `contacts_export_${Date.now()}.xlsx`;
  
    // Trigger a file download
    XLSX.writeFile(wb, fileName);
  }

  exportToPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Define the columns and column widths
    const columns = [
      { title: 'Type', width: 15 },
      { title: 'First Name', width: 20 },
      { title: 'Last Name', width: 20 },
      { title: 'Email', width: 40 },
      { title: 'Phone Number', width: 40 },
      { title: 'Address', width: 50 },
    ];
  
    // Define the data
    const data = this.contacts.map((contact) => [
      contact.type,
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phoneNumber,
      contact.address,
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
    const titleWidth = doc.getStringUnitWidth('Vasol Contacts') * titleFontSize / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  
    // Draw the title at the calculated position
    doc.text('Vasol Contacts', titleX, 20);
  
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
    doc.save('contacts.pdf');
  }
  
  clearText(){
    this.searchQuery = ""
  }


  // exportToPDF() {
  //   const doc: any = new jsPDF.default();
  //   const columns = [
  //     { title: 'Type', dataKey: 'type' },
  //     { title: 'First Name', dataKey: 'firstName' },
  //     { title: 'Last Name', dataKey: 'lastName' },
  //     { title: 'Email', dataKey: 'email' },
  //     { title: 'Phone Number', dataKey: 'phoneNumber' },
  //     { title: 'Address', dataKey: 'address' },
  //   ];


  //   const data = this.contacts.map((contact) => ({
  //     type: contact.type,
  //     firstName: contact.firstName,
  //     lastName: contact.lastName,
  //     email: contact.email,
  //     phoneNumber: contact.phoneNumber,
  //     address: contact.address,
  //   }));
  //   console.log("Load Data:", data)
  //   console.log(this.contacts)
  //   try {
  //     doc.autoTable({
  //       head: [columns.map((column) => column.title)],
  //       body: data,
  //     });
    
  //     // Save the PDF with a specific file name
  //     doc.save('contacts.pdf');
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
    
  // }
  
  
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

  onConfirmation(result: any) {
    if(result.confirmed) {
      this.contactsService.delete(result.id).subscribe(() => {
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
