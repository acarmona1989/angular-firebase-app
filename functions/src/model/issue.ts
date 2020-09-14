import { injectable } from 'inversify';

interface IIssue {
    _id?: string,
    description: string,
    title: string
}

@injectable()
export class Issue implements IIssue{
    constructor(
        public description: string,
        public title: string,
        public _id?: string
    ){}
}