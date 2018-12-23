import { Component, OnInit } from '@angular/core';
import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { MapFeaturesService } from '@app/features/map/services/map-features.service';
import { retrieveFeatureId } from '@app/features/map/store/map.reducer';

@Component({
    selector: 'app-poi-list',
    templateUrl: './poi-list.component.html',
    styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit {
    markers$;

    constructor(private mapService: MapFeaturesService) {
    }

    ngOnInit() {
        this.markers$ = this.mapService.getMarkers$();
    }

    removeMarker(marker) {
        this.mapService.removeMarker(retrieveFeatureId(marker));
    }

    selectMarker(data: GeoJsonFeature) {
        this.mapService.selectMarker(data);
    }
}
