import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { APIResponseModel } from '../models/api-response-model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends BaseService {
  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `department`, toastService);
  }
  getDepartment(page: number, pageSize: number, searchQuery: string): Observable<APIResponseModel<any>> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchQuery', searchQuery);

    return this.http.get<APIResponseModel<any>>(`${this.baseUrl}`, { params })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return this.httpErrorHandler(err, {});
        })
      );
  }
}

