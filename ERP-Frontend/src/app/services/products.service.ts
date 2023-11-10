import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {

  private apiUrl = `products`;
  private httpClient: HttpClient;

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `products`, toastService);
  }

}
