import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityStoreModule } from '@app/store/entity/entity-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './app.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers, { metaReducers }), // NgRx
        EffectsModule.forRoot([AppEffects]), // NgRx
        EntityStoreModule, // NgRx-data
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    declarations: []
})
export class AppStoreModule {
}
