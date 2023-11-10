import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss']
})
export class ProductPopupComponent {

  public productId: string | null;

  public productForm: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    description: new FormControl('', [Validators.required]),
  });

  @Output() updateEvent = new EventEmitter<any>();

  constructor(private service: ProductsService) {
    
  }

  isLoading: boolean = false;

  closeRightSidebar(){
    this.productForm.reset();
    $('.product-sidebar').removeClass('open');
  }

  openRightSidebar(id: string | null = null) {
    this.productForm.reset();
    this.productId = id;

    $('.product-sidebar').toggleClass('open');

    if(this.productId) {
      this.productForm.controls['name'].setAsyncValidators([]);
      this.isLoading = true;
      this.service.getById(this.productId).subscribe(res => {
        if(!res.isError) {
          this.productForm.reset({ name: res.data.name, description: res.data.description });
        this.isLoading = false;
        }
      })
    }
    else {
      this.productForm.controls['name'].setAsyncValidators([entityExistsValidator(this.service)]);
    }
  }

  onSubmit() {
    if(this.productForm.valid) {
      this.isLoading = true;
      if(this.productId) {
        this.service.update(this.productId, this.productForm.value).subscribe(data => {
          this.updateEvent.emit(this.productId);
          this.closeRightSidebar();
          this.isLoading = false;
        });
      }
      else {
        this.service.add(this.productForm.value).subscribe(data => {
          this.updateEvent.emit(this.productId);
          this.closeRightSidebar();
          this.isLoading = false;
        });
      }
    }
  }

 }
  
