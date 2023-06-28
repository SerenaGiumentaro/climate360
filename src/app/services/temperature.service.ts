import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveData } from 'src/activeData';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) { }

temperatureData: ActiveData = {
  title : 'Temperature',
  description : 'lorem ipsifd lof oeiv',

}
  getTemperatureData(){
    return this.temperatureData
  }
  getTemperatureDataAPI(){
    this.http.get(`${APIurls.temperature}`).subscribe({
      next: res => console.log(res)

    })
  }


}
