import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';

export class FeatureCollection {
    type = 'FeatureCollection';
    constructor(public features: Array<GeoJsonFeature>) {}
}
