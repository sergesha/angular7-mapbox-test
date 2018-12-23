import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit {
    @Input() dataSource$: Observable<any[]>;
    @Input() displayedColumns: { [name: string]: string };
    @Input() pageSize: number;
    @Input() pageSizeOptions: number[];

    dataSource: MatTableDataSource<any>;

    constructor() {
    }

    private _sort: MatSort;
    private get sort() {
        return this._sort;
    }

    @ViewChild(MatSort)
    private set sort(content: MatSort) {
        this._sort = content;
    }

    private _paginator: MatPaginator;
    private get paginator() {
        return this._paginator;
    }

    @ViewChild(MatPaginator)
    private set paginator(content: MatPaginator) {
        this._paginator = content;
    }

    ngOnInit() {
        this.pageSizeOptions = this.pageSizeOptions || [1, 2, 5, 10].map(a => a * this.pageSize);
        this.dataSource = new MatTableDataSource();
        this.dataSource$.subscribe(data => this.dataSource.data = data);
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    // Could be used instead of custom KeysOfPipe
    private getKeysOf(obj: object): string[] {
        return Object.keys(obj);
    }
}
