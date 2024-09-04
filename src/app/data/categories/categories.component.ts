import { Component, OnInit } from '@angular/core';
import { AppService } from '../../servive/app.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  isLogin: any
  categories: any
  loadding: any
  id: any
  AddCateF: FormGroup
  selectedFile: File | null = null;
  URL = "https://localhost:7025/img/"
  constructor(private app: AppService, private fb: FormBuilder) {
    this.AddCateF = this.fb.group({
      danhMuc: ['']
    })
  }
  ngOnInit(): void {
    this.loadding = true
    this.app.categories().subscribe(res => {
      setTimeout(() => {
        this.categories = res
        this.loadding = false
      }, 1000);
    })
    this.isLogin = this.app.CheckLogin()
  }
  Addcategories() {
    if (this.AddCateF.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('danhMuc', this.AddCateF.get('danhMuc')?.value)
      formData.append('formFile', this.selectedFile);
      this.app.addcategories(formData).subscribe(res => {
        Swal.fire({
          title: "Thành công",
          text: "Thêm danh mục thành công",
          icon: "success"
        });
        this.AddCateF.reset()
        this.app.categories().subscribe(res => {
          this.categories = res
        })
      });

    }
  }
  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  openRemoveCategories(id: any) {
    this.id = id
  }
  RemoveCategories() {
    this.app.removeCategories(this.id).subscribe(res => {
      Swal.fire({
        title: "Thành công",
        text: "Xóa danh mục thành công",
        icon: "success"
      });
      this.app.categories().subscribe(res => {
        this.categories = res
      })
    })

  }
}
