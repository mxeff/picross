export type Cell = number[];

export type Clue = Cell;

export interface Picross {
    cells: Cell[];
    clues: {
        columns: Clue[];
        rows: Clue[];
    };
}
