import { css } from '@linaria/core';
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

const appCss = css`
    display: grid;
    grid-template-rows: auto min-content;
    min-height: 100vh;
`;

const mainCss = css`
    align-self: center;
    justify-self: center;
`;

const App = () => {
    return (
        <div class={appCss}>
            <main class={mainCss}>
                <Grid />
            </main>
            <Footer />
        </div>
    );
};

export default App;
