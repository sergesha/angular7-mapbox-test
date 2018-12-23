import { adapter, MapState } from '@app/features/map/store/map.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectMapState = createFeatureSelector<MapState>('mapFeatures');

export const mapSelectors = {
    selectMapFeatures: createSelector(selectMapState, selectAll),
};
