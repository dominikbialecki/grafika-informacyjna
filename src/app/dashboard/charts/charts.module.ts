import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartComponent } from './chart/chart.component';

@NgModule({
    declarations: [ChartsComponent, ChartComponent],
    imports: [
        CommonModule,
        ChartsRoutingModule,
        NgxChartsModule,
    ]
})
export class ChartsModule {
}
