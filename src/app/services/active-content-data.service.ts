import { Injectable, signal } from '@angular/core';
import { TemperatureService } from './temperature.service';
import { CarbonDioxideService } from './carbon-dioxide.service';
import { MethaneService } from './methane.service';
import { NitrusOxideService } from './nitrus-oxide.service';
import { PolarIceService } from './polar-ice.service';
import { ClimateActiveData } from 'src/types/ClimateActiveData';

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
  root = document.documentElement;
  activeContent = signal<ClimateActiveData>(
    this.temperatureService.temperatureData
  );
  isLoading = signal<boolean>(false);

  getIsLoading() {
    return this.isLoading();
  }
  getActiveContentData() {
    return this.activeContent();
  }
  setActiveDataContent(newContent: string) {
    this.isLoading.set(true);
    switch (newContent) {
      case 'Temperature':
        this.changePrimaryColor(
          this.temperatureService.temperatureData.primary
        );
        this.temperatureService.getTemperatureData().subscribe({
          next: (data) => {
            this.isLoading.set(false);
            this.activeContent.set(data);
          },

          error: (err) =>
            console.error(`Error retrieving Temperature Data: ${err.message}`),
        });
        break;
      case 'Carbon Dioxide':
        this.changePrimaryColor(this.carbonService.carbonDioxideData.primary);
        this.carbonService.getCarbonDioxideData().subscribe({
          next: (data) => {
            this.isLoading.set(false);
            this.activeContent.set(data);
          },
          error: (err) =>
            console.error(
              `Error retrieving Carbon Dioxide Data: ${err.message}`
            ),
        });
        break;
      case 'Methane':
        this.changePrimaryColor(this.methaneService.methaneData.primary);
        this.methaneService.getMethaneData().subscribe({
          next: (data) => {
            this.isLoading.set(false);
            this.activeContent.set(data);
          },
          error: (err) =>
            console.error(`Error retrieving Methane Data: ${err.message}`),
        });
        break;
      case 'Nitrus Oxide':
        this.changePrimaryColor(this.nitrusService.nitrusOxideData.primary);
        this.nitrusService.getNitrusOxideData().subscribe({
          next: (data) => {
            this.isLoading.set(false);
            this.activeContent.set(data);
          },
          error: (err) =>
            console.error(`Error retrieving Nitrus Oxide Data: ${err.message}`),
        });
        break;
      case 'Polar Ice':
        this.changePrimaryColor(this.polarIceService.polarIceData.primary);
        this.polarIceService.getPolarIceData().subscribe({
          next: (data) => {
            this.isLoading.set(false);
            this.activeContent.set(data);
          },
          error: (err) =>
            console.error(`Error retrieving Polar Ice Data: ${err.message}`),
        });
    }
  }

  changePrimaryColor(primary: string) {
    this.root.style.setProperty('--primary', primary);
  }
}
