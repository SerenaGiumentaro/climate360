import { Component, OnInit, signal, HostListener, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[]= [
    {label: 'Temperature'},
    {label: 'Carbon Dioxide'},
    {label: 'Methane'},
    {label: 'Nitrous Oxide'},
    {label: 'Polar Ice'},
  ]
  mobileItems: MenuItem[] = [
    {label: 'C°'},
    {label: 'Co2'},
    {label: 'Ch4'},
    {label: 'No2'},
    {label: '', icon: 'p p-ice'},
  ]
  itemsSignal = signal(this.items)
  mobileItemsSignal = signal(this.mobileItems)
  viewportSignal = signal(window.innerWidth)
  viewport = window.innerWidth

  @HostListener('window:resize', ['$event'])
  onWindowResize(event:any){
    // this.viewportSignal.set(window.innerWidth)
    this.viewport = innerWidth
  }
  ngOnInit(): void {
 

  }


}
