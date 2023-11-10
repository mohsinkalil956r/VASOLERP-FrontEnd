import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-payment-mode-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.scss']
})
export class ClientsAddComponent implements OnInit {

  isLoading: boolean = false;
  clientId: string | null;
  clientData: any = {

    firstName: '',
    lastName:'',
    contact: {
      address :'',
      phoneNumber:'',
      email:'',
      website:'',
    }
  }
  formContact: FormGroup = new FormGroup({
    address: new FormControl(this.clientData.contact.address, [Validators.required]),
    phoneNumber: new FormControl(this.clientData.contact.phoneNumber, [Validators.required]),
    email: new FormControl(this.clientData.contact.email, [Validators.required]),
    website: new FormControl(this.clientData.contact.website, [Validators.required]),
  });
  form: FormGroup = new FormGroup({
    firstName: new FormControl(this.clientData.firstName, [Validators.required]),
    lastName: new FormControl(this.clientData.lastName, [Validators.required]),
    contact: this.formContact
  });
  

  constructor(private service: ClientsService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    
    this.clientId = this.route.snapshot.paramMap.get('id');

    if (this.clientId) {

      this.isLoading = true;
      this.service.getById(this.clientId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {

          this.clientData.contact.address = result.data.contact.address;
          this.formContact.get('address')?.setValue(result.data.contact.address);
          this.clientData.contact.phoneNumber = result.data.contact.phoneNumber;
          this.formContact.get('phoneNumber')?.setValue(result.data.contact.phoneNumber);
          this.clientData.contact.email = result.data.contact.email;
          this.formContact.get('email')?.setValue(result.data.contact.email);
          this.clientData.contact.website = result.data.contact.website;
          this.formContact.get('website')?.setValue(result.data.contact.website);

          this.clientData.firstName = result.data.firstName;
          this.form.get('firstName')?.setValue(result.data.firstName);
          this.clientData.lastName = result.data.lastName;
          this.form.get('lastName')?.setValue(result.data.lastName);
        }
      });
    }
  }



  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.clientId) {
      this.service.update(this.clientId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/clients']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/clients']);
      });
    }
  }
  public cancel(){
    debugger;
    this.router.navigate(['/admin/clients']);
  }
}
