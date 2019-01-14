import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartComponent } from './chart/chart.component';
import { SharedLazyModule } from "../../shared/shared-lazy.module";

@NgModule({
    declarations: [ChartsComponent, ChartComponent],
    imports: [
        CommonModule,
        ChartsRoutingModule,
        NgxChartsModule,
        SharedLazyModule,
    ]
})
export class ChartsModule {
}
