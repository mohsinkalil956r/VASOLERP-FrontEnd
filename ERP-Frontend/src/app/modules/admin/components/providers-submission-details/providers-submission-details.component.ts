import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
// for ng-select
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-providers-submission-details',
  templateUrl: './providers-submission-details.component.html',
  styleUrls: ['./providers-submission-details.component.scss']
})
export class ProvidersSubmissionDetailsComponent {
  // Dropzone file uplaod funcitons
  files: File[] = [];
  item: any;
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  // Getting uploaded file type to apply icon
  getFileType(fileType: any) {
    if (fileType) {
      var fileType = fileType.split('/');
      return (fileType = fileType[1]);
    }
    else {
      return 'general-file';
    }
  }

  // For ng select 
  statusList = [
    {
      id: 1,
      name: 'Send Back',
      icon: 'fa-arrow-left',
      color: 'primary'
    },
    {
      id: 1,
      name: 'Waive',
      icon: 'fa-hand-holding-box',
      color: 'warning'
    },
    {
      id: 1,
      name: 'Reject',
      icon: 'fa-times-octagon',
      color: 'danger'
    },
    {
      id: 1,
      name: 'Approve',
      icon: 'fa-badge-check',
      color: 'success'
    },

  ];
  selectedStatus = this.statusList[0].name;
}
