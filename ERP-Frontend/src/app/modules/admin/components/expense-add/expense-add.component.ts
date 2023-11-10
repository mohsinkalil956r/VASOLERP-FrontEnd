import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.scss']
})
export class ExpenseAddComponent implements OnInit{

  isLoading: boolean = false;
  expenseId: string | null;
  // requestData: any;
  paymentModeLabel: string = 'Payment Mode'; 
  expenseTypeLabel: string = 'Expense Type'; 
  expenseData: any = {
    description: '',
    amount: '',
    expenseDate:'',
    paymentModeId: '',
    expenseTypeId:''
  }

  form: FormGroup = new FormGroup({
   // name: new FormControl(this.expenseData.name, [Validators.required])
   description: new FormControl(this.expenseData.description, [Validators.required]),
   amount: new FormControl(this.expenseData.amount, [Validators.required]),
   expenseDate: new FormControl(this.expenseData.expenseDate, [Validators.required]),
   paymentModeId: new FormControl(this.expenseData.paymentModeId, [Validators.required]),
   expenseTypeId: new FormControl(this.expenseData.expenseTypeId, [Validators.required]),
  });

  constructor(private service: ExpenseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.expenseId = this.route.snapshot.paramMap.get('id');

    if (this.expenseId) {

      this.isLoading = true;
      this.service.getById(this.expenseId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.expenseData.description = result.data.description;
          this.form.get('description')?.setValue(result.data.description);
          this.expenseData.amount = result.data.amount;
          this.form.get('amount')?.setValue(result.data.amount);
          this.expenseData.expenseDate = result.data.expenseDate;
          this.form.get('expenseDate')?.setValue(formatDate(result.data.expenseDate, 'yyyy-MM-dd', 'en'));
          this.expenseData.expenseTypeId = result.data.expenseTypeId;
          this.form.get('expenseTypeId')?.setValue(result.data.expenseTypeId);
          this.expenseData.paymentModeId = result.data.paymentModeId;
          this.form.get('paymentModeId')?.setValue(result.data.paymentModeId);
        }
      });
    }
  }

  public cancel(){
    
    this.router.navigate(['/admin/expense']);
  }

  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.expenseId) {
      this.service.update(this.expenseId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/expense']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/expense']);
      });
    }
  }

  updatePaymentModeLabel(newValue: any): void {
        const selectedValue = this.form.controls['paymentModeId'].value;
        if (selectedValue) {
            this.paymentModeLabel = '';
        } else {
            this.paymentModeLabel = 'Payment Mode';
        }
  }
  updateExpenseTypeLabel(newValue: any): void {
    const selectedValue = this.form.controls['expenseTypeId'].value;
    if (selectedValue) {
        this.expenseTypeLabel = '';
    } else {
        this.expenseTypeLabel = 'Expense Type';
    }
  }
  uploadingEventHandler(status: boolean): void {
    this.isLoading = status;
  }
}
