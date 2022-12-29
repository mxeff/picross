import { render } from 'preact';
import App from './App';

import 'the-new-css-reset';

const rootElement = document.getElementById('root');

if (rootElement) {
    render(<App />, rootElement);
}
