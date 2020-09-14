import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private db: AngularFirestore) { }

    getUserByEmail(email: string) : Observable<any> {
        return this.db.collection('users', ref => ref.where('email', '==', email)).get();
    }
}