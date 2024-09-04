import { Component, OnInit } from '@angular/core';
import { AppService } from './servive/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Adminpanel';
  isLogin:any

  constructor (private app:AppService){}
  ngOnInit(): void {
    this.isLogin = this.app.CheckLogin()
  }
  Logout(){
    sessionStorage.clear()
  }
  alert(){
    Swal.fire({
      title:":(",
      text:"Chưa có chức năng này",
      icon:"error"
    })
  }
}
