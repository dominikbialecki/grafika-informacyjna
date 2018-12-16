import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';

const MODULES = [
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
];

@NgModule({
    imports: [
        CommonModule,
        ...MODULES
    ],
    exports: [...MODULES],
    declarations: [],
})
export class MaterialModule {
}
