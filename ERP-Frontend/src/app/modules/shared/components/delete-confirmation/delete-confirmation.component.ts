import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AssetTypesService } from 'src/app/services/asset-types.service';
import { AssetsService } from 'src/app/services/assets.service';
import { BaseService } from 'src/app/services/base-service';
import { ClientsService } from 'src/app/services/clients.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseTypeService } from 'src/app/services/expense-type.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { PaymentModesService } from 'src/app/services/payment-modes.service ';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent  implements OnInit {

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
    else if (this.serviceType === "projects"){
      this.service = this.injector.get(ProjectsService)
    }
    else if (this.serviceType === "clients"){
      this.service = this.injector.get(ClientsService)
    }
    else if (this.serviceType === "assets"){
      this.service = this.injector.get(AssetsService)
    }
    else if (this.serviceType === "expense"){
      this.service = this.injector.get(ExpenseService)
    }
    else if (this.serviceType === "contacts"){
      this.service = this.injector.get(ContactsService)
    }else if (this.serviceType === "employee"){
      this.service = this.injector.get(EmployeeService)
    }
  }

  service: BaseService;


  constructor(private injector: Injector) { }

  @Input() heading = '';
  @Input() message = '';
  @Input() confirmButton = '';
  @Input() cancelButton = '';
  @Input() serviceType: string;


  @Output() onDelete = new EventEmitter<any>();

  private itemId: any;

  @ViewChild('popupTrigger', { read: ElementRef }) trigger: ElementRef<HTMLElement>;

  showPopup(id: any) {
    this.itemId = id;
    this.trigger.nativeElement.click();
  }

  onConfirmation() {

    this.service.delete(this.itemId).subscribe(r => {
      this.onDelete.emit({ confirmed: true, id: this.itemId});
    });
    this.trigger.nativeElement.click();
  }

}
