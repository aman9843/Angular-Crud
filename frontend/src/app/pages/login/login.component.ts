
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from 'src/app/services/login.service'
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

import { Component,TemplateRef} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent  {


  videoItems = [
    {
      name: 'Quick Implementation',
      des:'Introductory Video',
      src: 'https://drive.google.com/uc?export=download&id=1TlrfK3GSCP2pSWCHs3q2b0KAwFqFQ_Yh',
      type: 'video/mp4',
      imgUrl: 'assets/images/videos/Implement.png'
    },
    {
      name: 'Add Device',
      des:'How to Add Device',
      src: 'https://drive.google.com/uc?export=download&id=1l7EMqunzCrlKmR8BmOc7t9f-4DBW0K58',
      type: 'video/mp4',
      imgUrl: 'assets/images/videos/AddDevice.png'
    },
    {
      name: 'Add User',
      des:'How to Add User',
      src: 'https://drive.google.com/uc?export=download&id=1t_6brm5O0BkGp9GZsKHcAh3IX2kuouMM',
      type: 'video/mp4',
      imgUrl: 'assets/images/videos/AddUser.png'
    },
    {
      name: 'Attendance',
      des:'Attendance Operations for Biot Admin',
      src:'https://drive.google.com/uc?export=download&id=1Mg4sW0s0vFcEzMjSvp9sRjtefxqXg2aD',
      type:'video/mp4',
      imgUrl: 'assets/images/videos/Attendance.png'
    }
  ];



  constructor(public dialog: MatDialog) {

  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }



}

  onSubmit() {
    this.loginFormSubmitted = true;
    if(this.loginForm.invalid) {
      this.notify.showWarning("Invalid Details")
    }




    if(this.loginForm.valid) {
        this.loginService.loginUser({
            email:this.loginForm.value.email,
            password:this.loginForm.value.password
        }).subscribe((data:any) => {

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


  play() {
    
  }
}
