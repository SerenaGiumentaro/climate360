import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ActiveContentComponent } from './components/active-content/active-content.component';
import { ChartComponent } from './components/chart/chart.component';
// primeng
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    ActiveContentComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
