import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { UsersService } from '../../services/users.service';

@Injectable({
    providedIn: 'root'
})
export class EmailTakenValidator {
    constructor(private userService: UsersService){}

    isEmailTakenAsync(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            this.userService.getUserByEmail(control.value)
              .subscribe((users) => {
                if (users.docs.length > 0) {
                  resolve({ 'emailTaken': true })
                }
                resolve(null);
              });
          });
          return promise;
    }
}