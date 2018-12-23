// import { TestBed } from '@angular/core/testing';
//
// import { FirestoreAdapterService } from './firestore.service';
//
// describe('FirestoreAdapterService', () => {
//  beforeEach(() => TestBed.configureTestingModule({}));
//
//  it('should be created', () => {
//    const service: FirestoreAdapterService = TestBed.get(FirestoreAdapterService);
//    expect(service).toBeTruthy();
//  });
// });


import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirestoreAdapterService } from './firestore-adapter.service';

describe('FirestoreAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirestoreAdapterService, AngularFirestore]
    });
  });

  it('should be created', inject([FirestoreAdapterService], (service: FirestoreAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
