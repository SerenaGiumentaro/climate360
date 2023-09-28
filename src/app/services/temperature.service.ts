import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, defer, map, throwError } from 'rxjs';
import { ClimateActiveData } from 'src/ClimateActiveData';
import TemperatureResponse from 'src/ResponseAPI';
import createClimateActiveObj from 'src/createClimateActiveObj';
import APIurls from 'src/url';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  temperatureData: ClimateActiveData = createClimateActiveObj(
    'Temperature',
    `Global warming is a critical environmental challenge that demands our immediate attention. It refers to the steady increase in the Earth's average surface temperature, primarily driven by human activities. The main culprit behind this phenomenon is the emission of greenhouse gases into our atmosphere.
    <br><br>
    These greenhouse gases, including carbon dioxide, methane, and nitrous oxide, act as a thermal blanket, trapping heat from the sun and causing the planet's temperature to rise. This temperature increase has severe and far-reaching consequences for our world.
    <br><br>
    One of the most evident effects is the ongoing rise in global temperatures, leading to more frequent and intense heatwaves. Moreover, it has contributed to the melting of polar ice caps and glaciers, leading to a rise in sea levels. This rising sea level poses a significant threat to coastal regions worldwide.
    <br><br>
    Global warming is also linked to an increase in extreme weather events, including hurricanes, droughts, wildfires, and intense storms. These events have devastating effects on communities and ecosystems.
    <br><br>
    Furthermore, the changing climate disrupts ecosystems and threatens countless plant and animal species. Many face habitat loss and are at risk of extinction.
    <br><br>
    Addressing global warming is a collective responsibility. To mitigate its impact, we must reduce our carbon emissions. This involves transitioning to cleaner and renewable energy sources, enhancing energy efficiency in all sectors, and adopting sustainable transportation alternatives.
    <br><br>
    Afforestation and reforestation efforts can help capture carbon dioxide from the atmosphere, further assisting in the fight against global warming. International cooperation, as exemplified by global agreements such as the Paris Agreement, plays a vital role in uniting nations to combat this global issue.
    <br><br>
    In conclusion, global warming is an urgent and complex challenge that affects us all. By comprehending its causes and effects and taking meaningful actions to reduce our carbon footprint, we can collectively work towards a more sustainable and secure future for generations to come. Our planet's health and the well-being of future generations depend on our commitment to addressing this critical issue.`,
    '#e8233a',
    'Year',
    'Celsius',
    ['1880', '2024'],
    [-1.5, 2]
  );
  getTemperatureData() :Observable<ClimateActiveData>{
    return defer(() => {
      return this.getTemperatureDataAPI().pipe(
        map((res:TemperatureResponse) => {
          this.temperatureData.graph.data[0].x = res.result
          .slice()
          .map((r: { time: string }) => {
            const monthString = r.time.slice(-2);
            const month = (() => {
              switch (monthString) {
                case '04':
                  return '01';
                case '13':
                  return '02';
                case '21':
                  return '03';
                case '29':
                  return '04';
                case '38':
                  return '05';
                case '46':
                  return '06';
                case '54':
                  return '07';
                case '63':
                  return '08';
                case '71':
                  return '09';
                case '79':
                  return '10';
                case '88':
                  return '11';
                case '96':
                  return '12';
                default:
                  return '00';
              }
            })();
             return  `${r.time.slice(0,4)}-${month}`
          });
        this.temperatureData.graph.data[0].y = res.result
          .slice()
          .map((r: { station: any }) => r.station);
          return this.temperatureData
        }),
        catchError((err) => throwError(() => err))

      )
    })
  }

  getTemperatureDataAPI() :Observable<TemperatureResponse>{
    return this.http.get<TemperatureResponse>(`${APIurls.temperature}`)
  }
}
