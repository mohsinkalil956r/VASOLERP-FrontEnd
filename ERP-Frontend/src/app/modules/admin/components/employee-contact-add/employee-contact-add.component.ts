import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeContactsService } from 'src/app/services/employee-contacts.service ';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-employee-contact-add',
  templateUrl: './employee-contact-add.component.html',
  styleUrls: ['./employee-contact-add.component.scss']
})
export class EmployeeContactAddComponent implements OnInit {

  constructor(private service: EmployeeContactsService, private route: ActivatedRoute, private router: Router) { }

  isLoading: boolean = false;
  employeeContactId: string | null;
  employeeContactData: any = {
    employeeId: '',
    email: '',
    phoneNumber: '',
    website: '',
    address: '',
  }

  form: FormGroup = new FormGroup({
    employeeId: new FormControl(this.employeeContactData.employeeId, [Validators.required]),
    email: new FormControl(this.employeeContactData.email, [Validators.required]),
    phoneNumber: new FormControl(this.employeeContactData.phoneNumber, [Validators.required]),
    website: new FormControl(this.employeeContactData.website, [Validators.required]),
    address: new FormControl(this.employeeContactData.address, [Validators.required]),

  });


  ngOnInit() {
    
    this.employeeContactId = this.route.snapshot.paramMap.get('id');

    if (this.employeeContactId) {

      this.isLoading = true;
      this.service.getById(this.employeeContactId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.employeeContactData.employeeId = result.data.employeeId;
          this.form.get('employeeId')?.setValue(result.data.employeeId);
          this.employeeContactData.email = result.data.email;
          this.form.get('email')?.setValue(result.data.email);
          this.employeeContactData.phoneNumber = result.data.phoneNumber;
          this.form.get('phoneNumber')?.setValue(result.data.phoneNumber);
          this.employeeContactData.website = result.data.website;
          this.form.get('website')?.setValue(result.data.website);
          this.employeeContactData.address = result.data.address;
          this.form.get('address')?.setValue(result.data.address);
        }
      });
    }
  }



  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.employeeContactId) {
      this.service.update(this.employeeContactId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/employee-contacts']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/employee-contacts']);
      });
    }
  }
}
