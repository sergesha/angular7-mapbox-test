import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreStub } from '@app/test-stubs/angular-firestore.stub';

import { FirestoreDataService } from './firestore-data.service';

// const AngularFirestore = new InjectionToken<string>('AngularFirestore');

describe('FirestoreDataService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            FirestoreDataService,
            { provide: AngularFirestore, useValue: AngularFirestoreStub }
        ]
    }));

    it('should be created', () => {
        const service: FirestoreDataService<any> = TestBed.get(FirestoreDataService);
        expect(service).toBeTruthy();
    });
});
