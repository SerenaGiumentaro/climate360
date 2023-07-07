import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, map, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/ClimateActiveData';
import NitrusOxideResponse from 'src/ResponseAPI';
import createClimateActiveObj from 'src/createClimateActiveObj';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class NitrusOxideService {
  constructor(private http: HttpClient) {}
  nitrusOxideData: ClimateActiveData = createClimateActiveObj(
    'Nitrus Oxide',
    'nitrus oxide dexfriptmdbodfdnisfs',
    '#6774e6',
    'Year',
    'Nitrus Oxide mole fraction (ppb)',
    ['2001-01-01', '2023-05-01'],
    [300, 400]
  );

  getNitrusOxideData(): Observable<ClimateActiveData> {
    return defer(() => {
      return this.getNitrusOxideDataAPI().pipe(
        map((res: NitrusOxideResponse) => {
          this.nitrusOxideData.graph.data[0].x = res.nitrous
            .slice(1)
            .map(
              (r: { date: string }) =>
                `${r.date.slice(0, 4)}-${r.date.slice(5)}`
            );
          this.nitrusOxideData.graph.data[0].y = res.nitrous
            .slice(1)
            .map((r: { average: string }) => r.average)
          return this.nitrusOxideData;
        }),
        catchError((err: any) =>  throwError(() => err))
      );
    });
  }

  getNitrusOxideDataAPI(): Observable<NitrusOxideResponse> {
    return this.http.get<NitrusOxideResponse>(`${APIurls.nitrusOxide}`);
  }
}
