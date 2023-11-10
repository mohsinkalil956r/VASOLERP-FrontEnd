import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
// Ag Grid
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
// For file upload 
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { CreateNewPasswordComponent } from './components/create-new-password/create-new-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LenderModule } from './modules/lender/lender.module';
import { ProviderModule } from './modules/provider/provider.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './core/authentication.interceptor';
import { BtnCellRenderer } from './components/btn-cell-renderer/btn-cell-renderer.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { DashboardComponent } from './modules/systemUser/components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    VerifyEmailComponent,
    CreateNewPasswordComponent,
    ChangePasswordComponent,
    BtnCellRenderer,
    ImagePreviewComponent,
    DashboardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    LenderModule,
    ProviderModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
