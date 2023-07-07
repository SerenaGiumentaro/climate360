import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/ClimateActiveData';
import createClimateActiveObj from 'src/createClimateActiveObj';
import MethaneResponse from 'src/ResponseAPI';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class MethaneService {
  constructor(private http: HttpClient) {}
  methaneData: ClimateActiveData = createClimateActiveObj(
    'Methane',
    'methane dexcription diofv oksonfodjfdmfodbs',
    '#ba5202',
    'Year',
    'Part Per million (ppm)',
    ['1983-07-01', '2023-05-01'],
    [1400, 2000]
  );

  getMethaneData(): Observable<ClimateActiveData> {
    return defer(() => {
      return this.getMethaneDataAPI().pipe(
        map((res: MethaneResponse) => {
          this.methaneData.graph.data[0].x = res.methane
            .slice(1)
            .map(
              (r: { date: string }) =>
                `${r.date.slice(0, 4)}-${r.date.slice(5)}`
            );
          this.methaneData.graph.data[0].y = res.methane
            .slice(1)
            .map((r: { average: string }) => r.average);
            return this.methaneData;
          }),
          catchError((err) => throwError(() => err))
          );
        });
  }

  getMethaneDataAPI(): Observable<MethaneResponse> {
    return this.http.get<MethaneResponse>(`${APIurls.methane}`);
  }
}
function thrwError(arg0: () => any): any {
  throw new Error('Function not implemented.');
}

