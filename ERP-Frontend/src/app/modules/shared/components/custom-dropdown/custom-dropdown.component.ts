import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { EmployeeComponent } from 'src/app/modules/admin/components/employee/employee.component';
import { AssetTypesService } from 'src/app/services/asset-types.service';
import { AssetsService } from 'src/app/services/assets.service';
import { BaseService } from 'src/app/services/base-service';
import { ClientsService } from 'src/app/services/clients.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { PaymentModesService } from 'src/app/services/payment-modes.service ';
import { ProjectsService } from 'src/app/services/projects.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {

  ngOnInit(): void {

    if (this.serviceType === "expenseType") {
      this.service = this.injector.get(ExpenseTypeService);
    }
    else if (this.serviceType === "paymentMode") {
      this.service = this.injector.get(PaymentModesService)
    }else if(this.serviceType === "clients"){
      this.service = this.injector.get(ClientsService)
    }
    else if (this.serviceType === "assetType"){
      this.service = this.injector.get(AssetTypesService)
    }
    else if (this.serviceType === "project"){
      this.service = this.injector.get(ProjectsService)
    }
    else if (this.serviceType === "assets"){
      this.service = this.injector.get(AssetsService)
    }
    else if (this.serviceType === "employees"){
      this.service = this.injector.get(EmployeeService)
    }else if (this.serviceType === "department"){
      this.service = this.injector.get(DepartmentService)
    }
    else if (this.serviceType === "statuses"){
      this.service = this.injector.get(StatusService)
    }
    this.service.get().subscribe(r => {
      this.dropdownData = r.data.items;
    })
  }

  dropdownData: any[];
  service: BaseService;

  @Input() control: AbstractControl;
  @Input() displayField: string;
  @Input() valueField: string;
  @Input() serviceType: string;
  
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

  constructor(private injector: Injector) {
    
  }

  onValueChanged(newValue: any) {
    this.valueChanged.emit(newValue);
  }
  
  getFormControl() {
    return this.control as FormControl;
  }
}
