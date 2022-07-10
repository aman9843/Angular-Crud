import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service'
import{FormGroup,FormControl,Validators} from "@angular/forms";
import {Router} from '@angular/router'
import {NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormSubmitted = false;
  isRegisterFailed= false;
  hide=true

  get f() {
    return this.registerForm.controls;
  }



  registerForm = new FormGroup({
    firstName:new FormControl('', [Validators.required]),
    lastName:new FormControl('', [Validators.required]),
    country:new FormControl('', [Validators.required]),
    state:new FormControl('', [Validators.required]),
    city:new FormControl('', [Validators.required]),
    zipCode:new FormControl('', [Validators.required, Validators.minLength(6)]),
    phoneNo:new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,3})$/)]),
    password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    cpassword: new FormControl('',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
  })



  constructor(private userService : UserService, private notifyService:NotificationService, private router:Router) { }



  selectedCountry: String = "--Choose Country--";
  states: Array<any> = [];
  cities: Array<any> = [];

  Countries: Array<any> = [
    { name: 'Germany', states: [ {name: 'Berlin', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']} ] },
    { name: 'Spain', states: [ {name: 'Spain', cities: ['Barcelona']} ] },
    { name: 'USA', states: [ {name: 'WashingTon', cities: ['Downers Grove']} ] },
    { name: 'Mexico', states: [ {name: 'Mexico', cities: ['Puebla']} ] },
    { name: 'India', states: [ {name: 'Gujarat', cities: ['Ahmedabad', 'Vapi', 'Gandhinagar', 'Anand']} ] },
  ];




  ngOnInit(): void {


  }


  changeCountry(country: any) {

 this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states;

  }


  changeState(state: any) {
   this.cities = this.Countries.find((cntry: any) => cntry.name == this.selectedCountry).states.find((stat: any) => stat.name == state.target.value).cities;
  }


  onSubmit() {

    this.registerFormSubmitted = true;

    if(this.registerForm.invalid) {
      this.notifyService.showWarning("Please Fill All The Field")
    }



    if(this.registerForm.value.password !== this.registerForm.value.cpassword) {
      this.notifyService.showError("Password Do Not Match")
    }

    if(this.registerForm.valid) {
      this.userService.addUser({
        firstName:this.registerForm.value.firstName,
        lastName:this.registerForm.value.lastName,
        email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        cpassword:this.registerForm.value.cpassword,
        country:this.registerForm.value.country,
        state:this.registerForm.value.state,
        city:this.registerForm.value.city,
        phoneNo:this.registerForm.value.phoneNo,
        zipCode:this.registerForm.value.zipCode
      }).subscribe(
        (data) => {
          this.notifyService.showSuccess("Successfully Regsitered")
          this.router.navigate(['/login'])
          console.log(data);

        },
        (error) => {

          this.notifyService.showError(error.statusText)
        }
      )

    }


  }

}
