import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { EmailTakenValidator } from "./EmailTakenValidator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private emailTakenValidator: EmailTakenValidator) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'userEmail': new FormControl(null, [Validators.required, Validators.email],
        this.emailTakenValidator.isEmailTakenAsync.bind(this.emailTakenValidator)),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.isLoading = true;
    const username = this.userForm.get('username').value;
    const email = this.userForm.get('userEmail').value;
    const password = this.userForm.get('password').value;
    this.authService.signUp(email, password)
      .subscribe(result => {
        this.authService.sendVerificationMail();
        this.authService.setUserData(result.user);
        this.authService.updateProfile(result.user, username);
        this.authService.afAuth.signOut();
      },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        });
  }
}
