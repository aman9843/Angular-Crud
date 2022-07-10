import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {NotificationService} from "../../services/notification.service";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
allUsers:any
  firstName:any
  p:number = 1;

  constructor(private loginService:LoginService, private notify:NotificationService) { }

  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe(
      (data:any) => {
        this.allUsers = data;
        console.log(this.allUsers.user)


      },
      (error:any) => {
        console.log(error);
        this.notify.showError(error.statusText)

      }
    )
  }

  search() {
  if(this.firstName == ''){
    this.ngOnInit()
  } else {
    this.allUsers.user = this.allUsers.user.filter((res:any) => {
      return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase())
      console.log(res.firstName)
    })
  }
  }

key : string ='id';
  reverse : boolean = false;

  sort(key:any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  deleteUser(uid:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        this.loginService.deleteUsers(uid).subscribe(
          (data:any) => {
            this.allUsers.user = this.allUsers.user.filter((users:any)=> users.id != uid)
            console.log(data,"Deleted")
            Swal.fire('Success','User Deleted','success')
          },
          (error)=>{
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong',
            });

          }
        )

      }

    })




  }
}
