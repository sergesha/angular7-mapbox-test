import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input() leftDrawer;
    @Input() rightDrawer;

    toggleLeftDrawer() {
        if (typeof this.leftDrawer.toggle === 'function') {
            this.leftDrawer.toggle();
        }
    }

    toggleRightDrawer() {
        if (typeof this.rightDrawer.toggle === 'function') {
            this.rightDrawer.toggle();
        }
    }

    // isHandset$: Observable<boolean> = this.breakpointObserver.observe( Breakpoints.Handset )
    //     .pipe(
    //         map( result => result.matches )
    //     );
    //
    // constructor( private breakpointObserver: BreakpointObserver ) {
    // }

}
