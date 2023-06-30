import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveData } from 'src/ActiveDataClass';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class CarbonDioxideService {

  constructor(private http: HttpClient) { }

  carbonDioxideData = new ActiveData(
    'Carbon Dioxide',
    '#00509d',
'#ffd500',
'carbon dioxide description',
[],
[],
'Years',
'Part Per million (ppm)',
['2013-12-31', '2023-01-01'],
[300,500],

  )

  getCarbonDioxideData(): ActiveData{
    this.getCarbonDataAPI()
    console.log(this.carbonDioxideData);

    return this.carbonDioxideData
  }

  getCarbonDataAPI(){
    this.http.get<any>(`${APIurls.carbonDioxide}`).subscribe({
      next: res => {
        this.carbonDioxideData.graph.data[0].x = res.co2.map((r: {year : string, month: string, day: string}) => {
        const month = r.month.length > 1? r.month : `0${r.month}`;
         return  `${r.year}-${month}-${r.day}`
        }
        )
        this.carbonDioxideData.graph.data[0].y= res.co2.map( (r: {trend : number}) => r.trend)

      }
    })
  }
}
