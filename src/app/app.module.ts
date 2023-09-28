import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ChartComponent } from './components/chart/chart.component';
// Plotly
import * as Plotly from 'plotly.js-dist-min'
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = Plotly
// primeng
import { TabMenuModule } from 'primeng/tabmenu';
import { ClimateInfoPageComponent } from './components/climate-info-page/climate-info-page.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LogoContainerComponent } from './components/logo-container/logo-container.component';

@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    ChartComponent,
    ClimateInfoPageComponent,
    LogoContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    HttpClientModule,
    PlotlyModule,
    SkeletonModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
