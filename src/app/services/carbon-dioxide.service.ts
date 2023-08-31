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
    `The surge in carbon dioxide (CO2) levels, primarily caused by human activities such as deforestation and burning fossil fuels, is a major driver of global warming and has profound implications for our planet.
    <br> As CO2 accumulates in the atmosphere, it traps heat, leading to a rise in Earth's average temperature. This not only results in melting glaciers and rising sea levels but also disrupts marine ecosystems through ocean acidification. <br><br>The increased CO2 levels have also led to unpredictable weather events, from stronger hurricanes to prolonged droughts, which in turn impact biodiversity, forcing many species to adapt, migrate, or face extinction. Beyond the environmental repercussions, the economic ramifications are significant, with damage to infrastructure, reduced agricultural productivity, and increased health costs due to the spread of tropical diseases. Furthermore, as the Arctic ice melts, it creates feedback loops, intensifying the warming effect. Addressing the CO2 surge is crucial, requiring global collaboration and immediate action to both reduce emissions and counteract the existing damage.`,
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
