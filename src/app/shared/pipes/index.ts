import { DataSourcePipe } from '@app/shared/pipes/data-source/data-source.pipe';
import { KeysOfPipe } from '@app/shared/pipes/keys-of/keys-of.pipe';
import { ValuesOfPipe } from '@app/shared/pipes/values-of/values-of.pipe';

export { DataSourcePipe } from '@app/shared/pipes/data-source/data-source.pipe';
export { KeysOfPipe } from '@app/shared/pipes/keys-of/keys-of.pipe';
export { ValuesOfPipe } from '@app/shared/pipes/values-of/values-of.pipe';

export const APP_SHARED_PIPES = [
    DataSourcePipe,
    KeysOfPipe,
    ValuesOfPipe
];
