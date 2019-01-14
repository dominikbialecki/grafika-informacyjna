import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { priceOfFlat } from "../consts/data/priceOfFlat";
import { criminality } from "../consts/data/criminality";
import { population } from "../consts/data/population";
import { pollution } from "../consts/data/pollution";
import { newFlats } from "../consts/data/newFlats";
import { salary } from "../consts/data/salary";
import { TranslateService } from "@ngx-translate/core";
import { dataCodeNameKeysMap } from "../consts/data/dataCodeNameKeysMap";
import { urlDataCodeMap } from "../consts/data/urlDataCodeMap";
import { combineLatest } from "rxjs";

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

    data = [[], [], [], []];
    private readonly originalData = [
        { name: "priceOfFlat", data: priceOfFlat },
        { name: "population", data: population },
        { name: "salary", data: salary },
        { name: "newFlats", data: newFlats },
        { name: "pollution", data: pollution },
        { name: "criminality", data: criminality },
    ];


    constructor(private route: ActivatedRoute,
                private translate: TranslateService,
    ) {
    }

    ngOnInit() {
        combineLatest(this.route.params, this.route.queryParams, (params, queryParams) => {
            return { params, queryParams }
        })
            .subscribe(({ params, queryParams }) => {
                this.data = this.getChartsData(params, queryParams);
            });
    }

    private getChartsData(params, queryParams) {
        const filteredData = this.getFilteredData(this.originalData, queryParams);
        const currentUnitCode = this.getCurrentUnit(params);
        const currentUnitData = this.getCurrentUnitData(filteredData, currentUnitCode);
        // const dataWithUnitNames = this.mapCodeToNames(data);
        return [
            this.getGrowChartUnitData(currentUnitData),
            this.getBarChartData(currentUnitCode, this.originalData),
            currentUnitData,
            []
        ];
    }

    private getFilteredData(data, queryParams) {
        const filters = queryParams.filter;
        return data.filter(category => filters.includes(category.name));
    }


    private getCurrentUnit(routeParams) {
        const url = Object.keys(routeParams).map(k => routeParams[k]).join('/');
        return urlDataCodeMap.get(url);
    }

    private getCurrentUnitData(data, code) {
        return data.map(category => {
            const foundUnitData = category.data.find(unitData => unitData.name === code);
            if (!foundUnitData) {
                console.error(`Unit data for code ${code} not found`)
            }
            return {
                name: this.translate.instant("FILTERS." + category.name),
                series: foundUnitData.series
            };
        });
    }

    private getGrowChartUnitData(currentUnitData) {
        return currentUnitData.map(categoryData => {
            const firstValue = categoryData.series[0].value;
            const mappedSeries = categoryData.series.map(yearData => {
                let newValue = 0;
                if (firstValue) {
                    newValue = yearData.value / firstValue;
                }
                return { ...yearData, value: newValue };
            });
            return { ...categoryData, series: mappedSeries };
        })
    }

    private getBarChartData(currentUnitCode, data) {

    }


    private getChildUnitsData() {

    }

    private mapCodesToNames(data) {
        return this.mapEveryUnitData(data, (unitData) => {
            const i18nKey = 'HEADER.' + dataCodeNameKeysMap.get(unitData.name) + '.NAME';
            unitData.name = this.translate.instant(i18nKey);
            return unitData;
        });
    }

    private mapEveryUnitData(data, callbackFn) {
        return data.map(category => {
            return category.data = category.data.map(callbackFn);
        })
    }

}
