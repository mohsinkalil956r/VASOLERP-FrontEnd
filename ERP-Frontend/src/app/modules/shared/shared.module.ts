import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { CommonModule } from '@angular/common';
import { SingleFieldPopupComponent } from './components/single-field-popup/single-field-popup.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    CustomDropdownComponent,
    SingleFieldPopupComponent,
    DeleteConfirmationComponent,
    UploadDocumentsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDropzoneModule,
  ],

  providers: [
  ],
  exports: [
    CustomDropdownComponent,
    SingleFieldPopupComponent,
    DeleteConfirmationComponent,
    UploadDocumentsComponent,
  ]
})
export class SharedModule { }
