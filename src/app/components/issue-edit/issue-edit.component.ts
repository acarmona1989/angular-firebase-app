import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  issueForm: FormGroup;
  id: string;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issuesService: IssuesService) { }

  ngOnInit(): void {
    this.issueForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null)
    });
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
      });

    if (this.editMode) {
      this.fillForm();
    }
  }

  fillForm() {
    this.id = this.route.snapshot.params['id']
    this.issuesService.getIssue(this.id)
      .subscribe((issue) => {
        this.id = issue.id;
        this.issueForm.setValue({
          'title': issue.title,
          'description': issue.description
        });
      });
  }

  onSubmit() {
    if (this.editMode) {
      this.issuesService.update(
        this.id,
        this.issueForm.get('title').value,
        this.issueForm.get('description').value);
    } else {
      this.issuesService.add(
        this.issueForm.get('title').value,
        this.issueForm.get('description').value);
    }
    this.router.navigate(['issues']);
  }
}
