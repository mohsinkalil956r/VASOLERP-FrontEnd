import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null;
  isLoading: boolean = false;
  employeeId: string | null;
  departmentLabel: string = "Department"
  employeeData: any = {
  
    firstName: '',
    lastName: '',
    dob: '',
    cnic: '',
    salary: '',
    contractStartDate: '',
    contractEndDate: '',
    departmentId: '',
    contact: {
      email: '',
      phoneNumber: '',
      address: ''
    }
  }

  contactForm: FormGroup = new FormGroup({
    // email: new FormControl(this.employeeData.contact.email, [Validators.required]),
    email: new FormControl(this.employeeData.contact.email, [
      Validators.required,
      Validators.email  // Add email validation
    ]),
    // phoneNumber: new FormControl(this.employeeData.contact.phoneNumber, [Validators.required]),
    phoneNumber: new FormControl(this.employeeData.contact.phoneNumber, [
      Validators.required,
      Validators.minLength(10),  // Minimum length of 10 characters
      Validators.maxLength(15),  // Maximum length of 15 characters
      Validators.pattern('^[0-9]+$')  // Only allow digits
    ]),
    address: new FormControl(this.employeeData.contact.address, [Validators.required])
  });

  form: FormGroup = new FormGroup({
    firstName: new FormControl(this.employeeData.firstName, [Validators.required]),
    lastName: new FormControl(this.employeeData.lastName, [Validators.required]),
    dob: new FormControl(this.employeeData.dob, [Validators.required]),
    cnic: new FormControl(this.employeeData.cnic, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),  // Only allow integers
    ]),
    // cnic: new FormControl(this.employeeData.cnic, [Validators.required]),
    salary: new FormControl(this.employeeData.salary, [Validators.required]),
    contractStartDate: new FormControl(this.employeeData.contractStartDate, [Validators.required]),
    contractEndDate: new FormControl(this.employeeData.contractEndDate, [Validators.required]),
    
    departmentId: new FormControl(this.employeeData.departmentId, [Validators.required]),
    contact: this.contactForm,
    
  imageFile: new FormControl(null)  // Add a form control for the image file
});

  
 

  constructor(private service: EmployeeService, private route: ActivatedRoute, private router: Router,) {   this.imagePreview = null
  }
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');

    if (this.employeeId) {

      this.isLoading = true;
      this.service.getById(this.employeeId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          
          this.employeeData.contact.email = result.data.contact.email;
          this.contactForm.get('email')?.setValue(result.data.contact.email);
          this.employeeData.contact.phoneNumber = result.data.contact.phoneNumber;
          this.contactForm.get('phoneNumber')?.setValue(result.data.contact.phoneNumber);
          this.employeeData.contact.address = result.data.contact.address;
          this.contactForm.get('address')?.setValue(result.data.contact.address);
          this.employeeData.firstName = result.data.firstName;
          this.form.get('firstName')?.setValue(result.data.firstName);
          this.employeeData.lastName = result.data.lastName;
          this.form.get('lastName')?.setValue(result.data.lastName);
          this.employeeData.dob = result.data.dob;
          this.form.get('dob')?.setValue(formatDate(result.data.dob, 'yyyy-MM-dd', 'en'));
          this.employeeData.cnic = result.data.cnic;
          this.form.get('cnic')?.setValue(result.data.cnic);          
          this.employeeData.salary = result.data.salary;
          this.form.get('salary')?.setValue(result.data.salary);          
          this.employeeData.contractStartDate = result.data.contractStartDate;
          this.form.get('contractStartDate')?.setValue(formatDate(result.data.contractStartDate, 'yyyy-MM-dd', 'en'));
          this.employeeData.contractEndDate = result.data.contractEndDate;
          this.form.get('contractEndDate')?.setValue(formatDate(result.data.contractEndDate, 'yyyy-MM-dd', 'en'));
          debugger
          this.employeeData.departmentId = result.data.departmentId;
          this.form.get('departmentId')?.setValue(result.data.departmentId);  
        }
      });
    }
  }


  // onImageUpload(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     this.form.get('imageFile')?.setValue(file);
  //     this.previewImage(file);


  //   }
  // }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.previewImage(file);
    }
  }

  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.employeeId) {
      this.service.update(this.employeeId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/employee']);
        
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/employee']);
      });
    }
  }
  
  public cancel(){
    this.router.navigate(['/admin/employee']);
  }

  selectDepartmentLabel(newValue: any): void {
    const selectedValue = this.form.controls['departmentId'].value;
    if (selectedValue) {
        this.departmentLabel = '';
    } else {
        this.departmentLabel = 'Department';
    }
}
previewImage(file: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}
}




