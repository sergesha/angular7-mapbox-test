import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum MapActionTypes {
    LoadMapFeatures = '[Map] Load Map Feature',
    AddMapFeature = '[Map] Add MapFeature',
    UpsertMapFeature = '[Map] Upsert MapFeature',
    AddMapFeatures = '[Map] Add MapFeatures',
    UpsertMapFeatures = '[Map] Upsert MapFeatures',
    UpdateMapFeature = '[Map] Update MapFeature',
    UpdateMapFeatures = '[Map] Update MapFeatures',
    DeleteMapFeature = '[Map] Delete MapFeature',
    DeleteMapFeatures = '[Map] Delete MapFeatures',
    ClearMapFeatures = '[Map] Clear MapFeatures'
}

export class LoadMapFeatures implements Action {
    readonly type = MapActionTypes.LoadMapFeatures;

    constructor(public payload?: { mapFeatures: GeoJsonFeature[] }) {
    }
}

export class AddMapFeature implements Action {
    readonly type = MapActionTypes.AddMapFeature;

    constructor(public payload: { mapFeature: GeoJsonFeature }) {
    }
}

export class UpsertMapFeature implements Action {
    readonly type = MapActionTypes.UpsertMapFeature;

    constructor(public payload: { mapFeature: GeoJsonFeature }) {
    }
}

export class AddMapFeatures implements Action {
    readonly type = MapActionTypes.AddMapFeatures;

    constructor(public payload: { mapFeatures: GeoJsonFeature[] }) {
    }
}

export class UpsertMapFeatures implements Action {
    readonly type = MapActionTypes.UpsertMapFeatures;

    constructor(public payload: { mapFeatures: GeoJsonFeature[] }) {
    }
}

export class UpdateMapFeature implements Action {
    readonly type = MapActionTypes.UpdateMapFeature;

    constructor(public payload: { mapFeature: Update<GeoJsonFeature> }) {
    }
}

export class UpdateMapFeatures implements Action {
    readonly type = MapActionTypes.UpdateMapFeatures;

    constructor(public payload: { mapFeatures: Update<GeoJsonFeature>[] }) {
    }
}

export class DeleteMapFeature implements Action {
    readonly type = MapActionTypes.DeleteMapFeature;

    constructor(public payload: { id: string }) {
    }
}

export class DeleteMapFeatures implements Action {
    readonly type = MapActionTypes.DeleteMapFeatures;

    constructor(public payload: { ids: string[] }) {
    }
}

export class ClearMapFeatures implements Action {
    readonly type = MapActionTypes.ClearMapFeatures;
}

export type MapActions =
    | LoadMapFeatures
    | AddMapFeature
    | UpsertMapFeature
    | AddMapFeatures
    | UpsertMapFeatures
    | UpdateMapFeature
    | UpdateMapFeatures
    | DeleteMapFeature
    | DeleteMapFeatures
    | ClearMapFeatures;
