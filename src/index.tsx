import React, { Component } from 'react';
import { render } from 'react-dom';

import { NotificationWidget } from './NotificationWidget';
import './NotificationWidget/style/index.css';

import './styles.css';

class App extends Component<any> {
    notificationWidgetRef: React.RefObject<
        NotificationWidget
    > = React.createRef();

    componentDidMount(): void {
        (window as any).NotificationsWidget = this.notificationWidgetRef!.current;
    }

    render() {
        return (
            <div className="App">
                <NotificationWidget
                    ref={this.notificationWidgetRef}
                    dismissDelay={5000}
                />
            </div>
        );
    }
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
