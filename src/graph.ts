export interface Graph {
  data:
    {
      x: [];
      y: [];
      hovertemplate: string;
      type: string;
      line: {
        color: string;
        shape?: string;
        smoothing?: number;
        width: number;
      };
      hoverlabel: {
        bgcolor: string;
        bordercolor: string;
        font?: {
          color: string;
          family: string;
          size: string;
        };
      };
      mode: string;
    }[],

  layout: {
    autosize: boolean;
    margin: {
      l: number;
      r: number;
    };
    font?: {
      color: string;
      family?: string;
    };
    title: {
      text: string;
      font: {
        family?: string;
        color?: string;
      };
    };
    paper_bgcolor: string;
    plot_bgcolor: string;
    modebar: {
      color: string;
      bgcolor: string;
      orientation: string;
      activecolor: string;
      add: string[];
    };
    xaxis: {
      title: string;
      range: any[];
      type: string;
      tickangle: number;
      //facoltativi
      dtick?: number | string;
      gridcolor?: string;
      griddash: string;
      linecolor?: string;
      linewidth?: number;
      tickcolor?: string;
      ticklen?: number;
      tickwidth?: number;
    };
    yaxis: {
      title: string;
      range: any[];
      type: string;
      tickangle?: number;
      //facoltativi
      dtick?: number | string;
      gridcolor?: string;
      griddash?: string;
      linecolor?: string;
      linewidth?: number;
      tickcolor?: string;
      ticklen?: number;
      tickwidth?: number;
    };
  };
}
