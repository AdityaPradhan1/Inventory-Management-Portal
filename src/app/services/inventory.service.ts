import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  getEmployees() {
    return this.http.get(this.url + 'employees');
  }
  getEmployeeDetails(id: any) {
    return this.http.get(this.url + 'employees/' + id);
  }
  getDevices() {
    return this.http.get(this.url + 'devices');
  }
  getDeviceDetails(id: any) {
    return this.http.get(this.url + 'devices/' + id);
  }
  postEmployees(data: any) {
    return this.http.post(this.url + 'employees', data);
  }
  postDevices(data: any) {
    return this.http.post(this.url + 'devices', data);
  }
  patchEmployeeDetails(id: any, data: any) {
    console.log('new Data', data);

    return this.http.patch(this.url + 'employees/' + id, data);
  }
  patchDeviceDetails(id: any, data: any) {
    console.log('new Data', data);

    return this.http.patch(this.url + 'devices/' + id, data);
  }
}
