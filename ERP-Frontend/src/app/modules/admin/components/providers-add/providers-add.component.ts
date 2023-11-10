import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { OrganizationPopupComponent } from '../popups/organization-popup/organization-popup.component';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'app-providers-add',
  templateUrl: './providers-add.component.html',
  styleUrls: ['./providers-add.component.scss'],
})
export class ProvidersAddComponent implements OnInit {

  constructor(private organizationService: OrganizationsService,
    private providerService: ProvidersService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  isLoading: boolean = false;
  providerId: string | null;
  providerData: any = {};
  organizationsData: any[];

  @ViewChild(OrganizationPopupComponent) organizationPopup: OrganizationPopupComponent;

  providerForm: FormGroup = new FormGroup({
    email: new FormControl(this.providerData.email, { validators: [Validators.email, Validators.required], updateOn: 'blur'}),
    firstName: new FormControl(this.providerData.firstName, [Validators.required]),
    lastName: new FormControl(this.providerData.lastName, [Validators.required]),
    phoneNumber: new FormControl(this.providerData.phoneNumber, [Validators.required]),
    organizationId: new FormControl(this.providerData.organizationId, [Validators.required])
  }); 
  
  ngOnInit() {
    
    this.loadOrganizations();

    this.providerId = this.route.snapshot.paramMap.get('id');

    if (this.providerId) {
      this.isLoading = true;
      this.providerService.getById(this.providerId).subscribe(value => {
        this.providerForm.reset(value.data);
        this.isLoading = false;
      });
    }
    else {
      this.providerForm.controls['email'].setAsyncValidators([entityExistsValidator(this.providerService)]);
    }
  }

  private loadOrganizations() {

    this.organizationService.get().subscribe(res => {
      if(!res.isError) {
        this.organizationsData = res.data;
      }
    });
  } 

  

  providerFormSubmit() {

    this.isLoading = true;
    if(this.providerId) {
      this.providerService.update(this.providerId, this.providerForm.value).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['admin/providers-list']);
      });
    }
    else {
      this.providerService.add(this.providerForm.value).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['admin/providers-list']);
      });
    }
    
    
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

  openRightSidebar() {
      this.organizationPopup.openRightSidebar();
  }

  popupUpdate() {
    
    this.loadOrganizations();
    this.organizationPopup.closeRightSidebar();
    
  }

}
