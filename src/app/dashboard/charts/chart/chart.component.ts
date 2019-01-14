import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

    chartData = [
        {
            "name": "Cena mieszkania za metr kw.",
            "series": []
        }
    ];
    @Input('data') data;
    colorScheme = {
        domain: [
            '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
        ]
    };
    showXAxis = true;
    showYAxis = true;
    showXAxisLabel = true;
    xAxisLabel = 'Data';
    showYAxisLabel = true;
    yAxisLabel = 'Cena mieszkania za m kw.';
    timeline = false;

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {
            return this.chartData = this.data
        }, 10);
    }

    ngOnChanges() {
        this.chartData = this.data;
    }

}
