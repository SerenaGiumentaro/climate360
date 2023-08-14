import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, map, throwError } from 'rxjs';
import { ActiveData } from 'src/ActiveDataClass';
import { ClimateActiveData } from 'src/ClimateActiveData';
import createClimateActiveObj from 'src/createClimateActiveObj';
import PolarIceResponse from 'src/ResponseAPI';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class PolarIceService {
  constructor(private http: HttpClient) {}
  polarIceData: ClimateActiveData = createClimateActiveObj(
    'Polar Ice',
    'polar ice descriprion',
    '#0093b0',
    'Year',
    'Million square km',
    ['1979-9', '2021-9'],
    [2, 8]
  );
  twoLinesPolarIceGraphData = [
    { ...this.polarIceData.graph.data[0] },
    { ...this.polarIceData.graph.data[0] },
  ];

  getPolarIceData(): Observable<ClimateActiveData> {
    return defer(() => {
      return this.getPolarIceDataAPI().pipe(
        map((res: PolarIceResponse) => {
          this.twoLinesPolarIceGraphData[0].x = res.arcticData.map(
            (r: { year: number; month: number }) => `${r.year}-${r.month}`
          );
          this.twoLinesPolarIceGraphData[0].y = res.arcticData.map(
            (r: { area: number }) => r.area
          );
          const extent = {
            x: res.arcticData.map(
              (r: { year: number; month: number }) => `${r.year}-${r.month}`
            ),
            y: res.arcticData.map((r: { extent: number }) => r.extent),
          };

          this.twoLinesPolarIceGraphData[1].x = extent.x;
          this.twoLinesPolarIceGraphData[1].y = extent.y;
          this.twoLinesPolarIceGraphData[0].line = {
            color: '#08D4AE',
            shape: 'spline',
            smoothing: 1.3,
            width: 1,
          };
          this.twoLinesPolarIceGraphData[0].name = 'area';
          this.twoLinesPolarIceGraphData[1].name = 'extent';

          this.polarIceData.graph.data = this.twoLinesPolarIceGraphData;

          return this.polarIceData;
        }),
        catchError((err) => throwError(() => err))
      );
    });
  }

  getPolarIceDataAPI(): Observable<PolarIceResponse> {
    return this.http.get<PolarIceResponse>(`${APIurls.polarIce}`);
  }
}
