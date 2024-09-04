import { Component, OnInit } from '@angular/core';
import { AppService } from '../../servive/app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit {
  categories:any=[];
  isLogin:any
  AddProductsF:FormGroup;
  selectedFile:File | null = null;
  constructor(private app:AppService,private fb : FormBuilder){
    this.AddProductsF= this.fb.group({
      tenSp:[''],
      giaSp:[''],
      mota:[''],
      danhMuc:[''],
      giamGia:['1'],

    })
  }
  ngOnInit(): void {
    this.app.categories().subscribe(res=>{
      this.categories = res
    })
    this.isLogin = this.app.CheckLogin()
  }
  onFileSelect(event:any):void{
    this.selectedFile = event.target.files[0];
  }
  onAddPro(){
    if(this.AddProductsF.valid && this.selectedFile){
      const formData = new FormData();
      formData.append('tenSp',this.AddProductsF.get('tenSp')?.value)
      formData.append('giaSp',this.AddProductsF.get('giaSp')?.value)
      formData.append('mota',this.AddProductsF.get('mota')?.value)
      formData.append('danhMuc',this.AddProductsF.get('danhMuc')?.value)
      formData.append('giamGia',this.AddProductsF.get('giamGia')?.value)

      formData.append('formFile', this.selectedFile);
      this.app.addproducts(formData).subscribe(res => {
       Swal.fire({
        title:"Thành công",
        text:"Thêm sản phẩm thành công",
        icon:"success"
       })
      this.AddProductsF.reset()
      });
      
    }
    
  }
}
