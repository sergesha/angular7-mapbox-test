import { NgModule } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { APP_CONFIG } from '@app/app-config';
import { MapRoutingModule } from '@app/features/map/map-routing.module';
import { PoiListComponent } from '@app/features/map/poi-list/poi-list.component';
import { MapFeaturesService } from '@app/features/map/services/map-features.service';
import { MapEffects } from '@app/features/map/store/map.effects';
import { SharedModule } from '@app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapTogglesComponent } from './map-toggles/map-toggles.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MapComponent } from './map.component';
import * as fromMap from './store/map.reducer';

@NgModule({
    declarations: [
        MapComponent,
        MapTogglesComponent,
        MapViewComponent,
        PoiListComponent
    ],
    imports: [
        SharedModule,
        MapRoutingModule,
        StoreModule.forFeature('mapFeatures', fromMap.reducer),
        EffectsModule.forFeature([MapEffects]),
        NgxMapboxGLModule.withConfig(APP_CONFIG.mapboxConfig)
    ],
    providers: [MapFeaturesService, AngularFireDatabase],
    exports: []
})
export class MapModule {
}
