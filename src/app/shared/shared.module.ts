import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_SHARED_PIPES } from '@app/shared/pipes';
import { APP_SHARED_COMPONENTS } from './components';
import { MaterialModule } from './material/material.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        ...APP_SHARED_COMPONENTS,
        ...APP_SHARED_PIPES,
    ],
    exports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ...APP_SHARED_COMPONENTS,
        ...APP_SHARED_PIPES
    ]

})
export class SharedModule {
}
