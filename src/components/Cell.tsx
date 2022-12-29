import { css } from '@linaria/core';

export const enum State {
    EMPTY,
    FILLED,
    MARKED,
}

const cellCss = css`
    display: block;
    cursor: pointer;
    background-color: #eee;
    width: 4rem;
    height: 4rem;
`;

const Cell = () => {
    return <button class={cellCss} />;
};

export default Cell;
