import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {

  isLoading: boolean = false;
  departmentId: string | null;
  departmentData: any = {
    name: '',
    hod:'',
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.departmentData.name,  { validators: [ Validators.required], asyncValidators: [entityExistsValidator(this.service)], updateOn: 'blur'},),
    hod: new FormControl(this.departmentData.hod, { validators: [ Validators.required], asyncValidators: [entityExistsValidator(this.service)], updateOn: 'blur'})
  });

  constructor(private service: DepartmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.departmentId = this.route.snapshot.paramMap.get('id');

    if (this.departmentId) {

      this.isLoading = true;
      this.service.getById(this.departmentId).subscribe((result: any) => {

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



  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.departmentId) {
      this.service.update(this.departmentId, this.form.value).subscribe(() => {
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
