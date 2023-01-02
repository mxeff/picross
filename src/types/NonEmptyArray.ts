export type NonEmptyArray<T> = [T, ...T[]];

export const isNonEmptyArray = <T extends unknown[]>(
    value: T
): value is T & NonEmptyArray<T> => value.length > 0;

export const hasIndex = <T extends unknown[], I extends number>(
    value: T,
    index: I
): value is T & { [K in I]: NonNullable<T[K]> } =>
    typeof value[index] !== 'undefined';
