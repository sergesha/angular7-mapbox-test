import { Injectable } from '@angular/core';
import {
    Action,
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
    DocumentChangeAction,
    DocumentSnapshotDoesNotExist,
    DocumentSnapshotExists
} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

// The T is a Typescript generic that allows us to use our custom interfaces
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
    providedIn: 'root'
})
export class FirestoreAdapterService {
    constructor(private afs: AngularFirestore) {
    }

    // firebase serve timestamp
    private get timestamp() {
        return firestore.FieldValue.serverTimestamp();
    }

    // Methods wraps the afsdoc and collection, so the service can be used as a drop and replacement for AngularFirestore
    // If we pass a string is going to return a AngularFirestoreCollection ref
    // But if we pass a ref, then it'll just returnthe ref
    col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
    }

    // **** Get Data ****
    doc$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref).snapshotChanges().pipe(
            map(doc => doc.payload.data() as T)
        );
    }

    // return the collection array
    col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
        return this.col(ref, queryFn).snapshotChanges().pipe(
            map(docs => docs.map(a => a.payload.doc.data()) as T[])
        );
    }

    // return the collection object with the ids
    colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
        return this.col(ref, queryFn).snapshotChanges().pipe(
            map((actions: DocumentChangeAction<T>[]) => actions
                    .map((a: DocumentChangeAction<T>) => {
                        const data: Object = a.payload.doc.data() as T;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    })
                // convert [] to {}
                // .reduce((a, v) => {
                //     a[v.id] = v;
                //     return a;
                // }, {})
                // or it's shorter version:
                // .reduce((a, v) => (a[v.id] = v) && a, {})
            )
        );
    }

    inspectDoc(ref: DocPredicate<any>): void {
        const tick = new Date().getTime();
        this.doc(ref)
            .snapshotChanges()
            .pipe(
                take(1),
                tap((d: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<any>>) => {
                    const tock = new Date().getTime() - tick;
                    console.log(`Loaded Document in ${tock}ms`, d);
                }),
            )
            .subscribe();
    }

    inspectCol(ref: CollectionPredicate<any>): void {
        const tick = new Date().getTime();
        this.col(ref)
            .snapshotChanges()
            .pipe(
                take(1),
                tap((c: DocumentChangeAction<any>[]) => {
                    const tock = new Date().getTime() - tick;
                    console.log(`Loaded Collection in ${tock}ms`, c);
                }),
            )
            .subscribe();
    }

    // **** CRUD Methods ****

    add<T>(ref: CollectionPredicate<T>, data): Promise<firestore.DocumentReference> {
        const timestamp = this.timestamp;
        return this.col(ref).add({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp,
        });
    }

    set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        const timestamp = this.timestamp;
        return this.doc(ref).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp,
        });
    }

    update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        return this.doc(ref).update({
            ...data,
            updatedAt: this.timestamp,
        });
    }

    delete<T>(ref: DocPredicate<T>): Promise<void> {
        return this.doc(ref).delete();
    }

    upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        const doc = this.doc(ref)
            .snapshotChanges()
            .pipe(take(1))
            .toPromise();

        return doc.then((snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
            return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
        });
    }

    // Use of geopoint
    geopoint(lat: number, lng: number) {
        return new firestore.GeoPoint(lat, lng);
    }
}
