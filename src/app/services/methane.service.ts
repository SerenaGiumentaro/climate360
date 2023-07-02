import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveData } from 'src/ActiveDataClass';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class MethaneService {

  constructor(private http :HttpClient) { }

  methaneData = new ActiveData(
    'Methane',
    '#ba5202',
    '#fff',
    'methane dexcription diofv oksonfodjfdmfodbs',
    [],
    [],
    'Years',
    'Part Per million (ppm)',
    ['1983-07-01', '2023-05-01'],
    [1400,2000],

  )


  getMethaneData(){
    this.getMethaneDataAPI()
    return this.methaneData
  }

  getMethaneDataAPI(){
    this.http.get<any>(`${APIurls.methane}`).subscribe({
      next: res=> {
        this.methaneData.graph.data[0].x = res.methane.slice(1).map((r : {date : string}) => `${r.date.slice(0,4)}-${r.date.slice(5)}`)
        this.methaneData.graph.data[0].y = res.methane.slice(1).map((r : {average : number}) => r.average)

      },
      error: err => {

      }
    })
  }
}
