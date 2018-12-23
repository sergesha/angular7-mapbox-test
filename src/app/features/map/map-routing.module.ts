import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewComponent } from '@app/features/map/map-view/map-view.component';
import { MapComponent } from '@app/features/map/map.component';

const routes: Routes = [
    {
        path: '',
        component: MapComponent,
        children: [
            { path: '', component: MapViewComponent, data: { breadcrumb: 'Map Box'} },
            { path: ':id', component: MapViewComponent, data: { breadcrumb: 'Map Details'} },
            // { path: 'new', component: RecipeEditComponent, canActivate: [ AuthGuard ] },
            // { path: ':id', component: RecipeDetailComponent },
            // { path: ':id/edit', component: RecipeEditComponent, canActivate: [ AuthGuard ] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule {
}
