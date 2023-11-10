import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  constructor(private service: ContactsService, private route: ActivatedRoute, private router: Router) { }

  isLoading: boolean = false;
  contactId: string | null;
  contactData: any = {
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    website: '',
    address: '',
  }

  form: FormGroup = new FormGroup({
    type: new FormControl(this.contactData.type, [Validators.required]),
    firstName: new FormControl(this.contactData.firstName, [Validators.required]),
    lastName: new FormControl(this.contactData.lastName, [Validators.required]),
    email: new FormControl(this.contactData.email, [Validators.required]),
    phoneNumber: new FormControl(this.contactData.phoneNumber, [Validators.required]),
    website: new FormControl(this.contactData.website, [Validators.required]),
    address: new FormControl(this.contactData.address, [Validators.required]),


  });


  ngOnInit() {
    
    this.contactId = this.route.snapshot.paramMap.get('id');

    if (this.contactId) {

      this.isLoading = true;
      this.service.getById(this.contactId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.contactData.type = result.data.type;
          this.form.get('type')?.setValue(result.data.type);
          this.contactData.firstName = result.data.firstName;
          this.form.get('firstName')?.setValue(result.data.firstName);
          this.contactData.lastName = result.data.lastName;
          this.form.get('lastName')?.setValue(result.data.lastName);
          this.contactData.email = result.data.email;
          this.form.get('email')?.setValue(result.data.email);
          this.contactData.phoneNumber = result.data.phoneNumber;
          this.form.get('phoneNumber')?.setValue(result.data.phoneNumber);
          this.contactData.website = result.data.website;
          this.form.get('website')?.setValue(result.data.website);
          this.contactData.address = result.data.address;
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

    if (this.contactId) {
      this.service.update(this.contactId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/contacts']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/contacts']);
      });
    }
  }

  public cancel(){
    debugger;
    this.router.navigate(['/admin/contacts']);
  }

}
