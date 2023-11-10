import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'organization-popup',
  templateUrl: './organization-popup.component.html',
  styleUrls: ['./organization-popup.component.scss']
})
export class OrganizationPopupComponent {

  public organizationId: string | null;
  isLoading: boolean = false;

  public organizationForm: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    description: new FormControl('', [Validators.required]),
  });

  @Output() updateEvent = new EventEmitter<any>();

  constructor(private service: OrganizationsService) {
    
  }

  closeRightSidebar(){
    this.organizationForm.reset();
    $('.organization-sidebar').removeClass('open');
  }

  openRightSidebar(id: string | null = null) {
    this.organizationForm.reset();
    this.organizationId = id;

    $('.organization-sidebar').toggleClass('open');

    if(this.organizationId) {
      this.organizationForm.controls['name'].setAsyncValidators([]);
      this.isLoading = true;
      this.service.getById(this.organizationId).subscribe(res => {
        if(!res.isError) {
          this.organizationForm.reset({ name: res.data.name, description: res.data.description });
          this.isLoading = false;
        }
      })
    }
    else {
      this.organizationForm.controls['name'].setAsyncValidators([entityExistsValidator(this.service)]);
    }
  }

  onSubmit() {
    if(this.organizationForm.valid) {

      this.isLoading = true;
      if(this.organizationId) {
        this.service.update(this.organizationId, this.organizationForm.value).subscribe(data => {
          this.updateEvent.emit(this.organizationId);
          this.closeRightSidebar();
          this.isLoading = false;
        });
      }
      else {
        this.service.add(this.organizationForm.value).subscribe(data => {
          this.updateEvent.emit(this.organizationId);
          this.closeRightSidebar();
          this.isLoading = false;
        });
      }
    }
  }

 }
  
