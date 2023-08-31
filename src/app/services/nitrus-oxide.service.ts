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
    `Nitrous oxide, commonly known as laughing gas, is another critical player in the global warming scenario, albeit less discussed than carbon dioxide and methane. Despite its lower concentration in the atmosphere, nitrous oxide is approximately 300 times more potent as a greenhouse gas than carbon dioxide over a century. Originating from both natural sources, like soil and water, and human activities, such as agriculture, industrial processes, and the burning of fossil fuels, nitrous oxide has a dual detrimental effect on our environment. Not only does it trap heat and contribute to the greenhouse effect, but it also plays a role in the depletion of the stratospheric ozone layer, which protects life on Earth from the sun's harmful ultraviolet radiation. The increasing levels of nitrous oxide have been linked to more frequent and severe weather events, rising sea levels, and disruptions in marine and terrestrial ecosystems. For instance, the acidification and warming of oceans can lead to loss of biodiversity and reduced fish stocks, impacting food security for millions. Addressing nitrous oxide emissions requires a holistic approach, focusing on sustainable agricultural practices, industrial reforms, and global cooperation to safeguard our planet's future.`,
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
            .map((r: { average: string }) => r.average);
          return this.nitrusOxideData;
        }),
        catchError((err: any) => throwError(() => err))
      );
    });
  }

  getNitrusOxideDataAPI(): Observable<NitrusOxideResponse> {
    return this.http.get<NitrusOxideResponse>(`${APIurls.nitrusOxide}`);
  }
}
