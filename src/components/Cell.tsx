import type { LinariaClassName } from '@linaria/core';
import { css, cx } from '@linaria/core';
import colors from '@/colors';

export const enum State {
    EMPTY,
    FILLED,
    MARKED,
    ERROR,
}

interface Props {
    onClick: () => void;
    state?: State;
}

const buttonCss = css`
    display: block;
    cursor: pointer;
    background-color: ${colors.gallery};
    width: 4rem;
    height: 4rem;
`;

const cssByState: { [K in State]?: LinariaClassName } = {
    [State.ERROR]: css`
        background-color: red;
    `,
    [State.FILLED]: css`
        background-color: green;
    `,
};

const Cell = ({ onClick: handleClick, state = State.EMPTY }: Props) => {
    const buttonWithStateCss = cx(buttonCss, cssByState[state]);

    return <button class={buttonWithStateCss} onClick={handleClick} />;
};

export default Cell;
