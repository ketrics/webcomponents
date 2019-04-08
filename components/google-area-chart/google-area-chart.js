import GoogleChart from "../GoogleChart/GoogleChart.js";

class GoogleAreaChart extends GoogleChart {
    chartType = "Area";
}

window.customElements.define('google-area-chart', GoogleAreaChart);
