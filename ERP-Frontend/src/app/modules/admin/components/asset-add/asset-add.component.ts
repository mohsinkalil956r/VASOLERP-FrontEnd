import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetTypesService } from 'src/app/services/asset-types.service';
import {AssetsService} from 'src/app/services/assets.service';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetsAddComponent implements OnInit {

  assetTypes: any[];
  employees: any[];

  isLoading: boolean = false;
  assetId: string | null;
  assetTypeLabel: string = 'Asset Type'; 
  employeeNameLabel: string = 'Assign to'; 
  assetData: any = {
    name: '',
    description: '',
    purchaseDate: '',
    purchasePrice: '',
    assetTypeId: '',
    issuedTo:'',
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.assetData.name, [Validators.required]),
    description: new FormControl(this.assetData.description, [Validators.required]),
    purchaseDate: new FormControl(this.assetData.purchaseDate, [Validators.required]),
    purchasePrice: new FormControl(this.assetData.purchasePrice, [Validators.required]),
    assetTypeId: new FormControl(this.assetData.assetTypeId, [Validators.required]),
    issuedTo: new FormControl(this.assetData.issuedTo, [Validators.required]),

  });

  constructor(private service: AssetsService, private assetTypeService: AssetTypesService, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.assetTypeService.get().subscribe(r => {
    
      this.assetTypes = r.data;
    })
    this.employeeService.get().subscribe(r => {
      console.log('Employee data:', r.data); // Log the employee data
      this.employees = r.data;
    })
    this.assetId = this.route.snapshot.paramMap.get('id');

    if (this.assetId) {

      this.isLoading = true;
      this.service.getById(this.assetId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
       
          this.assetData.name = result.data.name;
          this.form.get('name')?.setValue(result.data.name);   
          this.assetData.description = result.data.description;
          this.form.get('description')?.setValue(result.data.description);   
          this.assetData.purchaseDate = result.data.purchaseDate;
          this.form.get('purchaseDate')?.setValue(formatDate(result.data.purchaseDate, 'yyyy-MM-dd', 'en'));
          this.assetData.purchasePrice = result.data.purchasePrice;
          this.form.get('purchasePrice')?.setValue(result.data.purchasePrice);
          this.assetData.assetTypeId = result.data.assetTypeId;
          this.form.get('assetTypeId')?.setValue(result.data.assetTypeId);
          this.assetData.issuedTo = result.data.issuedTo;
          this.form.get('issuedTo')?.setValue(result.data.issuedTo);
        
       
          }
      });
    }
  }
  public cancel(){
    
    this.router.navigate(['/admin/assets']);
  }

  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.assetId) {
      this.service.update(this.assetId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/assets']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/assets']);
      });
    }
  }
  updateAssetTypeLabel(newValue: any): void {
    const selectedValue = this.form.controls['assetTypeId'].value;
    if (selectedValue) {
        this.assetTypeLabel = '';
    } else {
        this.assetTypeLabel = 'Asset Type';
    }
  }
  updateEmployeeTypeLabel(newValue: any): void {
    const selectedValue = this.form.controls['issuedTo'].value;
    if (selectedValue) {
        this.employeeNameLabel = '';
    } else {
        this.employeeNameLabel = 'Assign to';
    }
  }
  uploadingEventHandler(status: boolean): void {
    this.isLoading = status;
  }
}
