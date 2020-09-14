import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Issue } from '../../services/issue.model';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit {
  @Input() issue: Issue;

  constructor(private router: Router,
    private issuesService: IssuesService) { }

  ngOnInit(): void {
  }

  getDescription() {
    let description: string = this.issue.description;
    if (description.length > 240) {
      description = description.substring(0, 240) + '...';
    }
    return description;
  }

  onDelete(){
    // this.issuesService.delete(this.issue.id);
    // this.router.navigate(['issues']);
  }
}
