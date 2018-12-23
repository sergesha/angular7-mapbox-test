import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { MapEffects } from './map.effects';

describe('MapEffects', () => {
    const actions$: Observable<any> = of('');
    let effects: MapEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MapEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(MapEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
