import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user:any;
  constructor(private loginServices:LoginService, private notify : NotificationService) { }

  ngOnInit(): void {

    this.isLoggedIn= this.loginServices.isLoggedIn();
    this.user = this.loginServices.getUser();
    this.loginServices.loginSbuject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginServices.isLoggedIn();
      this.user = this.loginServices.getUser();
    })
  }


  public logOut() {
    this.notify.showInfo("Log Out")
    this.loginServices.logOut();

    window.location.reload()
  }

}
