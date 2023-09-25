import { Injectable } from '@angular/core';
import { UserCredential, getAuth } from '@angular/fire/auth'; 
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = false

  constructor(private fireuth: AngularFireAuth,  private router: Router) { }

  isAuthenticated(): boolean {
    const auth = getAuth()
    return auth.currentUser !== null
  }

  //login
  login(email: string, password: string) {
    this.fireuth.signInWithEmailAndPassword(email, password).then( () => {
        this.token = true
        this.router.navigate(['api']);
    }, err => {
        alert(err.message); 
        this.router.navigate(['']);
    } );
  }

  //log out
  logout() {
    this.fireuth.signOut().then( () => {
    this.token = false
     this.router.navigate(['']);
    }, err => {
      alert(err.message);
    })
  }
}
