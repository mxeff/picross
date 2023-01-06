import type { ComponentChildren, RefObject } from 'preact';
import { createRef } from 'preact';
import { useCallback, useEffect, useMemo, useRef } from 'preact/hooks';

interface ChildrenProps<T extends HTMLElement> {
    handleFocus: (x: number, y: number) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    refs: RefObject<T>[][];
}

interface Props<T extends HTMLElement> {
    children: (props: ChildrenProps<T>) => ComponentChildren;
    columnCount: number;
    rowCount: number;
}

const FocusableGrid = <T extends HTMLElement>({
    children,
    columnCount,
    rowCount,
}: Props<T>) => {
    const refs = useMemo(
        () =>
            Array.from<unknown, RefObject<T>[]>({ length: rowCount }, () =>
                Array.from({ length: columnCount }, () => createRef())
            ),
        [columnCount, rowCount]
    );

    useEffect(() => {
        refs[0]?.[0]?.current?.focus();
    }, [refs]);

    const currentFocus = useRef<[number, number]>([0, 0]);

    const handleFocus = useCallback((x: number, y: number) => {
        currentFocus.current = [x, y];
    }, []);

    const handleKeyDown = useCallback(
        ({ code }: KeyboardEvent) => {
            let [x, y] = currentFocus.current;

            switch (code) {
                case 'ArrowUp':
                    y--;

                    break;

                case 'ArrowRight':
                    x++;

                    break;
                case 'ArrowDown':
                    y++;

                    break;

                case 'ArrowLeft':
                    x--;
            }

            refs[y]?.[x]?.current?.focus();
        },
        [refs]
    );

    return <>{children({ handleFocus, handleKeyDown, refs })}</>;
};

export default FocusableGrid;
