import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartComponent } from './chart/chart.component';
import { SharedLazyModule } from "../../shared/shared-lazy.module";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [ChartsComponent, ChartComponent, BarChartComponent],
    imports: [
        CommonModule,
        ChartsRoutingModule,
        NgxChartsModule,
        SharedLazyModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ChartsModule {
}
