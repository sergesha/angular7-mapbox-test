import { GeoJsonFeature } from '@app/features/map/models/geo-json-feature.model';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export enum MapActionTypes {
    LoadMapFeatures = '[Map] Load Map Feature',
    AddMapFeature = '[Map] Add Map Feature',
    UpsertMapFeature = '[Map] Upsert Map Feature',
    AddMapFeatures = '[Map] Add Map Features',
    UpsertMapFeatures = '[Map] Upsert Map Features',
    UpdateMapFeature = '[Map] Update Map Feature',
    UpdateMapFeatures = '[Map] Update Map Features',
    DeleteMapFeature = '[Map] Delete Map Feature',
    DeleteMapFeatures = '[Map] Delete Map Features',
    ClearMapFeatures = '[Map] Clear Map Features',
    ShowMapLayer = '[Map] Show Map Layer',
    HideMapLayer = '[Map] Hide Map Layer',
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

export class ShowMapLayer implements Action {
    readonly type = MapActionTypes.ShowMapLayer;

    constructor(public payload: { layer: string }) {
    }
}

export class HideMapLayer implements Action {
    readonly type = MapActionTypes.HideMapLayer;

    constructor(public payload: { layer: string }) {
    }
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
    | ClearMapFeatures
    | ShowMapLayer
    | HideMapLayer;
