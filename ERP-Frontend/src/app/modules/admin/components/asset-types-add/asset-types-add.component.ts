import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AssetTypesService } from 'src/app/services/asset-types.service';

@Component({
  selector: 'app-asset-types-add',
  templateUrl: './asset-types-add.component.html',
  styleUrls: ['./asset-types-add.component.scss']
})
export class AssetTypesAddComponent implements OnInit {

  isLoading: boolean = false;
  assetypeId: string | null;
  assettypeData: any = {
    name: '',    
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(this.assettypeData.name, [Validators.required])
  });

  constructor(private service: AssetTypesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.assetypeId = this.route.snapshot.paramMap.get('id');

    if (this.assetypeId) {

      this.isLoading = true;
      this.service.getById(this.assetypeId).subscribe(result => {

        this.isLoading = false;

        if (!result.isError) {
          this.assettypeData.name = result.data.name;
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

    if (this.assetypeId) {
      this.service.update(this.assetypeId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/asset-types']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/asset-types']);
      });
    }
  }
}
