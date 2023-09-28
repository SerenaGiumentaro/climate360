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
    `Methane, is a potent greenhouse gas that significantly contributes to global warming.
     Its warming potential is over 25 times greater than CO2 over a 100-year period.
     Produced by natural sources like wetlands, as well as human activities such as livestock
      digestion, rice cultivation, and fossil fuel extraction, methane's rise in the
      atmosphere exacerbates the greenhouse effect. As the Earth warms,
      permafrost regions begin to thaw, releasing trapped methane and creating
      a dangerous feedback loop of increasing temperatures.
      <br><br>This not only accelerates the melting of polar ice caps and the rise
      of sea levels but also leads to more extreme weather events, from intense
      heatwaves to heavy rainfall and flooding. Marine ecosystems, too, are affected,
      with warmer waters threatening coral reefs and the species that rely on them.
      <br><br>The socio-economic consequences are vast, with communities facing threats to
       their homes, livelihoods, and food sources. Addressing the methane challenge is imperative,
        necessitating global efforts to reduce emissions from both natural and anthropogenic
        sources.`,
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
