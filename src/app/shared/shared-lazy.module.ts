import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        MaterialModule,
        TranslateModule.forChild({}),
    ],
    exports: [
        CommonModule,
        TranslateModule,
        MaterialModule,
    ]
})
export class SharedLazyModule {
}
