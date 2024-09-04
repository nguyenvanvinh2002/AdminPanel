import { Component, OnInit } from '@angular/core';
import { AppService } from '../../servive/app.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
lstproducts:any=[]
categories:any=[]
name:string=''
isLogin:any
p:number=1
giaSp:any
mota:any
id:any
giamGia:any
tenSp:any

loadding:any
URL:string ='https://localhost:7025/img/'
constructor (private app:AppService){}
EditProductsF:FormGroup = new FormGroup({
  tenSp:new FormControl(''),
  giaSp:new FormControl(''),
  mota:new FormControl(''),
  giamGia:new FormControl('')
 
})
ngOnInit(): void {
  this.loadding =true
  forkJoin({
    lstproducts:this.app.getproducts(this.name),
    categories:this.app.categories()
  }).subscribe(res=>{
  
    this.categories = res.categories,
    setTimeout(() => {
      this.lstproducts = res.lstproducts,
      this.loadding = false;
      
    }, 1000);
  })
this.isLogin = this.app.CheckLogin()

}

remove(id:any){
   this.id = id
}
editproducts(lst:any,id:any){
  this.id = id
  this.EditProductsF.patchValue({
    tenSp:lst.tenSp,
    giaSp:lst.giaSp,
    mota:lst.mota,
    giamGia:lst.giamGia,
    
  })
}
dele(){
  this.app.deleproducts(this.id).subscribe(res=>{
    Swal.fire({
      title:"Thành công",
       text: "Xóa thành công",
        icon: "success"
    });
    this.app.getproducts(this.name).subscribe(res=>{
      this.lstproducts = res
     })
  })
}
onDanhMucChange(event:any){
  
  const filter = event.target.value;
  this.app.getproducts(filter).subscribe(res=>{
  this.loadding = true
  setTimeout(() => {
    this.lstproducts = res
    this.loadding = false
  }, 1000);
  })

}
allproducts(){
  this.app.getproducts(this.name).subscribe(res=>{
    this.lstproducts= res
  });
}
SaveEdit(){
  this.app.Editproducts(this.id, this.EditProductsF.value).subscribe(res=>{
    Swal.fire({
      title:"Thành công",
       text: "Cập nhật thành công",
        icon: "success"
    });

  })
}
}
