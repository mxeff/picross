import { cloneDeep, isUndefined, noop } from 'lodash';
import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';
import { State } from './components/Cell';
import example from './data/example';
import type { Picross } from './interfaces/Picross';
import { hasIndex, isNonEmptyArray } from './types/NonEmptyArray';

interface Context {
    cells: Picross['cells'] | null;
    clues: Picross['clues'] | null;
    fetch: () => void;
    isLoading: boolean;
    reset: () => void;
    solve: (x: number, y: number) => void;
}

const initialData: Context = {
    cells: null,
    clues: null,
    fetch: noop,
    isLoading: false,
    reset: noop,
    solve: noop,
};

export const Store = createContext(initialData);

Store.displayName = 'Store';

interface Props {
    children: ComponentChildren;
}

export const Provider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const solution = useRef<Context['cells']>(null);

    const [cells, setCells] = useState<Context['cells']>(null);
    const [clues, setClues] = useState<Context['clues']>(null);

    const fetch = useCallback(() => {
        setIsLoading(true);

        if (
            isNonEmptyArray(example.cells) &&
            isNonEmptyArray(example.cells[0])
        ) {
            solution.current = example.cells;

            setCells(
                Array.from({ length: example.cells.length }, () =>
                    Array<State>(example.cells[0].length).fill(State.EMPTY)
                ) as Context['cells']
            );
        }

        if (
            isNonEmptyArray(example.clues.columns) &&
            isNonEmptyArray(example.clues.rows)
        ) {
            setClues({
                columns: example.clues.columns,
                rows: example.clues.rows,
            });
        }

        setIsLoading(false);
    }, []);

    const reset = useCallback(() => {
        setCells(
            Array.from({ length: example.cells.length }, () =>
                Array<State>(example.cells[0].length).fill(State.EMPTY)
            ) as Context['cells']
        );
    }, []);

    const solve = useCallback(
        <X extends number, Y extends number>(x: X, y: Y) => {
            const solvedCell = solution.current?.[y]?.[x];

            if (!cells || isUndefined(solvedCell) || !hasIndex(cells, y)) {
                return;
            }

            const nextCells = cloneDeep(cells);

            switch (solvedCell) {
                case State.FILLED:
                    nextCells[y][x] = State.FILLED;

                    break;

                case State.EMPTY:
                    nextCells[y][x] = State.ERROR;
            }

            setCells(nextCells);
        },
        [cells]
    );

    const value: Context = {
        cells,
        clues,
        fetch,
        isLoading,
        reset,
        solve,
    };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};
