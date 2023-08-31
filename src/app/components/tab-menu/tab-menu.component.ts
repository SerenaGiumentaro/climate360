import { Component, OnInit, signal, HostListener, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActiveContentDataService } from 'src/app/services/active-content-data.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  constructor(private activeDataContent: ActiveContentDataService) {}
  items: MenuItem[] = [
    { label: 'Temperature', target: 'Temperature' },
    { label: 'Carbon Dioxide', target: 'Carbon Dioxide' },
    { label: 'Methane', target: 'Methane' },
    { label: 'Nitrous Oxide', target: 'Nitrus Oxide' },
    { label: 'Polar Ice', target: 'Polar Ice' },
  ];
  mobileItems: MenuItem[] = [
    { label: 'C°', target: 'Temperature' },
    { label: 'Co2', target: 'Carbon Dioxide' },
    { label: 'Ch4', target: 'Methane' },
    { label: 'No2', target: 'Nitrus Oxide' },
    { label: '', icon: 'fa-regular fa-snowflake', target: 'Polar Ice' },
  ];
  //a cosa serve? itemsignal
  activeItem!: MenuItem;
  itemsSignal = signal(this.items);
  viewport = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.viewport = innerWidth;
    //this.activeDataContent.setActiveDataContent('Temperature');
    //this.activeItem = this.viewport > 660 ? this.items[0] : this.mobileItems[0];
  }
  ngOnInit(): void {
    this.activeItem = this.viewport > 660 ? this.items[0] : this.mobileItems[0];
  }
  changeActiveTab(event: any) {
    this.activeDataContent.setActiveDataContent(event.target);
    this.activeItem = event
  }
}
