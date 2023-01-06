import type { CSSProperties } from '@linaria/core';
import { styled } from '@linaria/react';
import Cell from './Cell';
import Clues, { Direction } from './Clues';
import FocusableGrid from './FocusableGrid';
import type { Picross } from '@/types/Picross';

interface Props extends Picross {
    onClick: (event: MouseEvent, x: number, y: number) => void;
    onContextMenu: (event: MouseEvent, x: number, y: number) => void;
    onKeyDown: (event: KeyboardEvent, x: number, y: number) => void;
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
    clues,
    onClick: handleClick,
    onContextMenu: handleContextMenu,
    onKeyDown: handleGridKeyDown,
}: Props) => {
    const {
        length: rowCount,
        0: { length: columnCount },
    } = cells;

    const style = {
        '--column-count': columnCount,
        '--row-count': rowCount,
    };

    return (
        <Wrapper style={style}>
            <Clues clues={clues.rows} direction={Direction.ROW} />
            <Clues clues={clues.columns} direction={Direction.COLUMN} />

            <FocusableGrid<HTMLButtonElement>
                columnCount={columnCount}
                rowCount={rowCount}
            >
                {({ handleFocus, handleKeyDown, refs }) =>
                    cells.map((row, y) =>
                        row.map((state, x) => (
                            <Cell
                                key={`${x}-${y}`}
                                onClick={(event: MouseEvent) =>
                                    handleClick(event, x, y)
                                }
                                onContextMenu={(event: MouseEvent) => {
                                    handleContextMenu(event, x, y);
                                }}
                                onFocus={() => handleFocus(x, y)}
                                onKeyDown={(event: KeyboardEvent) => {
                                    handleKeyDown(event);
                                    handleGridKeyDown(event, x, y);
                                }}
                                ref={refs[y]?.[x]}
                                state={state}
                            />
                        ))
                    )
                }
            </FocusableGrid>
        </Wrapper>
    );
};

export default Grid;
