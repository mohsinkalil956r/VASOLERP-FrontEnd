import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'app-item-Price',
  templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.scss']
})
export class ItemPriceComponent implements OnInit {

  isLoading: boolean = false;
  itemId: string | null;
  selectedUserType: string = ''; // Initialize with an empty string
  labelPlaceholder: string = 'User Type'; // Placeholder text for the label
  departmentData: any = {
    name: '',
    hod:'',
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.departmentData.name,  { validators: [ Validators.required], asyncValidators: [entityExistsValidator(this.service)], updateOn: 'blur'},),
    hod: new FormControl(this.departmentData.hod, { validators: [ Validators.required], asyncValidators: [entityExistsValidator(this.service)], updateOn: 'blur'}),
    
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
