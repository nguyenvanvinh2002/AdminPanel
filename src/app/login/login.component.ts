import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../servive/app.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  LoginF:FormGroup= new FormGroup({
    userName:new FormControl('',Validators.required),
    passWord:new FormControl('',Validators.required)
  })
  isLogin:any
  constructor(private app:AppService){}
  ngOnInit(): void {
   this.isLogin = this.app.CheckLogin()
  }
  Login(){
    this.app.Login(this.LoginF.value).subscribe((res:any) => { 
      if(res.code === 400){
        Swal.fire({
          title:"Cảnh báo",
           text: "Sai tên đăng nhập hoặc mật khẩu",
            icon: "error"
        });
      }
      if(res.code == 200 && res.roles ==="Admin"){
        let jsondata = JSON.stringify(res);
        sessionStorage.setItem('Login',jsondata);
       sessionStorage.setItem('token', res.token);
        location.assign("http://localhost:4200/Home");
        this.LoginF.reset()
        
      }
      if(res.code == 200 && res.roles ==="User"){
        Swal.fire({
          title:"Cảnh báo",
           text: "Tài khoản không được phép truy cập",
            icon: "error"
        });
      }
    });
  }
}
