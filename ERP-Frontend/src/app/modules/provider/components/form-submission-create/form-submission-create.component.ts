import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-submission-create',
  templateUrl: './form-submission-create.component.html',
  styleUrls: ['./form-submission-create.component.scss']
})
export class FormSubmissionCreateComponent {
  date = new Date();
  dateStringControl = new FormControl('2020-09-28');
  dateObjectControl = new FormControl(new Date());
  updateDate(event: any) {
    this.date = event.target.valueAsDate;
  }

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
