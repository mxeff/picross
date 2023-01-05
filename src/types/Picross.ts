import type { State } from '@/components/Cell';
import type { NonEmptyArray } from '@/types/NonEmptyArray';

export type Cell = NonEmptyArray<State>;

export type Clue = NonEmptyArray<number>;

export interface Clues {
    columns: NonEmptyArray<Clue>;
    rows: NonEmptyArray<Clue>;
}

export interface Picross {
    cells: NonEmptyArray<Cell>;
    clues: Clues;
}
