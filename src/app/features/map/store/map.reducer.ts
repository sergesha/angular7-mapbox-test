import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { MapActions, MapActionTypes } from '@app/features/map/store/map.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface MapState extends EntityState<GeoJsonFeature> {
    // additional entities state properties
    visibleLayers: { [key: string]: boolean }
}

export const retrieveFeatureId = (feature: GeoJsonFeature) => {
    const { id } = feature.properties || { id: undefined };
    let featureId;
    if (id) {
        featureId = `${feature.type}@${id}`;
    } else {
        featureId = `${feature.type}@`
            + (feature.geometry.coordinates[0] || feature.geometry.coordinates['lng'] || feature.geometry.coordinates['lon'])
            + '|'
            + (feature.geometry.coordinates[1] || feature.geometry.coordinates['lat']);
    }
    return featureId;
};

export const adapter: EntityAdapter<GeoJsonFeature> = createEntityAdapter<GeoJsonFeature>({
    selectId: feature => retrieveFeatureId(feature)
});

export const initialState: MapState = adapter.getInitialState({
    // additional entity state properties
    visibleLayers: {}
});

export function reducer(
    state = initialState,
    action: MapActions
): MapState {
    switch (action.type) {
        case MapActionTypes.AddMapFeature: {
            return adapter.addOne(action.payload.mapFeature, state);
        }

        case MapActionTypes.UpsertMapFeature: {
            return adapter.upsertOne(action.payload.mapFeature, state);
        }

        case MapActionTypes.AddMapFeatures: {
            return adapter.addMany(action.payload.mapFeatures, state);
        }

        case MapActionTypes.UpsertMapFeatures: {
            return adapter.upsertMany(action.payload.mapFeatures, state);
        }

        case MapActionTypes.UpdateMapFeature: {
            return adapter.updateOne(action.payload.mapFeature, state);
        }

        case MapActionTypes.UpdateMapFeatures: {
            return adapter.updateMany(action.payload.mapFeatures, state);
        }

        case MapActionTypes.DeleteMapFeature: {
            return adapter.removeOne(action.payload.id, state);
        }

        case MapActionTypes.DeleteMapFeatures: {
            return adapter.removeMany(action.payload.ids, state);
        }

        case MapActionTypes.LoadMapFeatures: {
            if (action.payload && action.payload.mapFeatures) {
                return adapter.addAll(action.payload.mapFeatures, state);
            } else {
                return state;
            }
        }

        case MapActionTypes.ClearMapFeatures: {
            return adapter.removeAll(state);
        }

        case MapActionTypes.ShowMapLayer: {
            return {
                ...state,
                visibleLayers: {
                    ...state.visibleLayers,
                    [action.payload.layer]: true
                }
            };
        }

        case MapActionTypes.HideMapLayer: {
            return {
                ...state,
                visibleLayers: {
                    ...state.visibleLayers,
                    [action.payload.layer]: false
                }
            };
        }

        default: {
            return state;
        }
    }
}

