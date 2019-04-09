import {LitElement, html} from "https://unpkg.com/lit-element?module";


export default class GoogleChart extends LitElement{
    static get properties() {
        return {
            data: { type: Array },
            type: { type: String },
            title: { type: String },
            xSerie: { type: String, attribute: 'x_serie' },
            ySerie: { type: String, attribute: 'y_serie' },
            width: { type: Number },
            height: { type: Number }
        };
    }

    constructor() {
        super();
        this.data = [];
        this.title = "";
        this.type = "ColumnChart";
        this.xSerie = null;
        this.ySerie = null;
        this.width = null;
        this.height = 300;
    }

    render(){
        return html`<div id="chart_div"></div>`;
    }

    get _options(){
        if(this.options)    return this.options;

        let options = {
            'title': this.title,
            'height': this.height
        }

        if(this.width!==null) options.width = this.width;

        return options;
    }

    get dataSource(){
        return this.data.map(row=>{return[row[this.xSerie], row[this.ySerie]]});
    }

    addRows(dataTable){
        dataTable.addRows(this.dataSource);
    }

    addColumns(dataTable){
        if(this.columns){
            this.columns.forEach(col=>{
                dataTable.addColumn(col.type, col.label);
            })
        }else {
            dataTable.addColumn('string', this.xSerie);
            dataTable.addColumn('number', this.ySerie);
        }
    }

    updated(changedProperties){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        let self = this;
        function drawChart() {
            var dataTable = new google.visualization.DataTable();
            self.addColumns(dataTable);
            self.addRows(dataTable);

            var chart;
            switch (self.type.toLowerCase()) {
                case 'piechart':
                    chart = new google.visualization.PieChart(self.shadowRoot.getElementById('chart_div'));
                    break;
                case 'columnchart':
                    chart = new google.visualization.ColumnChart(self.shadowRoot.getElementById('chart_div'));
                    break;
                case 'areachart':
                    chart = new google.visualization.AreaChart(self.shadowRoot.getElementById('chart_div'));
                    break;
                case 'combochart':
                    chart = new google.visualization.ComboChart(self.shadowRoot.getElementById('chart_div'));
                    break;
                default:
                    chart = new google.visualization.ColumnChart(self.shadowRoot.getElementById('chart_div'));
                    break;
            }

            chart.draw(dataTable, self._options);
        }
    }
}

window.customElements.define('google-chart', GoogleChart);
