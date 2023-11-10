import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { APIResponseModel } from '../models/api-response-model';

@Injectable({
  providedIn: 'root'
})

export class LendersService extends BaseService {

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `lenders`, toastService);
  }

  uploadDocument(id: string, file: File): Observable<APIResponseModel<any>> {

    let formData = new FormData();
    formData.append(file.name, file);

    return this.http.post<APIResponseModel<any>>(`${this.baseUrl}/documentupload/${id}`, formData)
    .pipe(
        catchError((err: HttpErrorResponse) => {
           return this.httpErrorHandler(err, {});
        })
    );
}
}
