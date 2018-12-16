import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log(this.data[0])
    }

    data = [
        [{
            "name": "Cena mieszkania za metr kw.",
            "series": [
                {
                    "value": 3750,
                    "name": "2016-09-23T13:31:45.649Z"
                },
                {
                    "value": 5109,
                    "name": "2016-09-22T20:10:55.508Z"
                },
                {
                    "value": 5133,
                    "name": "2016-09-13T20:46:00.519Z"
                },
                {
                    "value": 2608,
                    "name": "2016-09-23T19:01:50.934Z"
                },
                {
                    "value": 5896,
                    "name": "2016-09-16T05:51:32.852Z"
                }
            ]
        }],
        [{
            "name": "Cena mieszkania za metr kw.",
            "series": [
                {
                    "value": 6991,
                    "name": "2016-09-23T13:31:45.649Z"
                },
                {
                    "value": 6359,
                    "name": "2016-09-22T20:10:55.508Z"
                },
                {
                    "value": 3717,
                    "name": "2016-09-13T20:46:00.519Z"
                },
                {
                    "value": 5439,
                    "name": "2016-09-23T19:01:50.934Z"
                },
                {
                    "value": 2686,
                    "name": "2016-09-16T05:51:32.852Z"
                }
            ]
        }],
        [{
            "name": "Cena mieszkania za metr kw.",
            "series": [
                {
                    "value": 3011,
                    "name": "2016-09-23T13:31:45.649Z"
                },
                {
                    "value": 4648,
                    "name": "2016-09-22T20:10:55.508Z"
                },
                {
                    "value": 3258,
                    "name": "2016-09-13T20:46:00.519Z"
                },
                {
                    "value": 6572,
                    "name": "2016-09-23T19:01:50.934Z"
                },
                {
                    "value": 3283,
                    "name": "2016-09-16T05:51:32.852Z"
                }
            ]
        }],
        [{
            "name": "Cena mieszkania za metr kw.",
            "series": [
                {
                    "value": 3966,
                    "name": "2016-09-23T13:31:45.649Z"
                },
                {
                    "value": 6691,
                    "name": "2016-09-22T20:10:55.508Z"
                },
                {
                    "value": 5847,
                    "name": "2016-09-13T20:46:00.519Z"
                },
                {
                    "value": 3811,
                    "name": "2016-09-23T19:01:50.934Z"
                },
                {
                    "value": 4295,
                    "name": "2016-09-16T05:51:32.852Z"
                }
            ]
        }]
    ];

}
