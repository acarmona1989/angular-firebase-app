import { Injectable } from '@angular/core';
import { Issue } from './issue.model';
import { Observable, of, Subject, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  issues: Issue[];

  constructor(private afAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private authService: AuthService) {

  }

  getIssues(): Observable<Issue[]> {
    return of(this.issues);
  }

  fetchIssuesByUser(): Observable<Issue[]> {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) throwError("Not define user");

    return this.httpClient
      .get(environment.apiUrl + '/issue', {
        params: {
          userid: user.id
        }
      })
      .pipe(map(responseData => {
        const issuesArray: Issue[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            issuesArray.push({ ...responseData[key].data });
          }
        }
        return issuesArray;
      }),
        catchError(errorRes => {
          return this.errorHandler(errorRes);
        }));
  }

  getIssue(id: string) {
    return of(this.issues.find((i) => i.id == id));
  }

  add(title: string, description: string): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) throwError("Not define user");
    
    const postData = {
      title: title,
      description: description,
      userId: user.id
    };
    this.httpClient.post(
      environment.apiUrl + '/issue',
      postData,
    ).subscribe();
  }

  update(id: string, title: string, description: string): void {
    // let issue = this.issues.find(i => i.id === id);
    // issue.title = title;
    // issue.description = description;
  }

  delete(id: string) {
    // const issue = this.issues.find(i => i.id === id);

    // const index = this.issues.indexOf(issue);
    // this.issues.splice(index);
  }

  errorHandler(errorRes) {
    const errorMessage = 'Unknown error ocurred!';
    return throwError(errorMessage);
  }
}
