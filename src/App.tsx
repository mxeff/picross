import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import Footer from './components/Footer';
import Grid from './components/Grid';

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
    return (
        <Wrapper>
            <Main>
                <Grid />
            </Main>
            <Footer />
        </Wrapper>
    );
};

export default App;
