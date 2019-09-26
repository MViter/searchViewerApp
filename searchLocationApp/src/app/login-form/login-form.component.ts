import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../localstorage.service';
import AppConstants from '../app.constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  titleText: string = 'Login';
  loginBtnText: string = 'Login';
  cancelBtnText: string = 'Cancel';
  loginPlaceholderText: string = 'put login...';
  passwordPlaceholderText: string = 'put password...';
  loginForm: FormGroup;
  password: string = '';
  login: '';
  
  constructor(public router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onKeyDown($event) {
    console.log(`Hi from onKeyDown(), event = ${$event}`);
  }

  onSubmit () {
    this.router.navigate(['search-input']);
  }

  onCancel () {
    this.router.navigate(['login']);
  }

  private initForm () {
    this.loginForm = new FormGroup({
      'login': new FormControl(this.login, Validators.required),
      'password': new FormControl(this.password, Validators.required)
    })
  }

}
