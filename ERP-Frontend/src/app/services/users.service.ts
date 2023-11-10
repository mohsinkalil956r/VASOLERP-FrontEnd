import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { ToastrService } from 'ngx-toastr';
import { APIResponseModel } from '../models/api-response-model';
import { Observable, catchError } from 'rxjs';
import { UserModel } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(http: HttpClient, private toastService: ToastrService) {
    super(http, `users`, toastService);
  }

  authenticate(username: string, password: string): Observable<APIResponseModel<UserModel>> {
    return this.http.post<APIResponseModel<UserModel>>(`${this.baseUrl}/authenticate`, { username: username, password: password})
    .pipe(
        catchError((err: HttpErrorResponse) => {
           return this.httpErrorHandler(err, {});
        })
    );
  }

  createNewPassword(currentPassword: string, password: string): Observable<APIResponseModel<UserModel>> {
    return this.http.post<APIResponseModel<UserModel>>(`${this.baseUrl}/resetpassword`, { currentPassword: currentPassword, password: password})
    .pipe(
        catchError((err: HttpErrorResponse) => {
           return this.httpErrorHandler(err, {});
        })
    );
  }
  changePassword(currentPassword: string, password: string): Observable<APIResponseModel<UserModel>> {
    return this.http.post<APIResponseModel<UserModel>>(`${this.baseUrl}/changepassword`, { currentPassword: currentPassword, password: password})
    .pipe(
        catchError((err: HttpErrorResponse) => {
           return this.httpErrorHandler(err, {});
        })
    );
  }
  forgetPassword(email: string): Observable<APIResponseModel<UserModel>> {
    debugger
    return this.http.post<APIResponseModel<UserModel>>(`${this.baseUrl}/forgetpassword`, { email: email})
    .pipe(
        catchError((err: HttpErrorResponse) => {
           return this.httpErrorHandler(err, {});
        })
    );
  }
  getUsers(page: number, pageSize: number, searchQuery: string): Observable<APIResponseModel<any>> {
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
