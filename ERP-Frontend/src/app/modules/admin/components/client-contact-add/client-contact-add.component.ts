import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientContactsService } from 'src/app/services/client-contacts.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-client-contact-add',
  templateUrl: './client-contact-add.component.html',
  styleUrls: ['./client-contact-add.component.scss']
})
export class ClientContactAddComponent implements OnInit {

  isLoading: boolean = false;
  clientContactId: string | null;
  clientContactData: any = {
    clientId: '',
    email: '',
    phoneNumber: '',
    website: '',
    address: '',
  }

  form: FormGroup = new FormGroup({
    clientId: new FormControl(this.clientContactData.clientId, [Validators.required]),
    email: new FormControl(this.clientContactData.email, [Validators.required]),
    phoneNumber: new FormControl(this.clientContactData.phoneNumber, [Validators.required]),
    website: new FormControl(this.clientContactData.website, [Validators.required]),
    address: new FormControl(this.clientContactData.address, [Validators.required]),

  });

  constructor(private service: ClientContactsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.clientContactId = this.route.snapshot.paramMap.get('id');

    if (this.clientContactId) {

      this.isLoading = true;
      this.service.getById(this.clientContactId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.clientContactData.clientId = result.data.clientId;
          this.form.get('clientId')?.setValue(result.data.clientId);
          this.clientContactData.email = result.data.email;
          this.form.get('email')?.setValue(result.data.email);
          this.clientContactData.phoneNumber = result.data.phoneNumber;
          this.form.get('phoneNumber')?.setValue(result.data.phoneNumber);
          this.clientContactData.website = result.data.website;
          this.form.get('website')?.setValue(result.data.website);
          this.clientContactData.address = result.data.address;
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

    if (this.clientContactId) {
      this.service.update(this.clientContactId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/client-contacts']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/client-contacts']);
      });
    }
  }
}
