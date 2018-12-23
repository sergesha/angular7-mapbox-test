import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroDataService } from '@app/store/entity/services/hero-data.service';
import { UserDataService } from '@app/store/entity/services/user-data.service';
import { EntityDataService, EntityMetadataMap, NgrxDataModule } from 'ngrx-data';

// firebase-functions-helper
// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//     root: 'api',
//     timeout: 10000
// };

export const entityMetadata: EntityMetadataMap = {
    Hero: {},
    User: {}
};

// export const pluralNames = { Hero: 'heroes' };

@NgModule({
    imports: [
        CommonModule,
        // NgrxDataModule.forRoot({ entityMetadata, pluralNames })
        NgrxDataModule.forRoot({ entityMetadata })
    ],
    declarations: [],
    providers: [
        // provide the custom data services: -->
        UserDataService,
        HeroDataService
        // { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    ]
})
export class EntityStoreModule {
    constructor(entityDataService: EntityDataService,
                userDataService: UserDataService,
                heroDataService: HeroDataService) {
        entityDataService.registerServices({
            User: userDataService,
            Hero: heroDataService
            // Hero: heroDataService.config({ collectionName: 'heroes' })
        });
    }
}
