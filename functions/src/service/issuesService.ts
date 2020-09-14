import { injectable } from 'inversify';
import * as admin from 'firebase-admin';

@injectable()
export class IssueService {

    public async getIssues() {
        const querySnapshot = await admin.firestore().collection('issues').get();
        const issues: any[] = [];
        querySnapshot.forEach(doc => {
            issues.push({ id: doc.id, data: doc.data() });
        })
        return issues;
    }

    public async getIssuesByUser(userId: string | any) {
        const querySnapshot = await admin.firestore().collection('issues')
            .where('userId', '==', userId).get();
        const issues: any[] = [];
        querySnapshot.forEach(doc => {
            issues.push({ id: doc.id, data: doc.data() });
        })
        return issues;
    }

    public async newIssue(data: any) {
        console.log(data);

        return await admin.firestore().collection('issues').add({
            title: data.title,
            description: data.description,
            dateCreated: admin.firestore.Timestamp.now(),
            userId: data.userId
        })
    }
}