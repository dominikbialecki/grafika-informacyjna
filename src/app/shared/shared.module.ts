import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LANGUAGE } from "../consts/language";
import { HttpClient, HttpClientModule } from "@angular/common/http";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            isolate: false
        })
    ],
    exports: [
        CommonModule,
        TranslateModule
    ]
})
export class SharedModule {

    constructor(private translate: TranslateService) {
        translate.use(LANGUAGE.DEFAULT);
    }
}
