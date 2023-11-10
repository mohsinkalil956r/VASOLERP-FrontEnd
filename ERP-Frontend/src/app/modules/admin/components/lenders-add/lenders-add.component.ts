import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { ProductsService } from 'src/app/services/products.service';
import { LendersService } from 'src/app/services/lenders.service';
import { ProductPopupComponent } from '../popups/product-popup/product-popup.component';
import { OrganizationPopupComponent } from '../popups/organization-popup/organization-popup.component';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'app-lenders-add',
  templateUrl: './lenders-add.component.html',
  styleUrls: ['./lenders-add.component.scss'],
})
export class LendersAddComponent implements OnInit {

  constructor(private productService: ProductsService, 
    private organizationService: OrganizationsService,
    private lenderService: LendersService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  isLoading: boolean = false;
  lenderId: string | null;
  lenderData: any = {};
  organizationsData: any[];
  dropdownList: any[] = [];
  dropdownSettings = {};

  @ViewChild(ProductPopupComponent) productPopup: ProductPopupComponent;
  @ViewChild(OrganizationPopupComponent) organizationPopup: OrganizationPopupComponent;

  lenderForm: FormGroup = new FormGroup({
    email: new FormControl(this.lenderData.email, { validators: [Validators.email, Validators.required], updateOn: 'blur'}),
    firstName: new FormControl(this.lenderData.firstName, [Validators.required]),
    lastName: new FormControl(this.lenderData.lastName, [Validators.required]),
    phoneNumber: new FormControl(this.lenderData.phoneNumber),
    organizationId: new FormControl(this.lenderData.organizationId),
    productIds: new FormControl(this.lenderData.productIds, [Validators.required])
  }); 
  
  ngOnInit() {
    
    this.loadPorducts();
    this.loadOrganizations();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.lenderId = this.route.snapshot.paramMap.get('id');

    if (this.lenderId) {
      this.isLoading = true;
      this.lenderService.getById(this.lenderId).subscribe(value => {
        this.lenderForm.reset(value.data);
        this.isLoading = false;
      });
    }
    else {
      this.lenderForm.controls['email'].setAsyncValidators([entityExistsValidator(this.lenderService)]);
    }
  }

  private loadPorducts() {
    this.productService.get().subscribe(res => {
      if(!res.isError) {
        this.dropdownList = res.data;
      }
    });
  }

  private loadOrganizations() {

    this.organizationService.get().subscribe(res => {
      if(!res.isError) {
        this.organizationsData = res.data;
      }
    });
  } 

  

  lenderFormSubmit() {

    this.isLoading = true;
    let data = this.lenderForm.value;
    data.productIds = data.productIds.map((p: any) => p.id);
    if(this.lenderId) {
      this.lenderService.update(this.lenderId, data).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['admin/lenders-list']);
      });
    }
    else {
      this.lenderService.add(data).subscribe(data => {

        
        this.isLoading = false;
        this.router.navigate(['admin/lenders-list']);
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

  popupUpdate(sidebar: string) {
    if (sidebar === 'product') {
      this.loadPorducts();
      this.productPopup.closeRightSidebar(); 
    }
    else {
      this.loadOrganizations();
      this.organizationPopup.closeRightSidebar();
    }
    
  }

  openRightSidebar(sidebar: string) {
    if (sidebar === 'product') {
      this.productPopup.openRightSidebar(); 
    }
    else {
      this.organizationPopup.openRightSidebar();
    }
  }

}
