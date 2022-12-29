import { css } from '@linaria/core';
import example from '../data/example';
import Cell from './Cell';

const gridCss = css`
    display: inline-grid;
    grid-template-columns: auto repeat(var(--column-count), 1fr);
    grid-template-rows: auto repeat(var(--row-count), 1fr);

    &::before {
        display: block;
        content: '';
    }

    > * {
        margin: 0.3rem;
    }
`;

const cluesRowCss = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 2rem;
    font-family: 'Fira Code', monospace;
    line-height: 1;
    grid-column: 1;
    min-width: 10rem;
`;

const cluesColumnsCss = css`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 2rem;
    font-family: 'Fira Code', monospace;
    line-height: 1;
    grid-row: 1;
    min-height: 10rem;
    border-radius: 0.4rem;
`;

const Grid: preact.FunctionalComponent = () => {
    const style = {
        '--column-count': example.cells[0].length,
        '--row-count': example.cells.length,
    };

    return (
        <div class={gridCss} style={style}>
            {example.clues.rows.map((clues, i) => (
                <div class={cluesRowCss} style={{ gridRow: i + 2 }} key={i}>
                    {clues.map((clue, j) => (
                        <span key={`${i}-${j}`}>{clue}</span>
                    ))}
                </div>
            ))}
            {example.clues.columns.map((clues, i) => (
                <div
                    class={cluesColumnsCss}
                    style={{ gridColumn: i + 2 }}
                    key={i}
                >
                    {clues.map((clue, j) => (
                        <span key={`${i}-${j}`}>{clue}</span>
                    ))}
                </div>
            ))}
            {example.cells.map((row, i) => {
                return row.map((column, j) => {
                    return <Cell key={`${i}-${j}`} />;
                });
            })}
        </div>
    );
};

export default Grid;
