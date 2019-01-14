import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import { NavbarData, navbarData } from "./consts/navbar-data";
import { DashboardRouteService } from "./services/dashboard-route.service";
import { mergeMap, take } from "rxjs/operators";
import { Router, UrlSegment } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

    filters = [
        { filter: "priceOfFlat", textKey: "DASHBOARD.priceOfFlat" },
        { filter: "population", textKey: "DASHBOARD.population" },
        { filter: "salary", textKey: "DASHBOARD.salary" },
        { filter: "newFlats", textKey: "DASHBOARD.newFlats" },
        { filter: "pollution", textKey: "DASHBOARD.pollution" },
        { filter: "criminality", textKey: "DASHBOARD.criminality" },
    ];

    selectedFilters = this.filters;
    navbarData = navbarData;
    private readonly _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    opened = true;

    constructor(changeDetectorRef: ChangeDetectorRef,
                media: MediaMatcher,
                private route: DashboardRouteService,
                private translate: TranslateService,
                private router: Router,
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.setQueryParams(this.selectedFilters);
        this.route.route
            .pipe(
                mergeMap((a => a.url)),
                take(1)
            )
            .subscribe((urlSegments: UrlSegment[]) => this.setExpandedOnNavbarData(urlSegments));
    }

    setExpandedOnNavbarData(urlSegments: UrlSegment[]) {
        const paths = urlSegments.map(segment => segment.path);
        paths.reduce((navbarData, path) => {
                if (navbarData.children) {
                    const currentData = navbarData.children.find(data => data.redirectUrl === path);
                    if (currentData) {
                        currentData.expanded = true;
                        return currentData;
                    }
                }
                return navbarData;
            },
            { children: this.navbarData }
        )
    }

    getHeaderTittleKeys() {
        return this.route.headerTitleKeys.map(key => `HEADER.${key}.NAME`);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    toggleExpanded(data: NavbarData) {
        const newValue = !data.expanded;
        data.expanded = newValue;
        if (newValue === false) {
            let dataChild = data.children.find(d => d.expanded === true);
            while (dataChild) {
                dataChild.expanded = false;
                dataChild = !data.children ? null : data.children.find(d => d.expanded === true);
            }
        }
    };

    setQueryParams(filters) {
        const queryParams = this.mapFiltersToQueryParams(filters);
        this.router.navigate(['.'], { queryParams })
    }

    mapFiltersToQueryParams(filters) {
        return { filter: filters.map(f => f.filter) };
    }
}
