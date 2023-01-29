import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Added successfully', 'Voted', { easing: 'ease-in', easeTime: 1000 }
    )
  }

  showError() {
    this.toastr.error('Please add new users', 'All users already  voted')
  }

  showInfo() {
    this.toastr.info('Added successfully', 'Person', { easing: 'ease-in', easeTime: 1000 })
  }

}
