import { ClimateActiveData } from './ClimateActiveData';

export default function createClimateActiveObj(
  title: string,
  description: string,
  primary: string,
  xTitle: string,
  yTitle: string,
  xRange: [string | number, string | number],
  yRange: [string | number, string | number]
): ClimateActiveData {
  const climateActive : ClimateActiveData = {
    title : title,
    description: description,
    primary: primary,
    graph : {
      data: [
        {
          x: [],
          y: [],
          
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
              color: '#fff',
              family: '',
              size: '',
            },
          },
          mode: 'lines',
        },
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
          bgcolor: '#323232',
          orientation: 'v',
          activecolor: '#fff',
          add: ['hovercompare', 'togglehover', 'togglespikelines'],
        },
        xaxis: {
          title: xTitle,
          range: xRange,
          type: 'text',
          tickangle: 90,
          // facoltativi
          gridcolor: '',
          griddash: '',
          linecolor: '#fff',
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
          gridcolor: '',
          griddash: '',
          linecolor: '#fff',
          linewidth: 5,
          tickcolor: primary,
          ticklen: 6,
          tickwidth: 2,
        },
      },
    }
  }
  return climateActive
}
