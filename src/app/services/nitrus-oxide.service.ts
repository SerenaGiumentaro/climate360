import { Injectable } from '@angular/core';
import { ActiveData } from 'src/activeData';

@Injectable({
  providedIn: 'root'
})
export class NitrusOxideService {

  constructor() { }

  NitrusOxideData: ActiveData = {
    title: 'Nitrus Oxide',
    description: 'carbon diofv oksonfodjfdmfodbs',
    palette: ['#ffd100', '#333533']
  }

  getNitrusOxideData(){
    return this.NitrusOxideData
  }
}
