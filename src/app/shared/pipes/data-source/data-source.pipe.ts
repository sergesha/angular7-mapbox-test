import { DataSource } from '@angular/cdk/table';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * 'dataSource' pipe converts Observable stream to DataSource (for mat table)
 */
@Pipe({
    name: 'dataSource'
})
export class DataSourcePipe implements PipeTransform {

    transform<T>(value: Observable<T[]>, args?: any): DataSource<T> {
        if (!value) {
            return null;
        }

        return {
            connect() {
                return value;
            },
            disconnect() {
            }
        };
    }
}
