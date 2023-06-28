import { Injectable } from '@angular/core';
import { ActiveData } from 'src/activeData';

@Injectable({
  providedIn: 'root'
})
export class MethaneService {

  constructor() { }

  MethaneData: ActiveData = {
    title: 'Methane',
    description: 'carbon diofv oksonfodjfdmfodbs',
    palette: ['#5b3000', '#82a6b1']
  }

  getMethaneData(){
    return this.MethaneData
  }
}
