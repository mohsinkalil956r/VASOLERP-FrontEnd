import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { APIResponseModel } from '../models/api-response-model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `employees`, toastService);
  }
  getExpenses(page: number, pageSize: number, searchQuery: string): Observable<APIResponseModel<any>> {
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
