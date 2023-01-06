import { cloneDeep, noop } from 'lodash';
import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import {
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'preact/hooks';
import { State } from './components/Cell';
import example from './data/example';
import { hasIndex, isNonEmptyArray } from './types/NonEmptyArray';
import type { Picross } from './types/Picross';

interface Context {
    cells: Picross['cells'] | null;
    clues: Picross['clues'] | null;
    cluesCount: number;
    errorCount: number;
    fetch: () => void;
    fieldCountByState: Record<State, number>;
    handleClick: (event: MouseEvent, x: number, y: number) => void;
    handleContextMenu: (event: MouseEvent, x: number, y: number) => void;
    handleKeyDown: (event: KeyboardEvent, x: number, y: number) => void;
    isLoading: boolean;
    reset: () => void;
}

const initialData: Context = {
    cells: null,
    clues: null,
    cluesCount: 0,
    errorCount: 0,
    fetch: noop,
    fieldCountByState: {
        [State.NONE]: 0,
        [State.EMPTY]: 0,
        [State.FILLED]: 0,
        [State.MARKED]: 0,
    },
    handleClick: noop,
    handleContextMenu: noop,
    handleKeyDown: noop,
    isLoading: false,
    reset: noop,
};

export const Store = createContext(initialData);

export const useStore = () => useContext(Store);

Store.displayName = 'Store';

interface Props {
    children: ComponentChildren;
}

export const Provider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const solution = useRef<Context['cells']>(null);

    const [cells, setCells] = useState<Context['cells']>(null);
    const [clues, setClues] = useState<Context['clues']>(null);
    const [errorCount, setErrorCount] = useState(0);

    const cluesCount = useMemo(() => {
        if (!clues) {
            return 0;
        }

        return clues.columns.flat().reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);
    }, [clues]);

    const fieldCountByState: Record<State, number> = useMemo(() => {
        const { fieldCountByState } = initialData;

        if (!cells) {
            return fieldCountByState;
        }

        return cells.reduce((previousValue, currentValue) => {
            currentValue.forEach((state) => previousValue[state]++);

            return previousValue;
        }, Object.assign({}, fieldCountByState));
    }, [cells]);

    const fetch = useCallback(() => {
        setIsLoading(true);

        if (
            isNonEmptyArray(example.cells) &&
            isNonEmptyArray(example.cells[0])
        ) {
            solution.current = example.cells;

            setCells(
                Array.from({ length: example.cells.length }, () =>
                    Array<State>(example.cells[0].length).fill(State.NONE)
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

    const mark = useCallback(
        <X extends number, Y extends number>(x: X, y: Y) => {
            if (!cells || !hasIndex(cells, y)) {
                return;
            }

            if (cells[y][x] === State.EMPTY || cells[y][x] === State.FILLED) {
                return;
            }

            const nextCells = cloneDeep(cells);

            nextCells[y][x] =
                nextCells[y][x] === State.NONE ? State.MARKED : State.NONE;

            setCells(nextCells);
        },
        [cells]
    );

    const handleClick = useCallback(
        <X extends number, Y extends number>(event: MouseEvent, x: X, y: Y) => {
            console.log(event);

            const solvedCell = solution.current?.[y]?.[x];

            if (!cells || solvedCell === void 0 || !hasIndex(cells, y)) {
                return;
            }

            const nextCells = cloneDeep(cells);

            const stateToBeSet = event.shiftKey ? State.EMPTY : State.FILLED;

            if (
                stateToBeSet === State.EMPTY &&
                nextCells[y][x] === State.MARKED
            ) {
                return;
            }

            if (solvedCell !== stateToBeSet) {
                setErrorCount(errorCount + 1);
            }

            nextCells[y][x] = solvedCell;

            setCells(nextCells);
        },
        [cells, errorCount]
    );

    const handleContextMenu = useCallback(
        <X extends number, Y extends number>(event: MouseEvent, x: X, y: Y) => {
            event.preventDefault();

            mark(x, y);
        },
        [mark]
    );

    const handleKeyDown = useCallback(
        <X extends number, Y extends number>(
            { code }: KeyboardEvent,
            x: X,
            y: Y
        ) => {
            if (code === 'Period') {
                mark(x, y);
            }
        },
        [mark]
    );

    const reset = useCallback(() => {
        setCells(
            Array.from({ length: example.cells.length }, () =>
                Array<State>(example.cells[0].length).fill(State.EMPTY)
            ) as Context['cells']
        );
    }, []);

    const value: Context = {
        cells,
        clues,
        cluesCount,
        errorCount,
        fetch,
        fieldCountByState,
        handleClick,
        handleContextMenu,
        handleKeyDown,
        isLoading,
        reset,
    };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};
