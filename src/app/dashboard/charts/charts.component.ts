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

    chartsData = [
        { xAxisLabelTranslateKey: "COMMON.DATE", yAxisLabelTranslateKey: "COMMON.GROW_RATIO", data: [] },
        { xAxisLabelTranslateKey: "", yAxisLabelTranslateKey: "FILTERS.priceOfFlat", data: [] },
        { xAxisLabelTranslateKey: "COMMON.DATE", yAxisLabelTranslateKey: "", data: [] },
        { xAxisLabelTranslateKey: "COMMON.DATE", yAxisLabelTranslateKey: "", data: [] },
    ];
    private readonly originalData = [
        { name: "priceOfFlat", data: priceOfFlat },
        { name: "population", data: population },
        { name: "salary", data: salary },
        { name: "newFlats", data: newFlats },
        { name: "pollution", data: pollution },
        { name: "criminality", data: criminality },
    ];
    readonly yearOptions = [];
    barChartSelectedYear = 2017;
    params;
    queryParams;

    constructor(private route: ActivatedRoute,
                private translate: TranslateService,
    ) {
        this.yearOptions = this.getYearOptions();
    }

    private getYearOptions() {
        return population[0].series.map(data => parseInt(data.name));
    }

    ngOnInit() {
        combineLatest(this.route.params, this.route.queryParams, (params, queryParams) => {
            return { params, queryParams }
        })
            .subscribe(({ params, queryParams }) => {
                this.params = params;
                this.queryParams = queryParams;
                this.getChartsData(this.chartsData, params, queryParams);
            });
    }

    private getChartsData(currentChartsData, params, queryParams) {
        const filteredData = this.getFilteredData(this.originalData, queryParams);
        const currentUnitCode = this.getCurrentUnit(params);
        const currentUnitData = this.getCurrentUnitData(filteredData, currentUnitCode);
        const newData = [
            this.getGrowChartUnitData(currentUnitData),
            this.getBarChartData(currentUnitCode, this.originalData),
            currentUnitData,
            []
        ];
        this.chartsData = currentChartsData.map((chartData, index) => {
            return { ...chartData, data: newData[index] };
        });
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
        if (this.isCountry(currentUnitCode)) {
            return this.getFilteredUnitsDataByNames(data, this.isVoivoidenship);
        }
        // TODO change filterFn if there are counties in other voivoidenships than those in greater poland
        else if (this.isVoivoidenship(currentUnitCode)) {
            return this.getFilteredUnitsDataByNames(data, this.isCounty);
        } else if (this.isCounty(currentUnitCode)) {
            return this.getFilteredUnitsDataByNames(data, this.isCounty);
        } else {
            console.error(`Couldn't find unit for unitCode ${currentUnitCode}`);
        }
    }

    private isCountry = (code): boolean => code === '0000000';

    private isCounty = (code): boolean => !/00000$/.test(code);

    private isVoivoidenship = (code): boolean => !this.isCountry(code) && /00000$/.test(code);

    private getFilteredUnitsDataByNames(data, filterFn) {
        // TODO pick year form
        const priceOfFlatCategory = data.find(category => category.name === 'priceOfFlat');
        if (!priceOfFlatCategory) {
            console.error('Couldn\'t find price of flat category');
        }
        const filteredPriceOfFlatData = priceOfFlatCategory.data.filter(unitData => filterFn(unitData.name));
        return filteredPriceOfFlatData.map(unitData => {
            const foundYearData = unitData.series.find(foundYearData => foundYearData.name === this.barChartSelectedYear.toString());
            if (!foundYearData) {
                console.error(`Couldn't find year data for year ${this.barChartSelectedYear}`);
            }
            return {
                value: foundYearData.value,
                name: this.mapCodeToName(unitData.name)
            }
        });
    }

    private mapCodeToName(code) {
        const i18nKey = 'NAVBAR.' + dataCodeNameKeysMap.get(code) + '.NAME';
        return this.translate.instant(i18nKey);
    }
}

