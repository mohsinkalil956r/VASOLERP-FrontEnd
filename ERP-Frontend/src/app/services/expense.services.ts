import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends BaseService {

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `expense`, toastService);
  }
}
