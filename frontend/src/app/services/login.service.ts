import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginSbuject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //login user Details

  public loginUser(user:any) {
    return this.http.post(`${baseUrl}/api/login`,user)
  }

  //getCurrentUser
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/api/users`)
  }

  //generate token
  public generateToken(token:any) {
    localStorage.setItem('token', token)
    return true;
  }
  // logged in
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token')
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

// log out to remove data
  public logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;

  }
  // get token

  public getToken() {
    return localStorage.getItem('token');
  }


  // set User

  public setUser(user:any) {
    localStorage.setItem("user",JSON.stringify(user))
  }



// get User
  public getUser() {
    let userStr= localStorage.getItem('user');
    if(userStr != null) {

      return JSON.parse(userStr);

    } else {
      this.logOut();
      return null;
    }
  }


  /// get role
  public getUserRole()
  {
    let user = this.getUser();
    return user.isAdmin;
  }

  public getAllUsers()
  {
    return this.http.get(`${baseUrl}/api`)
  }

  public deleteUsers(id:any) {
    return this.http.delete(`${baseUrl}/api/user/${id}`)
  }

  public getUserById(id:any) {
    return this.http.get(`${baseUrl}/api/user/${id}`)
  }
}
