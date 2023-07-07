import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, map, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/ClimateActiveData';
import TemperatureResponse from 'src/ResponseAPI';
import createClimateActiveObj from 'src/createClimateActiveObj';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  temperatureData: ClimateActiveData = createClimateActiveObj(
    'Temperature',
    'temperaature description',
    '#e8233a',
    'Year',
    'Celsius',
    ['1880', '2024'],
    [-1.5, 2]
  );
  getTemperatureData() :Observable<ClimateActiveData>{
    return defer(() => {
      return this.getTemperatureDataAPI().pipe(
        map((res:TemperatureResponse) => {
          this.temperatureData.graph.data[0].x = res.result
          .slice()
          .map((r: { time: string }) => {
            const monthString = r.time.slice(-2);
            const month = (() => {
              switch (monthString) {
                case '04':
                  return '01';
                case '13':
                  return '02';
                case '21':
                  return '03';
                case '29':
                  return '04';
                case '38':
                  return '05';
                case '46':
                  return '06';
                case '54':
                  return '07';
                case '63':
                  return '08';
                case '71':
                  return '09';
                case '79':
                  return '10';
                case '88':
                  return '11';
                case '96':
                  return '12';
                default:
                  return '00';
              }
            })();
             return  `${r.time.slice(0,4)}-${month}`
          });
        this.temperatureData.graph.data[0].y = res.result
          .slice()
          .map((r: { station: any }) => r.station);
          return this.temperatureData
        }),
        catchError((err) => throwError(() => err))

      )
    })
  }

  getTemperatureDataAPI() :Observable<TemperatureResponse>{
    return this.http.get<TemperatureResponse>(`${APIurls.temperature}`)
  }
}
