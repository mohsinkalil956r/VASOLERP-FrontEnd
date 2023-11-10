import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetTypesService } from 'src/app/services/asset-types.service';
import { BaseService } from 'src/app/services/base-service';
import { DepartmentService } from 'src/app/services/department.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { PaymentModesService } from 'src/app/services/payment-modes.service ';
import { ProjectsService } from 'src/app/services/projects.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'single-field-popup',
  templateUrl: './single-field-popup.component.html',
  styleUrls: ['./single-field-popup.component.scss']
})
export class SingleFieldPopupComponent implements OnInit {

  ngOnInit(): void {

    if (this.serviceType === "expenseType") {
      this.service = this.injector.get(ExpenseTypeService);
    }
    else if (this.serviceType === "paymentMode") {
      this.service = this.injector.get(PaymentModesService)
    }
    else if (this.serviceType === "assetType"){
      this.service = this.injector.get(AssetTypesService)
    }
    else if (this.serviceType === "department"){
      this.service = this.injector.get(DepartmentService)
    }


  }

  service: BaseService;
  public Id: string | null;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
  });

  @Output() updateEvent = new EventEmitter<any>();
  @Input() serviceType: string;
  @Input() label: string;

  constructor(private injector: Injector) { }

  isLoading: boolean = false;

  closeRightSidebar(){
    this.form.reset();
    $('.single-field-sidebar').removeClass('open');
  }

  openRightSidebar(id: string | null = null) {
    this.form.reset();
    this.Id = id;

    $('.single-field-sidebar').toggleClass('open');

    if(this.Id) {
      this.form.controls['name'].setAsyncValidators([]);
      this.isLoading = true;
      this.service.getById(this.Id).subscribe(res => {
        if(!res.isError) {
          this.form.reset({ name: res.data.name });
        this.isLoading = false;
        }
      })
    }
    else {
      this.form.controls['name'].setAsyncValidators([entityExistsValidator(this.service)]);
    }
  }

  onSubmit() {
    if(this.form.valid) {
      this.isLoading = true;
      if(this.Id) {
        this.service.update(this.Id, this.form.value).subscribe(data => {
          this.updateEvent.emit(this.Id);
          this.closeRightSidebar();
          this.isLoading = false;
        });
      }
      else {
        this.service.add(this.form.value).subscribe(data => {
          this.updateEvent.emit(this.Id);
          this.closeRightSidebar();
          this.isLoading = false;
        });
      }
    }
  }

 }
  
