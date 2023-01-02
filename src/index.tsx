import { render } from 'preact';
import App from './App';
import { Provider } from './store';

import 'the-new-css-reset';

const rootElement = document.getElementById('root');

if (rootElement) {
    render(
        <Provider>
            <App />
        </Provider>,
        rootElement
    );
}
