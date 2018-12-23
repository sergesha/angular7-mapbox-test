import { LngLatLike } from 'mapbox-gl';

export interface IGeometry {
    type: 'Point';
    coordinates: LngLatLike;
}

export interface IProperty {
    'name'?: string;
    'marker-color'?: string;
    'marker-size'?: 'large' | 'medium' | 'small';
    'marker-symbol'?: string;
    'message'?: string;

    [key: string]: string;
}

export interface IGeoJson {
    type: 'Feature';
    geometry: IGeometry;
    properties?: IProperty;
    id?: string;
}

export class GeoJsonFeature implements IGeoJson {
    type: IGeoJson['type'] = 'Feature';
    geometry: IGeometry;
    id;

    constructor(coordinates: LngLatLike, public properties?: IProperty) {
        this.geometry = {
            type: 'Point',
            coordinates: coordinates
        };
        // const { id } = properties;
        // if (id) {
        //     this.id = id;
        // } else {
        //     this.id = 'Feature@'
        //         + (this.geometry.coordinates[0] || this.geometry.coordinates['lng'] || this.geometry.coordinates['lon'])
        //         + '|'
        //         + (this.geometry.coordinates[1] || this.geometry.coordinates['lat']);
        // }
    }
}
