import { Component, OnInit } from '@angular/core';
import { AppService } from '../../servive/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrl: './oders.component.css'
})
export class OdersComponent implements OnInit {
  oders: any = []
  p: number = 1
  id: any
  userName: any
  isLogin: any
  lstoder: any
  tenSp: any
  loadding: any
  editstatus: any
  trangthaiF: FormGroup = new FormGroup({
    status: new FormControl('', Validators.required)
  })
  constructor(private app: AppService) { }
  ngOnInit(): void {
    this.loadding = true
    this.app.getoder().subscribe(res => {
      setTimeout(() => {
        this.oders = res;
        this.loadding = false;
      }, 1000);

    })

    this.isLogin = this.app.CheckLogin()

  }

  trangthai(event: any) {
    this.loadding = true
    const trangthai = event.target.value
    this.app.getstatus(trangthai).subscribe(res => {
   setTimeout(() => {
    this.oders = res
    this.loadding = false
   }, 1000);
    })
  }
  editoder(id: any, userName: any, tenSp: any, status: any) {
    this.id = id
    this.userName = userName
    this.tenSp = tenSp
    this.editstatus = status
  }
  saveeditoder() {
   
      if (this.editstatus == 0) {
        Swal.fire({
          title: "Thất bại",
          text: "Đơn hàng đã giao thành công",
          icon: "error"
        });
      }  
     else{
      this.app.edittrangthaioder(this.id, this.trangthaiF.value, this.editstatus).subscribe(res => {
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thành công",
          icon: "success"
        });
        this.app.getoder().subscribe(res => {
          this.oders = res
        });
        this.app.notifycation({
        idSp: this.id,
        userName: this.userName,
        tenSp: this.oders.tenSp,
        title: `Đơn hàng ${this.tenSp} đã thay đổi trạng thái`,
        size: this.oders.size,
      }).subscribe(res => {
      });
      })
     }

 






  
    

    

  }

}
