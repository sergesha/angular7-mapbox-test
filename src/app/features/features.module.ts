import { NgModule } from '@angular/core';
import { HomeComponent } from '@app/features/home/home.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        // MapModule
    ],
    declarations: [HomeComponent],
    exports: [],
    providers: []
})
export class FeaturesModule {
}
