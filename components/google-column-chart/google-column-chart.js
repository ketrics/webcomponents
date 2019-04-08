import GoogleChart from "http://localhost:3000/components/GoogleChart.js";

class GoogleColumnChart extends GoogleChart {
    chartType = "Column";
}
window.customElements.define('google-column-chart', GoogleColumnChart);
