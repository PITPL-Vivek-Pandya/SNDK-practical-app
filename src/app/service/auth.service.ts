import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}


  login({ email, password }: Login) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: Login) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}