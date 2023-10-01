import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, defer, map, Observable, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/types/ClimateActiveData';
import createClimateActiveObj from 'src/createClimateActiveObj';
import MethaneResponse from 'src/types/ResponseAPI';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class MethaneService {
  constructor(private http: HttpClient) {}
  methaneData: ClimateActiveData = createClimateActiveObj(
    'Methane',
    `Methane, often referred to as CH4, is a potent greenhouse gas that significantly contributes to global warming and climate change.
    <br><br>
    This gas is released into the atmosphere through various natural processes, including the decomposition of organic matter in wetlands and the digestive processes of certain animals. However, human activities are also a major source of methane emissions. Activities such as the production and transportation of fossil fuels, livestock farming, and the decomposition of organic waste in landfills all release methane into the air.
    <br><br>
    Methane is a particularly powerful greenhouse gas, capable of trapping heat from the sun over 25 times more effectively than carbon dioxide over a 100-year period. Despite being present in smaller quantities compared to carbon dioxide, methane's heat-trapping ability makes it a significant driver of global warming.
    <br><br>
    The consequences of elevated methane levels in the atmosphere are alarming. Increasing methane concentrations lead to a more rapid and intense warming effect, contributing to the overall rise in global temperatures. This can result in the thawing of permafrost, which further releases stored methane and accelerates the feedback loop of climate change.
    <br><br>
    Moreover, methane emissions contribute to air pollution, which has adverse health effects on humans and other living organisms. Additionally, they can lead to the formation of ground-level ozone, a harmful air pollutant.
    <br><br>
    Addressing methane emissions is a critical aspect of mitigating global warming. Efforts to reduce methane emissions include improving methane capture and control systems in the oil and gas industry, implementing sustainable agricultural practices, and reducing organic waste in landfills through recycling and composting.
    <br><br>
    International cooperation is essential in tackling the global challenge of methane emissions. Agreements and initiatives aimed at reducing methane emissions, both on a national and international scale, are crucial steps in mitigating the impact of this potent greenhouse gas.
    <br><br>
    In conclusion, methane is a significant contributor to global warming, and understanding its sources and effects is essential in our collective efforts to combat climate change. By taking meaningful actions to reduce methane emissions, we can work towards a more sustainable and secure future for our planet and future generations.`,
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

