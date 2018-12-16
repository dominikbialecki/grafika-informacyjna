import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from "./charts.component";

const routes: Routes = [
    { path: ':country', component: ChartsComponent },
    { path: ':country/:voivodeship', component: ChartsComponent },
    { path: ':country/:voivodeship/:county', component: ChartsComponent },
    { path: '', redirectTo: 'poland', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule {
}
