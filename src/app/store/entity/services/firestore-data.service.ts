import { Injectable } from '@angular/core';
import { FirestoreAdapterService } from '@app/core/services';
import { EntityCollectionDataService, QueryParams, Update } from 'ngrx-data';
import { from, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

interface EntityBaseModel {
    id?: number | string;
}

@Injectable()
export class FirestoreDataService<T extends EntityBaseModel> implements EntityCollectionDataService<T> {
    name;
    protected collection;

    constructor(private readonly db: FirestoreAdapterService) {
    }

    config(config: { collectionName: string }): FirestoreDataService<T> {
        this.collection = config.collectionName;
        this.name = `[${config.collectionName.toUpperCase()}] Firestore Data Service`;
        return this;
    }

    add(entity: T): Observable<T> {
        const docPath = this.docPath(entity);
        // return from(this.db.set<T>(docRef, entity)
        //     .then(() => this.db.doc$<T>(docRef).toPromise())) as Observable<T>;

        return from(this.db.set<T>(docPath, entity)).pipe(
            flatMap(() => this.db.doc$<T>(docPath)),
            // catchError(error => console.log(error))
        );
    }

    delete(id: number | string): Observable<null> {
        const docPath = this.docPath(id);
        return from(this.db.delete<T>(docPath)).pipe(
            flatMap(() => of(null))
        );
    }

    getAll(): Observable<T[]> {
        const docPath = this.docPath();
        return this.db.colWithIds$<T>(docPath);
    }

    getById(id: any): Observable<T> {
        const docPath = this.docPath(id);
        return this.db.doc$<T>(docPath);
    }

    getWithQuery(params: string | QueryParams): Observable<T[]> {
        const paramsArray: string[] = typeof params === 'string' ? params.split(' ') : [];
        const { fieldPath, opStr, value } = typeof params === 'string' ? {
            fieldPath: paramsArray[0],
            opStr: paramsArray[1],
            value: paramsArray[2]
        } : params;
        const docPath = this.docPath();
        const queryFn = ref => ref.where(fieldPath, opStr, value);
        return this.db.col$<T>(docPath, queryFn);
    }

    update(update: Update<T>): Observable<T> {
        const docPath = this.docPath(update);
        return from(this.db.update<T>(docPath, update.changes)).pipe(
            flatMap(() => this.db.doc$<T>(docPath))
        );
    }

    upsert(entity: T): Observable<T> {
        const docPath = this.docPath(entity);
        return from(this.db.upsert<T>(docPath, entity)).pipe(
            flatMap(() => this.db.doc$<T>(docPath))
        );
    }

    private docPath(param?: T | Update<T> | number | string | undefined): string {
        let path: string;
        switch (typeof param) {
            case 'number':
            case 'string':
                path = `${this.collection}/${param}`;
                break;
            case 'undefined':
                path = this.collection;
                break;
            default:
                path = param['id'] ? `${this.collection}/${param['id']}` : this.collection;
        }
        return path;
    }
}

// FirestoreDataConfig Decorator
export function FirestoreDataConfig(config: { collectionName: string }) {
    return function <U extends EntityBaseModel, T extends { new(...args: any[]): FirestoreDataService<U> }>(target: T): T {
        Object.defineProperties(
            target.prototype, {
                collection: {
                    value: config.collectionName,
                    writable: true
                },
                name: {
                    value: `[${config.collectionName.toUpperCase()}] Firestore Data Service`,
                    writable: true
                }
            }
        );
        return target;
        // return class CustomFirestoreDataService extends target {
        //     collection = config.collectionName;
        //     name = `[${config.collectionName}] Firestore Data Service`;
        // }
    };
}

