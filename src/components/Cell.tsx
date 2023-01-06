import type { LinariaClassName } from '@linaria/core';
import { css, cx } from '@linaria/core';
import { forwardRef, useCallback, useState } from 'preact/compat';
import colors from '@/colors';

export const enum State {
    EMPTY,
    FILLED,
    NONE,
}

interface Props {
    onClick: (event: MouseEvent) => boolean;
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

const buttonErrorCss = css`
    background-color: red;
`;

const buttonMarkedCss = css`
    background-color: blue;
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
    ({ onClick, onFocus: handleFocus, onKeyDown, state = State.NONE }, ref) => {
        const [isError, setIsError] = useState(false);
        const [isMarked, setIsMarked] = useState(false);

        const buttonWithStateCss = cx(
            buttonCss,
            cssByState[state],
            isError && buttonErrorCss,
            isMarked && buttonMarkedCss
        );

        const handleClick = useCallback(
            (event: MouseEvent) => {
                if (event.shiftKey && isMarked) {
                    return;
                }

                const isValid = onClick(event);

                setIsError(!isValid);
            },
            [isMarked, onClick]
        );

        const handleKeyDown = useCallback(
            (event: KeyboardEvent) => {
                if (event.code === 'Period') {
                    event.preventDefault();

                    setIsMarked(true);

                    return;
                }

                onKeyDown(event);
            },
            [onKeyDown]
        );

        return (
            <button
                class={buttonWithStateCss}
                onClick={handleClick}
                onContextMenu={() => setIsMarked(true)}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                ref={ref}
            />
        );
    }
);

export default Cell;
