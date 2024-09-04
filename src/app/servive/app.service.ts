import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtInterceptor } from './jwt.interceptor';
import { Observable } from 'rxjs';
const APIURL = 'https://localhost:7025/api/v1'
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private header = new HttpHeaders();
 
  constructor(private http:HttpClient) {
    // this.header = this.header.set('Content-Type', 'application/json');
   
  }
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    let headers = this.header;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getuser(q: string){

    return this.http.get(`${APIURL}/Users?q=${q}`, { headers: this.getAuthHeaders()})
  }
  getproducts(name:any){
    return this.http.get(`${APIURL}/Products?name=${name}`, { headers: this.getAuthHeaders()})
  }

  getoder(){
    return this.http.get(`${APIURL}/Oders`, { headers: this.getAuthHeaders()})
  }
  getcomment(){
    return this.http.get(`${APIURL}/DanhGia`, { headers: this.getAuthHeaders()})
  }
  edituser(UserName:any,user:any){
    return this.http.put(`${APIURL}/Users/Edit/${UserName}`,user, { headers: this.getAuthHeaders()})
  }
  categories(){
    return this.http.get(`${APIURL}/Categories`, { headers: this.getAuthHeaders()})
  }
  addproducts(body:any){
    return this.http.post(`${APIURL}/Products`,body,{ headers: this.getAuthHeaders()})
  }
  addcategories(body:any){
    return this.http.post(`${APIURL}/Categories`,body, { headers: this.getAuthHeaders()})
  }
  deleproducts(Id:any){
    return this.http.delete(`${APIURL}/Products/${Id}`, { headers: this.getAuthHeaders()})
  }
  getstatus(Status:any){
    return this.http.get(`${APIURL}/Oders/Oders/${Status}`, { headers: this.getAuthHeaders()})
  }
  edittrangthaioder(id:any,body:any,status:any){
     const options = {
      headers: this.getAuthHeaders(),
      params: { status: status } 
    };
    return this.http.put(`${APIURL}/Oders/${id}`,body,options)
  }
  Login(body:any){
    return this.http.post(`${APIURL}/Login`,body, { headers: this.getAuthHeaders()})
  }
  CheckLogin() :any{
    let jsondata = sessionStorage.getItem('Login')
    if(jsondata){
      return JSON.parse(jsondata)
    }
    return false;
  }
  Editproducts(Id:any,body:any){
    return this.http.post(`${APIURL}/Products/update-products?Id=${Id}`,body, { headers: this.getAuthHeaders()})
  }

  removeUser(userName:any){
    return this.http.delete(`${APIURL}/Users/${userName}`, { headers: this.getAuthHeaders()})
  }
  notifycation(content:any){
    return this.http.post(`${APIURL}/Thongbao`,content, { headers: this.getAuthHeaders()})
  }
  removeCategories(Id:any){
    return this.http.delete(`${APIURL}/Categories/${Id}`, { headers: this.getAuthHeaders()})
  }
}
