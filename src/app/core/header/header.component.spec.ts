import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared/shared.module';

describe( 'HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach( fakeAsync( () => {
        TestBed.configureTestingModule( {
            imports: [ SharedModule ],
            declarations: [ HeaderComponent ]
        } )
            .compileComponents();

        fixture = TestBed.createComponent( HeaderComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } ) );

    it( 'should compile', () => {
        expect( component ).toBeTruthy();
    } );
} );
