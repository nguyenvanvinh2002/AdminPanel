import { Component, OnInit } from '@angular/core';
import { AppService } from '../../servive/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  keyword: string = '';
  name:string =''
  soluong:any
  odrescount:any 
  productscount:any
  sumoders:any
  comment:any
  oderchuagiao:any
  oderdagiao:any
  oderhuy:any
  isLogin:any
  sum:number=0
  constructor(private app:AppService){}
  ngOnInit(): void {
    
    this.isLogin = this.app.CheckLogin()
   this.app.getuser(this.keyword).subscribe(res=>{
    this.soluong = res
   })
   this.app.getoder().subscribe(res=>{
    this.odrescount = res;
  this.oderchuagiao = this.odrescount.lst.filter((item:any)=> item.status === 1);
  this.oderdagiao = this.odrescount.lst.filter((item:any)=> item.status === 0);
  this.oderhuy = this.odrescount.lst.filter((item:any)=> item.status === -2);
  this.sumoders = this.odrescount.lst.filter((item:any)=>item.status === 0 )

  this.sumoders.forEach((oder:any) => {
    this.sum += oder.giaSp * oder.soLuong;
});

   })
   
   this.app.getproducts(this.name).subscribe(res=>{
    this.productscount = res
   })
   this.app.getcomment().subscribe(res=>{
    this.comment = res
   })
   
  }
  Logout(){
    sessionStorage.clear()
  
  }
}
