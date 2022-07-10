import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toaster:ToastrService) { }


  showSuccess(message:any){
    this.toaster.success(message)
  }

  showError(message:any){
    this.toaster.error(message)
  }

  showInfo(message:any){
    this.toaster.info(message)
  }

  showWarning(message:any){
    this.toaster.warning(message)
  }
}
