import type { LinariaClassName } from '@linaria/core';
import { css, cx } from '@linaria/core';
import { forwardRef } from 'preact/compat';
import colors from '@/colors';

export const enum State {
    EMPTY,
    FILLED,
    NONE,
}

interface Props {
    onClick: (event: MouseEvent) => void;
    onFocus: () => void;
    onKeyDown: (event: KeyboardEvent) => void;
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
    [State.EMPTY]: css`
        opacity: 0.5;
    `,
    [State.FILLED]: css`
        background-color: green;
    `,
};

const Cell = forwardRef<HTMLButtonElement, Props>(
    (
        {
            onClick: handleClick,
            onFocus: handleFocus,
            onKeyDown: handleKeyDown,
            state = State.NONE,
        },
        ref
    ) => {
        const buttonWithStateCss = cx(buttonCss, cssByState[state]);

        return (
            <button
                class={buttonWithStateCss}
                onClick={handleClick}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                ref={ref}
            />
        );
    }
);

export default Cell;
