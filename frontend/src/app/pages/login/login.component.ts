import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from 'src/app/services/login.service'
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
import {NotificationService} from "../../services/notification.service";
import * as $ from 'jquery';
// import magnificPopup from 'magnific-popup'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginFormSubmitted = false;
isLoginFailed= false;
progress : any;


hide = true;

  get f() {
    return this.loginForm.controls;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,3})$/)]),
    password: new FormControl('',[Validators.required])
  })
  constructor(private router:Router, private loginService:LoginService, private notify:NotificationService) { }



  ngOnInit(): void {

    // $(document).ready(function() {
    //   $('.video-gallery').magnificPopup({
    //   delegate: 'a', 
    //   type: 'iframe',
    //   gallery:{
    //     enabled:true
    //   }
    // });
    // });
  }


  onSubmit() {
    this.progress = 1;
    const aman = encodeURI('aman+prasad');
    console.log(aman);
    this.loginFormSubmitted = true;
    if(this.loginForm.invalid) {
      this.notify.showWarning("Invalid Details")
      this.progress=''
    }




    if(this.loginForm.valid) {
        this.loginService.loginUser({
            email:this.loginForm.value.email,
            password:this.loginForm.value.password
        }).subscribe((data:any) => {
          if(data.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / data.total) * data.loaded);
          } else if (data.type == HttpEventType.Response) {
            this.progress = null;
          }

      
          console.log(data);
        
          this.loginService.setUser(data);

          this.loginService.generateToken(data.token);
          this.notify.showSuccess("Login SuccessFull");

          if (this.loginService.getUserRole() === false) {
            this.router.navigate(['/user']);
            this.loginService.loginSbuject.next(true);
          } else if (this.loginService.getUserRole() === true) {
            this.router.navigate(['/admin']);
            this.loginService.loginSbuject.next(true);
          } else {
            this.loginService.logOut();
          }








        },
          (error) => {
            console.log(error.statusText)
            this.notify.showError(error.statusText)
          }
        )

    }


  }



}
