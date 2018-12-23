import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { AuthEffects } from './auth.effects';

describe('MapEffects', () => {
    const actions$: Observable<any> = of('');
    let effects: AuthEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(AuthEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
