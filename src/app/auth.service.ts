import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any

  constructor(private fireuth: AngularFireAuth,  private router: Router) { }

  getUserToken() {
    return this.fireuth.idToken.subscribe({
      next: (res: any) => {
        if (res != null) {
          return true
        }
        return false
      },
      error: (err: any) => {
        console.log(err, 'ERROR')
        return false
      }
    })
  }

  //login
  login(email: string, password: string) {
    this.fireuth.signInWithEmailAndPassword(email, password).then( () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['api']);
    }, err => {
        alert(err.message); 
        this.router.navigate(['']);
    } );
  }

  //log out
  logout() {
    this.fireuth.signOut().then( () => {
     localStorage.removeItem('token');
     this.router.navigate(['']);
    }, err => {
      alert(err.message);
    })
  }
}
