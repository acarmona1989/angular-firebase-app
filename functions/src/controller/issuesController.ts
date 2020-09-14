import {
    controller, httpGet, httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { IssueService } from '../service/issuesService';
import TYPES from '../constant/Types';


@controller('/issue')
export class IssueController {
    constructor(@inject(TYPES.IssueService) private issueService: IssueService) { }

    @httpGet('/')
    public getIssuesByUser(request: Request) {
        return this.issueService.getIssuesByUser(request.query.userid);
    }

    @httpPost('/')
    public newUser(request: Request) {
        return this.issueService.newIssue(request.body);
    }
}