import GoogleChart from "../GoogleChart/GoogleChart.js";

class GoogleColumnChart extends GoogleChart {
    chartType = "Column";
}
window.customElements.define('google-column-chart', GoogleColumnChart);
