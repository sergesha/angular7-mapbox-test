import { OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Print what is in the pipe
 * @param message - prefix message
 * @returns {MonoTypeOperatorFunction<T>}
 */
export function pipeLog<T>(message?: string): OperatorFunction<T, T> {
    return tap(e => console.log(message, e));
}

/**
 * Get from bigger source object the smaller one, selecting only certain properties
 * @param sourceObject - bigger source object
 * @param keyList - list of properties to be selected
 * @returns {any}
 */
export function reduceObject<T, K extends keyof T, S extends T>(sourceObject: S, keyList: K[]): T | null {
    if (sourceObject) {
        return keyList.reduce((obj, key) =>
            ({ ...obj, [key]: sourceObject[key] }), {}) as T;
    }
    return null;
}

/**
 * Convert array of objects to one object
 * @example:
 * const mapByName = arrayToObject('name');
 * const mappedObject = mapByName([{name: 'first', desc: 'First'}, {name: 'second', desc: 'Second'}]);
 * mappedObject === {first: {name: 'first', desc: 'First'}, second: {name: 'second', desc: 'Second'}}
 * @param keyField - the key, which is used as a primary (id) key
 * @param sourceArray - source array of objects
 * @returns {object - named map}
 */
export const arrayToObject = keyField => sourceArray =>
    Object.assign({}, ...sourceArray.map(item => ({ [item[keyField]]: item })));

export const APP_HELPERS = {
    arrayToObject,
    reduceObject,
    pipeLog
};
