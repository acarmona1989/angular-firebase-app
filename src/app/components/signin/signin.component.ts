import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;
  @Input('email') username;
  @Input('userPassword') password;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignin(email: string, password: string) {
    this.isLoading = true;
    this.authService.signIn(email, password)
      .subscribe(resData => {
        this.isLoading = false;
        if (resData.user.emailVerified) {
          this.authService.setUserData(resData.user);
          this.authService.setToken(resData.user);
          this.authService.storeUserData(resData.user);
          this.router.navigate(['issues']);
        } else {
          this.error = "Not verified account!";
        }
      },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage;
        });
  }
}
