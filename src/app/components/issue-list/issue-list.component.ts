import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssuesService } from "../../services/issues.service";
import { Issue } from '../../services/issue.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit, OnDestroy {
  selectedIssue: Issue;
  issues: Issue[] = [];
  issuesListSub: Subscription;
  isFetching: boolean;
  error: string = null;

  constructor(private issuesService: IssuesService) { }

  ngOnDestroy(): void {
    this.issuesListSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.issuesListSub = this.issuesService.fetchIssuesByUser()
      .subscribe(
        issues => {
          this.isFetching = false;
          this.issues = issues;
        },
        errorMessage => {
          this.isFetching = false;
          this.error = errorMessage;
        });
  }
}
