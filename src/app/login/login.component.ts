import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication-service";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
mode:number = 0;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private appService: AuthenticationService, private router: Router) { }

  ngOnInit() {

   /* this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });*/


  }

  onLogin(user) {
    this.appService.login(user).subscribe(resp => {
  const jwtToken = resp.headers.get('Authorization');
this.appService.saveToken(jwtToken);
this.router.navigateByUrl("/pages")
    },
err => {
this.mode=1;
}
    )
  }
}
