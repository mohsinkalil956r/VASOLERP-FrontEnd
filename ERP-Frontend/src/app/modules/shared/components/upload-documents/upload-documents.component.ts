import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentModel, UPLOADSTATUS } from 'src/app/models/document/document.model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent {

  constructor(
    private documentService: DocumentService, private toastr: ToastrService
  ) {}

  @Input() disabled: boolean;
  @Input() isMulti: boolean = true;
  @Output() uploadingEvent = new EventEmitter<boolean>();
  @Output() onFileRemove = new EventEmitter<number>();

  public uploadedFiles(): any[] {
    return this.files.filter(file => file.uploadStatus === UPLOADSTATUS.SUCCESS).map((f) => ({ name: f.file.name, serverFileName: f.serverFileName }));
  }

  files: DocumentModel[] = [];

  // onSelect(event: any) {
  //   event.addedFiles.forEach((file: File) => {
  //     const documentDetails = new DocumentModel(file);

  //     this.documentService.uploadDocument(file).subscribe(
  //       (res) => {
  //         if (res.isError) {
  //           documentDetails.uploadStatus = UPLOADSTATUS.ERROR;
  //         } else {
  //           documentDetails.uploadStatus = UPLOADSTATUS.SUCCESS;
  //           documentDetails.serverFileName = res.data.fileName;
  //         }
  //         if (!this.files.some(d => d.uploadStatus === UPLOADSTATUS.PENDING)) {
  //           this.uploadingEvent.emit(false);
  //         }
  //       },
  //       (error) => {
  //         console.error('Error uploading file:', error);
  //         documentDetails.uploadStatus = UPLOADSTATUS.ERROR;
  //         this.uploadingEvent.emit(false);
  //       }
  //     );

  //     this.files.push(documentDetails);
  //     this.uploadingEvent.emit(true);
  //   });
  // }
  onSelect(event: any) {
    event.addedFiles.forEach((file: File) => {
      // Check if the file size exceeds 2MB (2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        // Display an error toast message indicating that the file size exceeds the limit
        this.toastr.error('File size exceeds the maximum allowed size (2MB). Please upload a smaller file.');
        return; // Skip this file
      }

      // Continue with the upload for files within the size limit
      const documentDetails = new DocumentModel(file);

      this.documentService.uploadDocument(file).subscribe(
        (res) => {
          if (res.isError) {
            documentDetails.uploadStatus = UPLOADSTATUS.ERROR;
          } else {
            documentDetails.uploadStatus = UPLOADSTATUS.SUCCESS;
            documentDetails.serverFileName = res.data.fileName;
          }
          if (!this.files.some(d => d.uploadStatus === UPLOADSTATUS.PENDING)) {
            this.uploadingEvent.emit(false);
          }
        },
        (error) => {
          console.error('Error uploading file:', error);
          documentDetails.uploadStatus = UPLOADSTATUS.ERROR;
          this.uploadingEvent.emit(false);
        }
      );

      this.files.push(documentDetails);
      this.uploadingEvent.emit(true);
    });
  }


  public get uploadStatus(): typeof UPLOADSTATUS {
    return UPLOADSTATUS;
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.onFileRemove.emit(this.files.length);
  }

  getFileType(fileType: any) {
    if (fileType) {
      const fileTypeParts = fileType.split('/');
      return fileTypeParts[1];
    } else {
      return 'general-file';
    }
  }

  public clearFiles() {
    this.files = [];
    this.onFileRemove.emit(this.files.length);
  }
}
