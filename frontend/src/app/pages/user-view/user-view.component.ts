import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private loginService:LoginService, private notify: NotificationService) { }
id:any;
  user:any
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)

    this.loginService.getUserById(this.id).subscribe(
      (data:any) =>{
        this.user=data;
        console.log(this.user)
      },
      (error:any) => {
        console.log(error)
        this.notify.showError(error.statusText)

      }
    )
  }

}
