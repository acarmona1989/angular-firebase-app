import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueItemComponent } from './components/issue-item/issue-item.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownDirective } from './components/shared/dropdown.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsersComponent } from './components/users/users.component';
import { SignInComponent } from './components/signin/signin.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IssueEditComponent } from './components/issue-edit/issue-edit.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ShortenDescriptionPipe } from './components/issue-item/shorten-description.pipe';
import { TimeStampToDate } from './components/issue-item/timestampToDate.pipe';
import { AuthInterceptorService } from './services/shared/auth-interceptor.service';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IssueListComponent,
    IssueItemComponent,
    IssueDetailComponent,
    DropdownDirective,
    PageNotFoundComponent,
    UsersComponent,
    SignInComponent,
    VerifyEmailComponent,
    SignUpComponent,
    IssueEditComponent,
    ForgotPasswordComponent,
    ShortenDescriptionPipe,
    TimeStampToDate,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
