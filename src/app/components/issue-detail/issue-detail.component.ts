import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Issue } from '../../services/issue.model';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  @Input() issue: Issue;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private issuesService: IssuesService) { }

  ngOnInit(): void {
    console.log(+this.route.snapshot.params['id']);
    this.issuesService.getIssue(this.route.snapshot.params['id'])
      .subscribe((issue) => {
        this.issue = issue;
      });
  }

  onDelete(){
    this.issuesService.delete(this.issue.id);
    this.router.navigate(['issues']);
  }
}
