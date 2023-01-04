import type { LinariaClassName } from '@linaria/core';
import { css, cx } from '@linaria/core';
import { forwardRef } from 'preact/compat';
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

    :focus {
        border: 0.5rem solid blue;
    }

    :disabled {
        cursor: default;
    }
`;

const cssByState: { [K in State]?: LinariaClassName } = {
    [State.ERROR]: css`
        background-color: red;
    `,
    [State.FILLED]: css`
        background-color: green;
    `,
};

const Cell = forwardRef<HTMLButtonElement, Props>(
    ({ onClick: handleClick, state = State.EMPTY }, ref) => {
        const buttonWithStateCss = cx(buttonCss, cssByState[state]);

        return (
            <button
                class={buttonWithStateCss}
                disabled={state !== State.EMPTY}
                onClick={handleClick}
                ref={ref}
            />
        );
    }
);

export default Cell;
