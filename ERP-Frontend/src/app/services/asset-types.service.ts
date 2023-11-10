import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AssetTypesService extends BaseService {

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `assettypes`, toastService);
  }
}
