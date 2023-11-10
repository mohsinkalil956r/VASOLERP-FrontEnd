
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';

import { EmployeeService } from 'src/app/services/employee.service';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  constructor(private toastr: ToastrService, private service: EmployeeService, private route: Router) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  employees: any[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // ngAfterViewInit(): void {
  //   this.paginator.page.subscribe(() => this.onPageChange());
  // }
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { headerName: 'EmpCode', field: 'id', flex:2, cellRenderer: function(params: ICellRendererParams) {
      // Format the id with a leading zero
      const formattedId = String(params.value).padStart(4, '0');
      return formattedId;
    }},
    { field: 'department.name', flex: 2 },
    { field: 'firstName', flex: 2 },
    { field: 'lastName', flex: 2 },
    { field: 'dob', flex: 2 },
    { field: 'cnic', flex: 2 },
    { field: 'email', flex: 2 },
    { field: 'address', flex: 2 },
    { field: 'phoneNumber', flex: 2 },
    { field: 'contractStartDate', flex: 2 , valueFormatter: this.dateValueFormatter },
    { field: 'contractEndDate', flex: 2 , valueFormatter: this.dateValueFormatter },
    { field: 'salary', flex: 2 },    
    { field: 'action',
      width: 100,
      filter: false,
      sortable: false,
      cellRenderer:  BtnCellRenderer, 
      cellRendererParams: {
        onEdit: this.openEditPage.bind(this),
        onDelete: this.confirmationPopup.bind(this)
    },
    },
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
  
  exportToExcel(): void {
    const relatedData = this.employees.map(employee => ({
      'EmpCode': employee.id,
      'Department': employee.department.name,
      'First Name': employee.firstName,
      'Last Name': employee.lastName,
      'Dob':employee.dob,
      'Cnic':employee.cnic,
      'Email':employee.email,
      'Address':employee.address,
      'PhoneNummber':employee.phoneNumber,
      'Contract StartDate':employee.contractStartDate,
      'Contract EndDate':employee.contractEndDate,
      'Salary':employee.salary,
    }));
  
  
    // Create Excel sheet from the related data
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(relatedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
  
    // Generate a unique filename (e.g., based on timestamp)
    const fileName = `employees_export_${Date.now()}.xlsx`;
  
    // Trigger a file download
    XLSX.writeFile(wb, fileName);
  }
  
  exportToPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    doc.setFontSize(12); // Set the font size to 12
    doc.setFont('helvetica'); // Set the font style to 'helvetica'
  
    // Add a title at the top
    // doc.text('Vasol Employees', 105, 10); // Text, X position, Y position
    // Define the columns and column widths
    const columns = [
      'EmpCode',
      'Department',
      'First Name',
      'Last Name',
      'Dob',
      'Cnic',
      'Email',
      'Address',
      'PhoneNummber',
      'Contract StartDate',
      'Contract EndDate',
      'Salary',
    ];
    
    // Define the data
    const data = this.employees.map((employee) => [
      employee.id, // EmpCode
      employee.department.name, // Department
      employee.firstName, // First Name
      employee.lastName, // Last Name
      employee.dob, // Dob
      employee.cnic, // Cnic
      employee.email, // Email
      employee.address, // Address
      employee.phoneNumber, // PhoneNummber
      employee.contractStartDate, // Contract StartDate
      employee.contractEndDate, // Contract EndDate
      employee.salary, // Salary
    ]);
    const columnStyles: any = {
      0: { columnWidth: 20 }, // EmpCode
      1: { columnWidth: 30 }, // Department
      2: { columnWidth: 30 }, // First Name
      3: { columnWidth: 30 }, // Last Name
      4: { columnWidth: 20 }, // Dob
      5: { columnWidth: 30 }, // Cnic
      6: { columnWidth: 30 }, // Email
      7: { columnWidth: 40 }, // Address
      8: { columnWidth: 30 }, // PhoneNummber
      9: { columnWidth: 30 }, // Contract StartDate
      10: { columnWidth: 30 }, // Contract EndDate
      11: { columnWidth: 20 }, // Salary
    };

    var img = new Image();
    img.src = "assets/images/vasol-logo.png";
    img.onload = function() {
      const logoWidth = 25; // Set the initial width of the logo
      const logoHeight = (logoWidth * img.height) / img.width; // C
      // doc.addImage(img, 'JPEG', 1, 1, 40, 60)
      // doc.addImage(img, 'JPEG', 10, 10, 40, 40);
      const titleText = 'Vasol Employees';
      const titleFontSize = 20; // Set the font size for the titl
      const titleWidth = doc.getStringUnitWidth(titleText) * titleFontSize / doc.internal.scaleFactor;

      const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Center the title horizontally
      const titleY = 30; // Set the Y position for the title
      const logoX = titleX - logoWidth - 5; // Adjust the X position of the logo

      doc.addImage(img, 'JPEG', titleX - logoWidth -1, titleY, logoWidth, logoHeight);
          // doc.text('Vasol Employees', 60, 30); // Text, X position, Y position
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(titleFontSize);
          doc.text(titleText, titleX, titleY + 5); // Adjust the Y position for text alignment

          // Add the title "Vasol Employees" below the logo as a bold heading
          // doc.text('Vasol Employees', 60, 30); // Text, X position, Y position
      
          // Reset the font style for the table content
          doc.setFont('helvetica', 'normal');
      
          // Set font size and style for the table content
          doc.setFontSize(10); // Set the font size to 10 for the table content
          

        // Set font size and style for the table content
    // doc.setFontSize(10); // Set the font size to 10 for the table content
    // doc.setFont('helvetica'); // Set the font style to 'helvetica' for the table content
    // doc.text('Vasol Employees', 60, 30); // Text, X position, Y position
     // Set the font family for the title to 'bold'
   
     autoTable(doc, {
      head: [columns],
      body: data,
      startY: 50,
      margin: { top: 60 },
      columnStyles: columnStyles,
    });

    doc.save('Vasol Employees.pdf');
  };
}
  
  
 
    
  
  clearText(){
    this.searchQuery = ""
  }


  onPageChange(): void {
  }
  
  openEditPage(employeeData: any): void {
    const employeeId = employeeData.id;
    this.route.navigate(['/admin/employee-add', employeeId]);
  }
  onDelete(result: any) {
    this.getGridData();
  }
  public paginationPageSize = 10;

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
      this.service.delete(result.id).subscribe(() => {
        this.getGridData();
      })
    }
  }

  private getGridData() {
    this.service.getExpenses(this.currentPage, this.pageSize, this.searchQuery)
    .subscribe((r: { isError: any; data: { items: any[]; totalItems: NumberInput; }; })=>{if(!r.isError){
      this.employees = r.data.items;
      this.rowData$ = this.employees;
      this.paginator.length = r.data.totalItems;
    };})
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