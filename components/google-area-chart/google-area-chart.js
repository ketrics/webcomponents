import GoogleChart from "http://localhost:3000/components/GoogleChart.js";

class GoogleAreaChart extends GoogleChart {
    chartType = "Area";
}

window.customElements.define('google-area-chart', GoogleAreaChart);
