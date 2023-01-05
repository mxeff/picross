import type { CSSProperties } from '@linaria/core';
import { styled } from '@linaria/react';
import type { RefObject } from 'preact';
import { createRef } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';
import Cell from './Cell';
import Clues, { Direction } from './Clues';
import type { Picross } from '@/types/Picross';

interface Props extends Picross {
    onClick: (event: MouseEvent, x: number, y: number) => void;
}

const Wrapper = styled.div<{ style: CSSProperties }>`
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: 1fr repeat(var(--column-count), min-content) 1fr;
    grid-template-rows: 1fr repeat(var(--row-count), min-content) 1fr;

    &::before,
    &::after {
        display: block;
        content: '';
    }

    &::before {
        grid-area: 1 / 1 / 1 / 1;
    }

    &::after {
        grid-area: 1 / -2 / -1 / -1;
    }

    > * {
        margin: 0.2rem;
    }
`;

const Grid = ({
    cells,
    clues: { columns, rows },
    onClick: handleClick,
}: Props) => {
    const {
        length: rowCount,
        0: { length: columnCount },
    } = cells;

    const refs = useMemo(
        () =>
            Array.from<unknown, RefObject<HTMLButtonElement>[]>(
                { length: rowCount },
                () => Array.from({ length: columnCount }, () => createRef())
            ),
        [columnCount, rowCount]
    );

    useEffect(() => {
        refs[0]?.[0]?.current?.focus();
    }, [refs]);

    const style = {
        '--column-count': columnCount,
        '--row-count': rowCount,
    };

    return (
        <Wrapper style={style}>
            <Clues clues={rows} direction={Direction.ROW} />
            <Clues clues={columns} direction={Direction.COLUMN} />

            {cells.map((row, y) =>
                row.map((_, x) => (
                    <Cell
                        key={`${x}-${y}`}
                        ref={refs[y]?.[x]}
                        onClick={(e: MouseEvent) => handleClick(e, x, y)}
                        state={cells[y]?.[x]}
                    />
                ))
            )}
        </Wrapper>
    );
};

export default Grid;
