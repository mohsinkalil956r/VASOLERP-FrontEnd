import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-expense-type-add',
  templateUrl: './expense-type-add.component.html',
  styleUrls: ['./expense-type-add.component.scss']
})
export class ExpenseTypeAddComponent implements OnInit {

  isLoading: boolean = false;
  expenseTypeId: string | null;
  expenseTypeData: any = {
    name: '',
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.expenseTypeData.name, [Validators.required])
  });

  constructor(private service: ExpenseTypeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.expenseTypeId = this.route.snapshot.paramMap.get('id');

    if (this.expenseTypeId) {

      this.isLoading = true;
      this.service.getById(this.expenseTypeId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.expenseTypeData.name = result.data.name;
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

    if (this.expenseTypeId) {
      this.service.update(this.expenseTypeId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/expense-types']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/expense-types']);
      });
    }
  }
}
