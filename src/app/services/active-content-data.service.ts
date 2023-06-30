import { Injectable, effect, signal } from '@angular/core';
import { TemperatureService } from './temperature.service';
import { CarbonDioxideService } from './carbon-dioxide.service';
import { MethaneService } from './methane.service';
import { NitrusOxideService } from './nitrus-oxide.service';
import { PolarIceService } from './polar-ice.service';
import { ActiveData } from 'src/ActiveDataClass';

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
  activeContent = signal<ActiveData>(this.temperatureService.getTemperatureData());
  getActiveContentData() {
    return this.activeContent();
  }

  setActiveDataContent(newContent: string) {

    switch (newContent) {
      case 'Temperature':
        this.activeContent.set(this.temperatureService.getTemperatureData());
        break;
      case 'Carbon Dioxide':
        this.activeContent.set(this.carbonService.getCarbonDioxideData());
        break;
      case 'Methane':
        this.activeContent.set(this.methaneService.getMethaneData())
        break;
      case 'Nitrus Oxide':
        this.activeContent.set(this.nitrusService.getNitrusOxideData())
        break;
      case 'Polar Ice':
        this.activeContent.set(this.polarIceService.getPolarIceData())
    }
  }
}
