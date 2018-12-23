import { TestBed } from '@angular/core/testing';

import { HeroDataService } from './hero-data.service';

describe('HeroDataService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: HeroDataService = TestBed.get(HeroDataService);
        expect(service).toBeTruthy();
    });
});
