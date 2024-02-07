import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';
@Component({
  selector: 'app-item-Price',
  templateUrl: './item-price.component.html',
  styleUrls: ['./item-price.component.scss']
})
export class ItemPriceComponent implements OnInit {

  isLoading: boolean = false;
  itemId: string | null;
  selectedcostingMethod: string = '';
 
   // Initialize with an empty string
  labelcostingMethod: string = 'Costing Method'; // Placeholder text for the label
  departmentData: any = {
    costPrice:'',
    weightedAverageCourse:'',
    lastPurchasedCost:'',
    taxIncludedCostPrice:'',
    cessOnTax:'',
    maxDiscount:'',
    lastPurchasedDate:'',
    taxIncludedRetailPrice:'',
    lastSoldDate:'',
    costingMethod:'',
    salesman:'',
    agent:'',
    vat:'',
    CGST:'',
    SGST:'',
    IGST:'',


  }

  form: FormGroup = new FormGroup({
    costPrice: new FormControl(this.departmentData.costPrice, ),
    weightedAverageCourse: new FormControl(this.departmentData.weightedAverageCourse, ),
    lastPurchasedCost: new FormControl(this.departmentData.lastPurchasedCost, ),
    taxIncludedCostPrice: new FormControl(this.departmentData.taxIncludedCostPrice, ),
    taxIncludedRetailPrice: new FormControl(this.departmentData.taxIncludedRetailPrice, ),
    cessOnTax: new FormControl(this.departmentData.cessOnTax, ),
    maxDiscount: new FormControl(this.departmentData.maxDiscount, ),
    lastPurchasedDate: new FormControl(this.departmentData.lastPurchasedDate, ),
    lastSoldDate: new FormControl(this.departmentData.lastSoldDate, ),
    costingMethod: new FormControl(this.departmentData.costingMethod, ),
    salesman: new FormControl(this.departmentData.salesman, ),
    agent: new FormControl(this.departmentData.agent, ),
    vat: new FormControl(this.departmentData.vat, ),
    CGST: new FormControl(this.departmentData.CGST, ),
    SGST: new FormControl(this.departmentData.SGST, ),
    IGST: new FormControl(this.departmentData.IGST, ),
    
  });

  constructor(private service: DepartmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.itemId = this.route.snapshot.paramMap.get('id');

    if (this.itemId) {

      this.isLoading = true;
      this.service.getById(this.itemId).subscribe((result: any) => {

        this.isLoading = false;

        if (!result.isError) {
          this.departmentData.name = result.data.name;
          this.form.get('name')?.setValue(result.data.name);
          this.departmentData.hod = result.data.hod;
          this.form.get('hod')?.setValue(result.data.hod);
        }
      });
    }
  }
  updateLabel(event: any) {
    debugger
    // Update the label when an option is selected
    this.selectedcostingMethod = event.target.value;
    if(this.selectedcostingMethod==='Admin'){
    
    
    }
  }


  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.itemId) {
      this.service.update(this.itemId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/department']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/department']);
      });
    }
  }
  public cancel(){
    debugger;
    this.router.navigate(['/admin/department']);
  }
}
