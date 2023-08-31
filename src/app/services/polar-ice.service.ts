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
    `The polar ice caps, encompassing the vast ice sheets of Antarctica and
    Greenland along with the sea ice of the Arctic, are critical components of our
    planet's climate system.
    <br><br>These icy expanses not only influence global weather patterns but also act
    as Earth's natural reflectors, bouncing back sunlight into space.
    <br><br>However, due to global warming, these ice caps have been melting at an
    unprecedented rate. As the ice melts, darker ocean or land is exposed, which
    absorbs more sunlight, creating a feedback loop that accelerates further melting.
     <br><br>This rapid loss of polar ice has a cascade of consequences.
     Rising sea levels, resulting from melting glaciers and ice sheets,
     threaten coastal cities and habitats worldwide, displacing communities and
     causing billions in infrastructural damage. The warming Arctic waters are also
     altering marine ecosystems, endangering species like polar bears and walruses
     that rely on sea ice for survival.
     <br><br>Furthermore, the changing conditions are opening up new navigation routes,
     leading to geopolitical tensions and increased risk of oil spills in pristine
     environments.
     <br>Moreover, the melting of permafrost in polar regions releases vast amounts
     of methane, a potent greenhouse gas, further exacerbating global warming.
     The transformation of the polar regions is not just a distant or isolated issue;
     it's a global concern that underscores the interconnectedness of Earth's systems
     and the urgent need for comprehensive climate action.`,
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
