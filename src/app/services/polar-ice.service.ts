import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveData } from 'src/ActiveDataClass';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class PolarIceService {
  constructor(private http: HttpClient) {}

  
  // polarIceData = new ActiveData(
  //   'Polar Ice',
  //   '#0093b0',
  //   '#fff',
  //   'polar ice descriprion',
  //   [],
  //   [],
  //   'Years',
  //   'Million square km',
  //   ['1979-9', '2021-9'],
  //   [2, 8]
  // );


  getPolarIceData() {
    this.getPolarIceDataAPI();
    return this.polarIceData;
  }

  getPolarIceDataAPI() {
    this.http.get<any>(`${APIurls.polarIce}`).subscribe({
      next: (res) => {
        this.polarIceData.graph.data[0].x = res.arcticData.map(
          (r: { year: number; month: number }) => `${r.year}-${r.month}`
        );
        this.polarIceData.graph.data[0].y = res.arcticData.map(
          (r: { area: number }) => r.area
        );
        const extent = {
          x: res.arcticData.map(
            (r: { year: number; month: number }) => `${r.year}-${r.month}`
          ),
          y: res.arcticData.map((r: { extent: number }) => r.extent),
        };
        // this.polarIceData.graph.data.push(this.polarIceData.graph.data[0])
        // console.log(this.polarIceData);

        // if(this.polarIceData.graph.data[1]){

        //   this.polarIceData.graph.data[1].x = extent.x
        //   this.polarIceData.graph.data[1].y = extent.y
        // }
      },
      error: (err) => {},
    });
  }
}
