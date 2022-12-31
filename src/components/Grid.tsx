import type { CSSProperties } from '@linaria/core';
import { styled } from '@linaria/react';
import Cell from './Cell';
import Clues, { Direction } from './Clues';
import example from '@/data/example';

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

const Grid: preact.FunctionalComponent = () => {
    const style = {
        '--column-count': example.cells[0].length,
        '--row-count': example.cells.length,
    };

    return (
        <Wrapper style={style}>
            <Clues clues={example.clues.rows} direction={Direction.ROW} />
            <Clues clues={example.clues.columns} direction={Direction.COLUMN} />
            {example.cells.map((row, i) => {
                return row.map((column, j) => {
                    return <Cell key={`${i}-${j}`} />;
                });
            })}
        </Wrapper>
    );
};

export default Grid;
