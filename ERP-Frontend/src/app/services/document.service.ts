import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { APIResponseModel } from '../models/api-response-model';

@Injectable({
  providedIn: 'root'
})

export class DocumentService extends BaseService {

  constructor(http: HttpClient, toastService: ToastrService) {
    super(http, `documents`, toastService);
  }

  // uploadDocument(file: File): Observable<APIResponseModel<any>> {

  //   let formData = new FormData();
  //   formData.append("file", file);

  //   return this.http.post<APIResponseModel<any>>(`${this.baseUrl}`, formData)
  //   .pipe(
  //       catchError((err: HttpErrorResponse) => {
  //          return this.httpErrorHandler(err, {});
  //       })
  //   );
  // }
  uploadDocument(file: File): Observable<APIResponseModel<any>> {
    let formData = new FormData();
    formData.append("file", file);

    return this.http.post<APIResponseModel<any>>(`${this.baseUrl}`, formData)
    .pipe(
        catchError((err: HttpErrorResponse) => {
           return this.httpErrorHandler(err, {});
        })
    );
}
downloadDocument(fileServerFileName: string) {
  const downloadUrl = `${this.baseUrl}/download/${fileServerFileName}`;

  this.http
    .get(downloadUrl, {
      responseType: 'blob', // Specify that the response is binary data (a file)
    })
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return this.httpErrorHandler(err, {});
      })
    )
    .subscribe((res: Blob | APIResponseModel<any>) => {
      if (res instanceof Blob) {
        // Handle the Blob response (the file)
        const blobUrl = URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileServerFileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        // Handle the APIResponseModel<any> if needed
        console.error('Received unexpected response:', res);
      }
    });
}

  // downloadDocument(file: any) {
  //   this.http.post(`${this.baseUrl}/download/${file.serverFileName}`, {}, {
  //     responseType: "blob",
  //     headers: new HttpHeaders().append("Content-Type", "application/json")
  //   })
  //   .pipe(
  //         catchError((err: HttpErrorResponse) => {
  //           return this.httpErrorHandler(err, {});
  //         })
  //       )
  //       .subscribe((res : any) => {
  //         var a = document.createElement("a");
  //         a.href = URL.createObjectURL(res);
  //         a.download = file.name;
  //         a.click();
  //       });
  // }
}
