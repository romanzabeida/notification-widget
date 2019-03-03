import * as React from 'react';
import { render } from 'react-dom';

import { Notification, NotificationWidget } from './NotificationWidget';

function App() {
    return (
        <div className="App">
            <Notification message="msg" position="bl" type="info" />
            <NotificationWidget />
        </div>
    );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
