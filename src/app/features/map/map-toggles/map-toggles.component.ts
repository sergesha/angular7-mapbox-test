import { Component, OnInit } from '@angular/core';
import { MapFeaturesService } from '@app/features/map/services/map-features.service';

@Component({
    selector: 'app-map-toggles',
    templateUrl: './map-toggles.component.html',
    styleUrls: ['./map-toggles.component.scss']
})
export class MapTogglesComponent implements OnInit {
    airports = true;
    ports = true;
    pois = true;

    constructor(private mapService: MapFeaturesService) {
    }

    ngOnInit() {
    }

    onChange(layer, visibility) {
        if (visibility) {
            this.mapService.showLayer(layer);
        } else {
            this.mapService.hideLayer(layer);
        }
    }

}
