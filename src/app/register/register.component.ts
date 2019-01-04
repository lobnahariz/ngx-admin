import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication-service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  inscription: string = "";
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

  isVide(value: any, valeur: any) {
    if (value === "") {
      this.message = valeur + " est vide";
    }
  }

  isMail(value:string){
    if(value.indexOf("@") === -1){
      this.message = "Verifier votre email !";
    }

  }
  register(user) {


    this.submitted = true;
    this.message = "";
    this.inscription = "";
this.isVide(user.email,"Email");
this.isVide(user.username,"UserName");
    this.isVide(user.password,"Password");
    this.isVide(user.repassword,"Repassword");
    this.isMail(user.email);
if(this.message === "") {
  if (user.password === user.repassword) {
    this.appService.getUtilisateurByMail(user.email, user.username)
      .subscribe(
        data => {
          if (data === 1) {
            this.message = "" + "Adresse mail ou Login existe déja!";
            return;
          } else {
            user.valid ="non";

            this.appService.register(user)
              .subscribe(
                xx => {
                  this.inscription= "Votre inscription est en cours de traitement :)";
                },
                error => {
                });
          }
        },
        error => {
        });
  } else {
    this.message = "Verifier votre mot de passe !"
  }
}


  }
}
