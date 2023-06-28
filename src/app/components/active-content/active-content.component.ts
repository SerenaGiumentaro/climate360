import { Component, OnInit, effect, signal } from '@angular/core';
import { ActiveData } from 'src/activeData';

import { ActiveContentDataService } from 'src/app/services/active-content-data.service';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-active-content',
  templateUrl: './active-content.component.html',
  styleUrls: ['./active-content.component.scss'],
})
export class ActiveContentComponent implements OnInit{
  constructor(private activeContentData: ActiveContentDataService, private temperatureService: TemperatureService) {}
  activeContent! : ActiveData


  activeContentEffect = effect(() => {

    this.activeContent = this.activeContentData.getActiveContentData();
  });
  ngOnInit(): void {
    this.activeContent = this.activeContentData.getActiveContentData();

  }

}
