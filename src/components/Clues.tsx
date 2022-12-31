import { css, cx } from '@linaria/core';
import type { Clue } from '@/interfaces/Picross';

export const enum Direction {
    COLUMN,
    ROW,
}

interface Props {
    clues: Clue[];
    direction: Direction;
}

const cluesCss = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 2rem;
    font-family: 'Fira Code', monospace;
    line-height: 1;
`;

const columnCss = css`
    flex-flow: column;
    grid-row: 1;
    min-height: 10rem;
`;

const rowCss = css`
    grid-column: 1;
    min-width: 10rem;
`;

const Clues = ({ clues, direction }: Props) => {
    const cluesWithDirectionCss = cx(
        cluesCss,
        direction === Direction.COLUMN ? columnCss : rowCss
    );

    return (
        <>
            {clues.map((clues, i) => (
                <div class={cluesWithDirectionCss} key={i}>
                    {clues.map((clue, j) => (
                        <span key={`${i}-${j}`}>{clue}</span>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Clues;
