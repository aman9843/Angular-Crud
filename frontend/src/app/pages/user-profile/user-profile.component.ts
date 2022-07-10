import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {

    this.user = this.loginService.getUser();
    console.log(this.user)

  }

}
