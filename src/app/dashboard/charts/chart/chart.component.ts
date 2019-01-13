import { Component, Input, OnInit } from '@angular/core';
import * as moment from "moment";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    chartData = [
        {
            "name": "Cena mieszkania za metr kw.",
            "series": []
        }
    ];
    @Input('data') data;
    colorScheme = {
        domain: [
            '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
        ]
    };
    showXAxis = true;
    showYAxis = true;
    showXAxisLabel = true;
    xAxisLabel = 'Data';
    showYAxisLabel = true;
    yAxisLabel = 'Cena mieszkania za m kw.';
    timeline = false;
    xAxisTickFormatting = (date) => moment(date).format('MM-YYYY');

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            return this.chartData = this.data
        }, 10);
    }

}
