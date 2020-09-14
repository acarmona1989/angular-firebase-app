import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Router } from "@angular/router";
import { throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from "./shared/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User; // Save logged in user data
  private token: string

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;


      } else {
        localStorage.setItem('access_token', null);
        localStorage.setItem('user', null);
      }
    });
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    console.log(email);
    
    return from(this.afAuth.createUserWithEmailAndPassword(email, password))
      .pipe(
        catchError(errorRes => {
          return this.errorHandler(errorRes.code);
        })
      );
  }

  updateProfile(user, nickname: string) {
    user.updateProfile({
      displayName: nickname
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        catchError(errorRes => {
          return this.errorHandler(errorRes.code);
        })
      )
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        return this.errorHandler(error.code);
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));
    return (authToken !== null && user !== null && user.emailVerified !== false) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      this.router.navigate(['sign-in']);
    })
  }

  getToken() {
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    if (!accessToken.expirationTime || accessToken.expirationTime < new Date()) {
      return null;
    } else {
      return accessToken.token;
    }
  }

  setToken(user) {
    user.getIdTokenResult().then((tokenResult: firebase.auth.IdTokenResult) => {
      let accesstoken = {
        token: tokenResult.token,
        expirationTime: tokenResult.expirationTime
      }

      localStorage.setItem('access_token', JSON.stringify(accesstoken));
    });
  }

  //https://firebase.google.com/docs/reference/js/firebase.auth.Auth#error-codes_1
  errorHandler(errorRes) {
    console.log(errorRes);
    
    let errorMessage = 'An unknown error ocurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.code) {
      case 'auth/user-not-found':
        errorMessage = 'User not found!';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Wrong password!';
        break;
      case 'auth/user-disabled':
        errorMessage = 'User disabled!';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email!';
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }

  storeUserData(user) {
    const userData = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      id: user.uid
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }
}
