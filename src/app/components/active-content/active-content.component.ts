import { Component, OnInit, effect } from '@angular/core';
import { ActiveData } from 'src/ActiveDataClass';

import { ActiveContentDataService } from 'src/app/services/active-content-data.service';

@Component({
  selector: 'app-active-content',
  templateUrl: './active-content.component.html',
  styleUrls: ['./active-content.component.scss'],
})
export class ActiveContentComponent implements OnInit {
  constructor(private activeContentData: ActiveContentDataService) {}
  activeContent!: ActiveData;
  root = document.documentElement;

  activeContentEffect = effect(() => {
    this.activeContent = this.activeContentData.getActiveContentData();
    if (this.activeContent.palette) {
      this.root.style.setProperty('--primary', this.activeContent.palette[0]);
      this.root.style.setProperty('--accent', this.activeContent.palette[1]);
    }
  });
  ngOnInit(): void {
    this.activeContent = this.activeContentData.getActiveContentData();
  }
}
