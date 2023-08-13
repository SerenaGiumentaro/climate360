import { Component, OnInit, effect, signal } from '@angular/core';
import { ClimateActiveData } from 'src/ClimateActiveData';
import { ActiveContentDataService } from 'src/app/services/active-content-data.service';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-climate-info-page',
  templateUrl: './climate-info-page.component.html',
  styleUrls: ['./climate-info-page.component.scss'],
})
export class ClimateInfoPageComponent implements OnInit {
  constructor(
    private activeContentData: ActiveContentDataService,
    private temperatureService: TemperatureService
  ) {}
  isLoading: boolean = false;
  activeClimateInfo!: ClimateActiveData;

  activeClimateInfoEffect = effect(() => {
    this.isLoading = this.activeContentData.getIsLoading();
    this.activeClimateInfo = this.activeContentData.getActiveContentData();
  });

  ngOnInit(): void {
    this.isLoading = true;
    this.temperatureService.getTemperatureData().subscribe((data) => {
      this.isLoading = false;
      this.activeContentData.activeContent.set(data);
      this.activeClimateInfo = this.activeContentData.getActiveContentData();
    });
  }
}
