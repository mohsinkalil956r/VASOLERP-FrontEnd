import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { DeleteConfirmationComponent } from 'src/app/modules/shared/components/delete-confirmation/delete-confirmation.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { BtnCellRenderer } from 'src/app/components/btn-cell-renderer/btn-cell-renderer.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit  {
  constructor(private toastr: ToastrService, private projectsService: ProjectsService,private route: Router) { }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr Title');
  }
  projects:any[]=[];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  project:any[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => this.onPageChange());
  }
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    
    { field: 'name', flex: 1.5 },
    { field: 'plannedCompletedAt', flex: 2, valueFormatter: this.dateValueFormatter },
    { field: 'description', flex: 2 },
    { field: 'startDate', flex: 2, valueFormatter: this.dateValueFormatter },
    { headerName: 'End Date', valueGetter: 'data.completionDate',flex: 2, valueFormatter: this.dateValueFormatter },
    { headerName: 'Client', valueGetter: 'data.client.firstName', flex: 1.5 },
    { headerName: ' Country', valueGetter: 'data.location', flex: 2 },
    { field: 'budget', flex: 1.8 },
    { headerName: 'Status', valueGetter: 'data.status.name', flex: 1.5 },
    { field: 'action',
      width: 100,
      filter: false,
      sortable: false,
      cellRenderer:  BtnCellRenderer, 
      cellRendererParams: {
          onEdit: this.openEditPage.bind(this),
          onDelete: this.confirmationPopup.bind(this)
      }
    },
  ];
  

  openEditPage(projectData: any): void {
    const projectsId = projectData.id;
    this.route.navigate(['/admin/project-add', projectsId]);
  }
  onDelete(result: any) {
    this.getGridData();
  }
  private getGridData() {
    this.projectsService.getProjects(this.currentPage, this.pageSize, this.searchQuery)
    .subscribe((r: { isError: any; data: { items: any[]; totalItems: NumberInput; }; })=>{if(!r.isError){
      this.project = r.data.items;
      this.rowData$ = this.project;
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
  ngOnInit(): void {
    this.getGridData();
  }
  private dateValueFormatter(params: ValueFormatterParams) {
    const dateValue = params.value as string;
    if (dateValue) {
      const date = new Date(dateValue);
      return date.toLocaleDateString(); // Format the date as needed
    }
    return ''; // Handle empty date value if necessary
  }
  exportToExcel(): void {
    const dataForExport = this.project.map((projects) => ({
      ProjectName: projects.name,
      PlannedCompleteDate: projects.plannedCompletedAt,
      Description: projects.description,
      StartDate: projects.startDate,
      CompleteAt: projects.plannedCompletedAt,
      ClientName: projects.client.firstName,
      Country: projects.location,
      Budget: projects.budget,
      Status: projects.status.name
    }));
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'projects');
  
    const fileName = `projects_export_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
  
  

  exportToPDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Define the columns and column widths
    const columns = [
      { title: 'Project', width: 20 },
      { title: 'Planned Complete Date', width: 30 },
      { title: 'Description', width: 30 },
      { title: 'Start Date', width: 30 },
      { title: 'Complete Date', width: 25 },
      { title: 'Client Name', width: 20 },
      { title: 'Country', width: 25 },
      { title: 'Budget', width: 15 },
      { title: 'Status', width: 20 },
    ];
  
    // Define the data
    const data = this.project.map((project) => [
      project.name || '', // Projects Name
      project.plannedCompletedAt || '', // Planned Complete Date
      project.description || '', // Description
      project.startDate || '', // Start Date
      project.plannedCompletedAt || '', // Complete Date (Use plannedCompletedAt?)
      project.client?.firstName || '', // Client Name (Use optional chaining)
      project.location || '', // Country
      project.budget || '', // Budget
      project.status?.name || '', // Project Status (Use optional chaining)
    ]);
  
    // Set the initial position (x, y)
    let x = 5;
    let y = 40; // Adjust vertical starting position for the title
  
    // Set the row height and cell padding
    const rowHeight = 10;
    const cellPadding = 2;
  
    // Set font size and style for the title
    const titleFontSize = 8; // Adjust font size as needed
    doc.setFontSize(titleFontSize);
    doc.setFont('helvetica', 'bold'); // Set font style to bold for the title
  
    // Calculate the position to center the title
    const titleWidth = doc.getStringUnitWidth('Vasol Projects') * titleFontSize / doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  
    // Draw the title at the calculated position
    doc.text('Vasol Projects', titleX, 20);
  
    // Reset font size and style to normal for column titles
    const normalFontSize = 6; // Adjust font size as needed
    doc.setFontSize(normalFontSize);
    doc.setFont('helvetica', 'normal');
  
    // Draw column titles with bold font
    for (let i = 0; i < columns.length; i++) {
      doc.setFont('helvetica', 'bold'); // Set font style to bold for column titles
      doc.text(columns[i].title, x, y);
      x += columns[i].width;
      doc.setFont('helvetica', 'normal'); // Reset font style to normal
    }
    x = 5;
    y += rowHeight + cellPadding;
  
    // Loop through the data and draw the table
    for (const row of data) {
      for (let i = 0; i < columns.length; i++) {
        doc.text(row[i].toString(), x, y);
        x += columns[i].width;
      }
      x = 5;
      y += rowHeight + cellPadding;
    }
  
    // Save the PDF with a specific file name
    doc.save('projects.pdf');
  }
  

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
      this.projectsService.delete(result.id).subscribe(() => {
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
  clearText(): void{
    this.searchQuery = "";
  }

}
