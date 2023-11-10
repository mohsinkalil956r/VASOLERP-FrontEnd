import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends BaseService {

  private apiUrl = `organizations`;
  private httpClient: HttpClient;

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `organizations`, toastService);
  }
}
