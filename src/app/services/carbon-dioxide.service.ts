import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/types/ClimateActiveData';
import createClimateActiveObj from 'src/createClimateActiveObj';
import CarbonDioxideResponse from 'src/types/ResponseAPI';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class CarbonDioxideService {
  constructor(private http: HttpClient) {}

  carbonDioxideData: ClimateActiveData = createClimateActiveObj(
    'Carbon Dioxide',
    `Carbon dioxide, often abbreviated as CO2, is a greenhouse gas that plays a significant role in the global phenomenon known as global warming.
    <br><br>
    CO2 is released into the atmosphere through various human activities, with the burning of fossil fuels such as coal, oil, and natural gas being one of the primary sources. Additionally, deforestation and certain industrial processes also contribute to CO2 emissions.
    <br><br>
    Once released, carbon dioxide acts as a thermal blanket in the Earth's atmosphere, trapping heat from the sun and preventing it from escaping into space. This greenhouse effect is essential for maintaining temperatures suitable for life on our planet. However, when the concentration of CO2 in the atmosphere becomes too high, it leads to an enhanced greenhouse effect, resulting in global warming.
    <br><br>
    The consequences of elevated CO2 levels are profound. As CO2 concentrations increase, so does the Earth's average surface temperature. This warming effect leads to more frequent and severe heatwaves, changing weather patterns, and the melting of polar ice caps and glaciers.
    <br><br>
    Moreover, elevated CO2 levels contribute to the acidification of our oceans, posing a significant threat to marine life and ecosystems.
    Addressing the issue of carbon dioxide emissions is a crucial part of mitigating global warming. Transitioning to cleaner and more sustainable energy sources, improving energy efficiency in industries and transportation, and promoting afforestation and reforestation efforts are key strategies to reduce CO2 emissions.
    <br><br>
    International cooperation, as seen in agreements like the Paris Agreement, is instrumental in tackling the global challenge of carbon dioxide emissions. Together, we must take significant steps to curb our CO2 emissions and work towards a more sustainable future for our planet.
    <br><br>
    In conclusion, carbon dioxide is a central player in the complex issue of global warming. Understanding its sources and effects is essential in our collective efforts to combat climate change and protect the environment for future generations.
    `,
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
