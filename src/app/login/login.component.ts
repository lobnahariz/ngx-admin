import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication-service";
import {Alerter} from "../service/alerter.service";
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
mode: number = 0;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private alertService: Alerter,
              private fb: FormBuilder,
              private appService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });


  }
  get f() { return this.loginForm.controls; }
  onLogin(user) {
  /*  this.appService.login(user).subscribe(resp => {
  const jwtToken = resp.headers.get('Authorization');
this.appService.saveToken(jwtToken);
this.router.navigateByUrl("/pages")
    },
err => {
this.mode=1;
}
    )*/


    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.appService.login(user)
      .subscribe(
        data => {
        //  this.router.navigate([this.returnUrl]);
          const jwtToken = data.headers.get('Authorization');
          this.appService.saveToken(jwtToken);
          this.router.navigateByUrl("/pages")
        },
        error => {
          console.log("heeeeeeeeeere");
          this.mode=1;
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
