import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AdminProfileComponent} from "./pages/admin-profile/admin-profile.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {AdminGuard} from "./services/admin.guard";
import {UserGuard} from "./services/user.guard";
import {UserViewComponent} from "./pages/user-view/user-view.component";

const routes: Routes = [


  {
    path:"login",
    component:LoginComponent,
    pathMatch:'full'

  },
  {
    path:'',
    component:RegisterComponent,
    pathMatch:'full'

  },
  {
  path:'admin',
    component:AdminProfileComponent,
    canActivate:[AdminGuard],



  },

  {
    path:'profile/:id',
    component:UserViewComponent,
    pathMatch:'full'

  },
  {
    path:'user',
    component:UserProfileComponent,
    canActivate:[UserGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
