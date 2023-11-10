import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentModesService } from 'src/app/services/payment-modes.service ';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-payment-mode-add',
  templateUrl: './payment-mode-add.component.html',
  styleUrls: ['./payment-mode-add.component.scss']
})
export class PaymentModeAddComponent implements OnInit {

  constructor(private service: PaymentModesService, private route: ActivatedRoute, private router: Router) { }

  isLoading: boolean = false;
  paymentModeId: string | null;
  paymentModeData: any = {
    name: '',
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.paymentModeData.name, [Validators.required])
  });


  ngOnInit() {
    
    this.paymentModeId = this.route.snapshot.paramMap.get('id');

    if (this.paymentModeId) {

      this.isLoading = true;
      this.service.getById(this.paymentModeId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.paymentModeData.name = result.data.name;
          this.form.get('name')?.setValue(result.data.name);
        }
      });
    }
  }



  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.paymentModeId) {
      this.service.update(this.paymentModeId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/payment-modes']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/payment-modes']);
      });
    }
  }
}
