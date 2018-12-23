import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidenavComponent } from './left-sidenav.component';
import { SharedModule } from '../../shared/shared.module';

describe( 'LeftSidenavComponent', () => {
    let component: LeftSidenavComponent;
    let fixture: ComponentFixture<LeftSidenavComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [ SharedModule ],
            declarations: [ LeftSidenavComponent ]
        } )
            .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( LeftSidenavComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
