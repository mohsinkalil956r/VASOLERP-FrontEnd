import { Component } from '@angular/core';

@Component({
  selector: 'app-mbr-request',
  templateUrl: './mbr-request.component.html',
  styleUrls: ['./mbr-request.component.scss']
})
export class MbrRequestComponent {
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

  openRightSidebar = function (sidebarToOpen: string) {
    // event.preventDefault();
    $('.right-sidebar').toggleClass('open');
    $('.product, .orgnization').hide();
    $('.' + sidebarToOpen).show();
  }
  closeRightSidebar = function () {
    $('.right-sidebar').removeClass('open');
  }
}
