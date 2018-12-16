import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LANGUAGE } from "./consts/language";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private translateService: TranslateService,
    ) {
        this.translateService.use(LANGUAGE.DEFAULT);
    }

    ngOnInit() {
    }

}
