import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase/app';

@Pipe({
    name: 'timeToStamp'
})
export class TimeStampToDate implements PipeTransform {

    transform(value: any, limit: number, ...args: unknown[]): unknown {
    
        const fireBaseTimeStamp: firestore.Timestamp = new firestore.Timestamp(value._seconds, value._nanoseconds);
        return fireBaseTimeStamp.toDate()
    }
}