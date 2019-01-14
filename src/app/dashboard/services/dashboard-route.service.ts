import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from "@angular/router";
import { filter, map, mergeMap, takeUntil } from "rxjs/operators";
import { getUrlNameKeysMap } from "../consts/navbar-data";

@Injectable({
    providedIn: 'root'
})
export class DashboardRouteService implements OnDestroy {

    private _headerTitleKeys: string[] = [];
    private urlNameKeysMap = getUrlNameKeysMap();
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
        const nameKeys = <any[]>this.urlNameKeysMap.get(url);
        if (!nameKeys || !nameKeys.length) {
            console.error(`Couldn't find header title nameKey for url: ${url}`);
        } else {
            const fullKeys = [];
            nameKeys.forEach((key, index, arr) => {
                const currentKey = arr.slice(0, index + 1).join('.');
                fullKeys.push(currentKey);
            });
            this._headerTitleKeys = fullKeys;
        }
    }

    get headerTitleKeys() {
        return this._headerTitleKeys;
    }

    ngOnDestroy() {
        this.onDestroy$.next();
    }
}
