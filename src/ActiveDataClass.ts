import { Graph } from './graph';

export class ActiveData {
  title: string;
  description: string;
  palette?: [string, string];
  graph: Graph;

  constructor(
    title: string,
    primary: string,
    accent: string,
    description: string,
    xData: [],
    yData: [],
    xTitle: string,
    yTitle: string,
    xRange: any[],
    yRange: any[],
    xDtick?: number,
    yDtick?: number
  ) {
    this.title = title;
    this.description = description;
    this.palette = [primary, accent];
    this.graph = {
      data: [
        {
          y: yData,
          x: xData,
          hovertemplate: `<extra></extra>%{x}<br> ${title}: %{y}`,
          type: 'scatter',
          line: {
            color: primary,
            shape: 'spline',
            smoothing: 1.3,
            width: 1,
          },
          hoverlabel: {
            bgcolor: `${primary}50`,
            bordercolor: 'transparent',
            font: {
              color: accent,
              family: '',
              size: '',
            },
          },
          mode: 'lines',
        }
      ],
      layout: {
        autosize: true,
        margin: {
          l: 48,
          r: 25,
        },
        font: {
          color: primary,
          family: '',
        },
        title: {
          text: title,
          font: {
            family: '',
            color: primary,
          },
        },
        paper_bgcolor: '#000',
        plot_bgcolor: '#323232',
        modebar: {
          color: primary,
          bgcolor: '#000',
          orientation: 'v',
          activecolor: accent,
          add: ['hovercompare', 'togglehover', 'togglespikelines'],
        },
        xaxis: {
          title: xTitle,
          range: xRange,
          type: 'text',
          tickangle: 90,
          // facoltativi
          dtick: xDtick,
          gridcolor: '',
          griddash: '',
          linecolor: accent,
          linewidth: 5,
          tickcolor: primary,
          ticklen: 6,
          tickwidth: 2,
        },
        yaxis: {
          title: yTitle,
          range: yRange,
          type: 'linear',
          tickangle: 90,
          // facoltativi
          dtick: yDtick,
          gridcolor: '',
          griddash: '',
          linecolor: accent,
          linewidth: 5,
          tickcolor: primary,
          ticklen: 6,
          tickwidth: 2,
        },
      },
    };
  }
}
