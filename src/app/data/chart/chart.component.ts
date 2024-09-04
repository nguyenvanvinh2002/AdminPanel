import { Component, OnInit } from '@angular/core';
import { Chart ,registerables } from 'chart.js';
import { AppService } from '../../servive/app.service';

Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  name:string=''
  chartdata:any=[]
  labeldata:any=[]
  realdata:any=[]
  colordata:any=[]
  constructor(private app:AppService){}
  ngOnInit(): void {
    this.app.getproducts(this.name).subscribe(res=>{
    this.chartdata = res
    if(this.chartdata != null){
      this.chartdata.map((o:any)=>{
        this.labeldata.push(o.giaSp)
        this.realdata.push(o.giaSp)
        this.colordata.push(o.colorcode)
      })
      this.showdata(this.labeldata,this.realdata,this.colordata)
    }
    })
  }
  showdata(labeldata:any,valuedata:any,colordata:any){
    const mychar = new Chart('barchar',{
      type:'bar',
      data:{
        labels:labeldata,
        datasets:[
          {
            data:valuedata,
            backgroundColor:colordata=['red', 'blue','green','pink']
          }
        ]
      }
    })
  }
}
