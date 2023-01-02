import type { CSSProperties } from '@linaria/core';
import { styled } from '@linaria/react';
import Cell from './Cell';
import Clues, { Direction } from './Clues';
import type { Picross } from '@/interfaces/Picross';

interface Props extends Picross {
    onClick: (x: number, y: number) => void;
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
    const style = {
        '--column-count': cells[0].length,
        '--row-count': cells.length,
    };

    return (
        <Wrapper style={style}>
            <Clues clues={rows} direction={Direction.ROW} />
            <Clues clues={columns} direction={Direction.COLUMN} />

            {cells.map((row, y) => {
                return row.map((_, x) => {
                    return (
                        <Cell
                            state={cells[y]?.[x]}
                            onClick={() => handleClick(x, y)}
                            key={`${x}-${y}`}
                        />
                    );
                });
            })}
        </Wrapper>
    );
};

export default Grid;
