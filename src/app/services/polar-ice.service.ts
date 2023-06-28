import { Injectable } from '@angular/core';
import { ActiveData } from 'src/activeData';

@Injectable({
  providedIn: 'root'
})
export class PolarIceService {

  constructor() { }

  PolarIceData: ActiveData = {
    title: 'Polar Ice',
    description: 'dgdsnlgdknlgk oksonfodjfdmfodbs',
    palette: ['#00b4d8', '#caf0f8']
  }

  getPolarIceData(){
    return this.PolarIceData
  }
}
