export default interface TemperatureResponse {
  error: null | string;
  result: {
    time: string;
    station: string;
    land: string;
  }[];
}

export default interface CarbonDioxideResponse {
  co2: {
    year: string;
    month: string;
    day: string;
    cycle: string;
    trend: string;
  }[];
}

export default interface MethaneResponse {
  methane: {
    date: string;
    average: string;
    trend: string;
    averageUnc: string;
    trendUnc: string;
  }[];
}

export default interface NitrusOxideResponse {
  nitrous: {
    date: string;
    average: string;
    trend: string;
    averageUnc: string;
    trendUnc: string;
  }[];
}

export default interface PolarIceResponse {
  error: string | null,
  arcticData : {
    Column1: number,
    year: number,
    month: number,
    "data-type": string,
    hemisphere : string,
    extent: number,
    area: number,
    rank: number
  }[]
}
