import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { useContext, useEffect } from 'preact/hooks';
import Footer from './components/Footer';
import Grid from './components/Grid';
import { Store } from './store';

css`
    :global() {
        html {
            font-size: 62.5%;
        }

        body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 1.6rem;
        }
    }
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto min-content;
    min-height: 100vh;
`;

const Main = styled.main`
    align-self: center;
    justify-self: center;
`;

const App = () => {
    const { cells, clues, fetch, solve } = useContext(Store);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fetch?.(), []);

    const handleClick = (x: number, y: number) => {
        solve?.(x, y);
    };

    return (
        <Wrapper>
            <Main>
                {cells && clues && (
                    <Grid cells={cells} clues={clues} onClick={handleClick} />
                )}
            </Main>
            <Footer />
        </Wrapper>
    );
};

export default App;
