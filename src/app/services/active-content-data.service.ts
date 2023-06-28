import { Injectable, effect, signal } from '@angular/core';
import { TemperatureService } from './temperature.service';
import { CarbonDioxideService } from './carbon-dioxide.service';
import { MethaneService } from './methane.service';
import { NitrusOxideService } from './nitrus-oxide.service';
import { PolarIceService } from './polar-ice.service';
import { ActiveData } from 'src/activeData';

@Injectable({
  providedIn: 'root',
})
export class ActiveContentDataService {
  constructor(
    private temperatureService: TemperatureService,
    private carbonService: CarbonDioxideService,
    private methaneService: MethaneService,
    private nitrusService: NitrusOxideService,
    private polarIceService: PolarIceService
  ) {}
  activeContent = signal<ActiveData>({
    title: 'Temeprature',
    description: 'Lorem ispof ifi ksonf',
  });
  getActiveContentData() {
    return this.activeContent();
  }

  setActiveDataContent(newContent: string) {
    console.log(newContent);

    switch (newContent) {
      case 'Temperature':
        this.activeContent.set(this.temperatureService.getTemperatureData());
        break;
      case 'Carbon Dioxide':
        this.activeContent.set(this.carbonService.getCarbonDioxideData());
        break;
      case 'Methane':
        break;
      case 'Nitrus Oxide':
        break;
      case 'Polar Ice':
      default:
        this.activeContent.set({title: 'def', description: 'ffkjfjf'});
    }
  }
}
