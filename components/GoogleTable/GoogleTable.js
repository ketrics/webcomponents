import {KetricsElement, html} from "../Ketrics/KetricsElement.js";


export default class GoogleTable extends KetricsElement {
    static get properties() {
        return {
            data: { type: Array },
            title: { type: String }
        };
    }

    get _options(){
        if(this.options)    return this.options;

        return {
            allowHtml: true,
            showRowNumber: true,
            width: '100%',
            height: '100%',
            alternatingRowStyle: true
        };
    }

    render(){
        return html`
            <style >
            @import "https://www.gstatic.com/charts/46.2/css/table/table.css";
            </style>
            <div id="table_div"></div>
        `;
    }

    addColumns(dataTable){
        this.columns.forEach(col=>{
            dataTable.addColumn(col.type, col.label);
        })
    }

    addRows(dataTable){
        const {data} = this.props;

        let rows=[];
        data.forEach(row=>{
            let newRow=[];
            this.columns.forEach(col=>{
                newRow.push(row[col.id])
            });
            rows.push(newRow);
        })

        dataTable.addRows(rows);
    }

    formatData(dataTable){ }

    updated(changedProperties){
        // Load the Visualization API and the table package.
        google.charts.load('current', {'packages':['table']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawTable);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        let self = this;
        function drawTable (){
            var table = new google.visualization.Table(self.shadowRoot.querySelector('#table_div'));
            var dataTable = new google.visualization.DataTable();
            self.addColumns(dataTable);
            self.addRows(dataTable);
            self.formatData(dataTable);
            table.draw(dataTable, self._options);
        }
    }
}

