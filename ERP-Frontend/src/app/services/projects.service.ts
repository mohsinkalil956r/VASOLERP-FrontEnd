import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { APIResponseModel } from '../models/api-response-model';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService {
  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `projects`, toastService);

  }
  getProjects(page: number, pageSize: number, searchQuery: string): Observable<APIResponseModel<any>> {
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

