import { Component } from '@angular/core';

@Component({
  selector: 'app-form-consolidation-create',
  templateUrl: './form-consolidation-create.component.html',
  styleUrls: ['./form-consolidation-create.component.scss']
})
export class FormConsolidationCreateComponent {
  // Dropzone file uplaod funcitons
  files: File[] = [];
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
}
