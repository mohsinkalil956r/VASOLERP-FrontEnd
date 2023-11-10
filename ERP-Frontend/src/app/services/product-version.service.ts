import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductVersionService extends BaseService{

  constructor(http: HttpClient, private toastService: ToastrService) {
  super(http, `productversion`, toastService);
}
}
