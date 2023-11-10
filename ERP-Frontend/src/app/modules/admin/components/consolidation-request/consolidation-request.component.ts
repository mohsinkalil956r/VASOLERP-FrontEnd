import { Component } from '@angular/core';

@Component({
  selector: 'app-consolidation-request',
  templateUrl: './consolidation-request.component.html',
  styleUrls: ['./consolidation-request.component.scss']
})
export class ConsolidationRequestComponent {
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
      name: 'Send For Review',
      icon: 'fa-arrow-left',
      color: 'primary'
    },
    {
      id: 1,
      name: 'Deny / Reject',
      icon: 'fa-times-octagon',
      color: 'danger'
    },

  ];
  selectedStatus = this.statusList[0].name;
}
