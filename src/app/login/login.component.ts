import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUrlsConstants } from '../constants';
import { AuthService } from '../service/auth.service';
import { LocalStorage } from '../service/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  tab=1;
  storage = new LocalStorage();

  constructor(private fb: FormBuilder,    private readonly authService: AuthService,
    private readonly router: Router
) { 
  }

  changeLogin(tab){
    this.tab = tab;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignIn() {
    console.log(this.form.value)
    this.authService
      .login(this.form.value)
      .then(() => {
        this.storage.add("user",this.form.value)
        this.router.navigate([AppUrlsConstants.TASKS])
      })
      .catch((e) => alert(e.message));
  }
  onSignUp() {
    console.log(this.form.value)
    this.authService
      .register(this.form.value)
      .then(() => this.router.navigate([AppUrlsConstants.TASKS]))
      .catch((e) => alert(e.message));
  }

}
