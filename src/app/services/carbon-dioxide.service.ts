import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/ClimateActiveData';
import createClimateActiveObj from 'src/createClimateActiveObj';
import CarbonDioxideResponse from 'src/ResponseAPI';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class CarbonDioxideService {
  constructor(private http: HttpClient) {}

  carbonDioxideData: ClimateActiveData = createClimateActiveObj(
    'Carbon Dioxide',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam ab recusandae suscipit voluptas temporibus odit, error voluptatum nisi, at rem eius in alias? Cupiditate velit, labore quia doloribus aperiam mollitia?',
    '#008c8a',
    'Year',
    'Part Per Million (ppm)',
    ['2013-12-31', '2023-01-01'],
    [300, 500]
  );

  getCarbonDioxideData(): Observable<ClimateActiveData> {
    return defer(() => {
      return this.getCarbonDataAPI().pipe(
        map((res: CarbonDioxideResponse) => {
          this.carbonDioxideData.graph.data[0].x = res.co2.map(
            (r: { year: string; month: string; day: string }) => {
              const month = r.month.length > 1 ? r.month : `0${r.month}`;
              return `${r.year}-${month}-${r.day}`;
            }
          );
          this.carbonDioxideData.graph.data[0].y = res.co2.map((r) => r.trend);
          return this.carbonDioxideData;
        }),
        catchError((err) => throwError(() => err))

      );
    });
  }

  getCarbonDataAPI(): Observable<CarbonDioxideResponse> {
    return this.http.get<CarbonDioxideResponse>(`${APIurls.carbonDioxide}`);
  }
}
