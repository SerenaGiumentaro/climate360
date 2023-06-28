import { Injectable } from '@angular/core';
import { ActiveData } from 'src/activeData';

@Injectable({
  providedIn: 'root'
})
export class CarbonDioxideService {

  constructor() { }

  carbonDioxideData: ActiveData = {
    title: 'Carbon Dioxide',
    description: 'carbon diofv oksonfodjfdmfodbs'
  }

  getCarbonDioxideData(){
    return this.carbonDioxideData
  }
}
