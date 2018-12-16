import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from "@angular/router";
import { filter, map, mergeMap, takeUntil } from "rxjs/operators";
import { getUrlNameKeyMap } from "../consts/navbar-data";

@Injectable({
    providedIn: 'root'
})
export class DashboardRouteService implements OnDestroy {

    private _headerTitle = 'Grafika informacyjna';
    private urlNameKeyMap = getUrlNameKeyMap();
    route = new BehaviorSubject(null);
    onDestroy$ = new Subject();

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.startEmittingMergedRouteChanges();
        this.subscribeToRouteChange();
    }

    startEmittingMergedRouteChanges() {
        this.router.events
            .pipe(
                takeUntil(this.onDestroy$),
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary')
            )
            .subscribe((route) => this.route.next(route));
    }

    private subscribeToRouteChange() {
        this.route
            .pipe(
                filter(r => !!r),
                mergeMap((route: ActivatedRoute) => route.url),
                takeUntil(this.onDestroy$)
            )
            .subscribe(urlSegments => this.setHeaderTitle(urlSegments));

    }

    private setHeaderTitle(urlSegments: UrlSegment[]) {
        const url = urlSegments.map(u => u.path).join('/');
        const nameKey = this.urlNameKeyMap.get(url);
        if (!nameKey) {
            console.error(`Couln't find header title nameKey for url: ${url}`);
        } else {
            this._headerTitle = 'HEADER.' + <string>nameKey;
        }
    }

    get headerTitle() {
        return this._headerTitle;
    }

    ngOnDestroy() {
        this.onDestroy$.next();
    }
}
