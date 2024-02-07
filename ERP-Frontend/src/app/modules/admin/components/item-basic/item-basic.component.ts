import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'item-basic',
  templateUrl: './item-basic.component.html',
  styleUrls: ['./item-basic.component.scss'],
})
export class ItemBasicComponent implements OnInit {

  isLoading: boolean = false;
  itemId: string | null;
  selectedUserType: string = 'Type'; // Initialize with an empty string
  labelPlaceholder: string = 'Type'; // Placeholder text for the label
  selectedprimaryUOM: string = 'Type'; // Initialize with an empty string
  labelprimaryUOM: string = 'Type';
  selectedsecondaryUOM: string = 'Type'; // Initialize with an empty string
  labelsecondaryUOM: string = 'Type'; 
  // Placeholder text for the label
  // Placeholder text for the label
 
  departmentData: any = {
    name: '',
    description:'',
    category: '',
    group:'',
    type:'',
    secondaryUOM:'',
    reOrderQuantity:'',
    primaryUOM:'',
    manufacturer:'',
    styleNo:'',
    HSNCode:'',
    orderQuantity:'',
    remarks:'',
    isActive:'',
    brand:'',
    image:null,
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.departmentData.name,  { validators: [ Validators.required], asyncValidators: [entityExistsValidator(this.service)], updateOn: 'blur'},),
    description: new FormControl(this.departmentData.description, { validators: [ Validators.required], asyncValidators: [entityExistsValidator(this.service)], updateOn: 'blur'}),
    category: new FormControl(this.departmentData.category,  ),
    group: new FormControl(this.departmentData.group, ),
    styleNo: new FormControl(this.departmentData.styleNo, ),
    HSNCode: new FormControl(this.departmentData.HSNCode, ),
    orderQuantity: new FormControl(this.departmentData.orderQuantity,  ),
    remarks: new FormControl(this.departmentData.remarks, ),
    isActive: new FormControl(this.departmentData.isActive, ),
    image: new FormControl(this.departmentData.image),
    type: new FormControl(this.departmentData.type, ),
    primaryUOM: new FormControl(this.departmentData.primaryUOM, ),
    reOrderQuantity: new FormControl(this.departmentData.reOrderQuantity, ),
    manufacturer: new FormControl(this.departmentData.manufacturer, ),
    brand: new FormControl(this.departmentData.brand, ),
    secondaryUOM: new FormControl(this.departmentData.secondaryUOM, ), // Add a FormControl for the image
 
  });

  constructor(private service: DepartmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.itemId = this.route.snapshot.paramMap.get('id');

    if (this.itemId) {

      this.isLoading = true;
      this.service.getById(this.itemId).subscribe((result: any) => {

        this.isLoading = false;

        if (!result.isError) {
          this.departmentData.name = result.data.name;
          this.form.get('name')?.setValue(result.data.name);
          this.departmentData.hod = result.data.hod;
          this.form.get('hod')?.setValue(result.data.hod);
        }
      });
    }
  }
  updateLabel(event: any) {
    debugger
    // Update the label when an option is selected
    this.selectedUserType = event.target.value;
    if(this.selectedUserType==='Admin'){
    
    
    }
  }


  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.itemId) {
      this.service.update(this.itemId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/department']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/department']);
      });
    }
  }
  public cancel(){
    debugger;
    this.router.navigate(['/admin/department']);
  }
}
