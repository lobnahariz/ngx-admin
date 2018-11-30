import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
message: string = "";
  constructor( private appService: AuthenticationService,
               private fb: FormBuilder,
               private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [''],
      username: [''],
      password: [''],
      repassword: [''],
    });

  }
  get f() { return this.registerForm.controls; }


  register(user) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("****************");
      console.log(user+"****************");

      return;
    }
console.log(user);
    this.appService.register(user)
      .subscribe(
        data => {
this.message= "Votre inscription est en cours de traitement :)"
        },
        error => {
        });
  }
}
