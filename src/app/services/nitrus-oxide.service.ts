import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveData } from 'src/ActiveDataClass';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root'
})
export class NitrusOxideService {

  constructor(private http: HttpClient) { }

  nitrusOxideData = new ActiveData(
    'Nitrus Oxide',
    '#ffd100',
    '#333533',
    'nitrus oxide dexfriptmdbodfdnisfs',
    [],
    [],
    'Years',
    'Nitrus Oxide mole fraction (ppb)',
    ['2001-01-01', '2023-05-01'],
    [300,400],
  )



  getNitrusOxideData(){
    this.getNitrusOxideDataAPI()
    return this.nitrusOxideData
  }

  getNitrusOxideDataAPI(){
    this.http.get<any>(`${APIurls.nitrusOxide}`).subscribe({
      next: res=> {
        this.nitrusOxideData.graph.data[0].x = res.nitrous.slice(1).map((r : {date : string}) => `${r.date.slice(0,4)}-${r.date.slice(5)}`)
        this.nitrusOxideData.graph.data[0].y = res.nitrous.slice(1).map((r : {average : number}) => r.average)

      },
      error: err => {

      }
    })
  }
}
