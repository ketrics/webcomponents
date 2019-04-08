import KetricsElement from "../KetricsElement/KetricsElement.js";


export default class GoogleChart extends KetricsElement {
    static get defaultProps() {
        return {
            data: {type: 'object', required: true},
            title: {type: 'text', required: true},
            x_serie: {type: 'text', required: true},
            y_serie: {type: 'text', required: true},
            width: {type: 'number'},
            height: {type: 'number'},
        }
    }

    get _options(){
        if(this.options)    return this.options;

        return {
            'title': this.props.title,
            'width': this.props.width ? this.props.width: 400,
            'height': this.props.height ? this.props.height: 300
        };
    }

    render(){
        const template = document.createElement('template');
        if(!this.validateProps()) return template;

        template.innerHTML = `
            <div id="chart_div"></div>
        `;
        super.render(template);
        this.renderChart();
    }

    get dataSource(){
        const {data, x_serie, y_serie} = this.props;
        return data.map(row=>{return[row[x_serie], row[y_serie]]});
    }

    addRows(dataTable){
        dataTable.addRows(this.dataSource);
    }

    addColumns(dataTable){
        const {x_serie, y_serie} = this.props;
        if(this.columns){
            this.columns.forEach(col=>{
                dataTable.addColumn(col.type, col.label);
            })
        }else {
            dataTable.addColumn('string', x_serie);
            dataTable.addColumn('number', y_serie);
        }
    }

    renderChart(){
        const {title} = this.props;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        let self = this;
        function drawChart (){
            // Create the data table.
            var dataTable = new google.visualization.DataTable();
            self.addColumns(dataTable);
            self.addRows(dataTable);

            var chart;
            switch (self.chartType.toLowerCase()) {
                case 'pie':
                    chart = new google.visualization.PieChart(self.root.getElementById('chart_div'));
                    break;
                case 'column':
                    chart = new google.visualization.ColumnChart(self.root.getElementById('chart_div'));
                    break;
                case 'area':
                    chart = new google.visualization.AreaChart(self.root.getElementById('chart_div'));
                    break;
                case 'combo':
                    chart = new google.visualization.ComboChart(self.root.getElementById('chart_div'));
                    break;
                default:
                    chart = new google.visualization.ColumnChart(self.root.getElementById('chart_div'));
                    break;
            }

            chart.draw(dataTable, self._options);
        }
    }
}

