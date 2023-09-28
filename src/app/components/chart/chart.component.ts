import { Component, OnInit, effect } from '@angular/core';
import { ActiveContentDataService } from 'src/app/services/active-content-data.service';
import { Graph } from 'src/graph';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  constructor(private activeContentData: ActiveContentDataService) {}

  graph!: Graph;
  activeContentEffect = effect(() => {
    this.graph = this.activeContentData.getActiveContentData().graph;
  });
  ngOnInit(): void {
    this.graph = this.activeContentData.getActiveContentData().graph;
  }
}
