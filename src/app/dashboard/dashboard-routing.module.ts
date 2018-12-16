import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
    { path: 'charts', component: DashboardComponent, loadChildren: './charts/charts.module#ChartsModule' },
    { path: '', redirectTo: 'charts', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
