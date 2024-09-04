import { Component, OnInit } from '@angular/core';
import { AppService } from '../../servive/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { jwtInterceptor } from '../../servive/jwt.interceptor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit  {
  keyword: string = '';
  user: any
  name: any = []
  userName: any
  p: number = 1
  isLogin: any
  loadding: any
  statusControl = new FormControl('1')
  rolesControl = new FormControl('User')
  EditF: FormGroup = new FormGroup({
    status: this.statusControl,
    roles: this.rolesControl
  })
  constructor(private app: AppService) { }

  ngOnInit(): void {
   
    this.loadding = true
    
    this.loadUser();
    this.isLogin = this.app.CheckLogin()
  }

  loadUser() {
   
    this.app.getuser(this.keyword).subscribe(res => {
      setTimeout(() => {
        this.user = res
        this.loadding = false
      }, 1000);

    })
  }
  EditUser(userName: string) {
    this.userName = userName
  }
  deleUser(userName: string) {
    this.userName = userName
  }
  Edit() {
    this.app.edituser(this.userName,
      {
        status: this.statusControl.value,
        roles: this.rolesControl.value,
      }).subscribe(res => {
        Swal.fire({
          title: "Thành công",
          text: "Thay đổi thành công",
          icon: "success"
        });
        this.app.getuser(this.keyword).subscribe(res => {
          this.user = res
        })
      })
  }
  search(event: any): void {
    this.loadding = true
    this.name = event.target.value
    this.keyword = this.name;
    this.loadUser();
  }

  dele() {
    this.app.removeUser(this.userName).subscribe(res => {
      Swal.fire({
        title: "Thành công",
        text: "Xóa thành công",
        icon: "success"
      });
      this.app.getuser(this.keyword).subscribe(res => {
        this.user = res
      })
    })
  }

}
