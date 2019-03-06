import React, { Component } from 'react';
import { render } from 'react-dom';

import { NotificationWidget } from './NotificationWidget';

import './styles.css';

class App extends Component<any> {
    notificationWidgetRef: React.RefObject<
        NotificationWidget
    > = React.createRef();

    componentDidMount(): void {
        (window as any).NotificationWidget = {
            show: this.notificationWidgetRef!.current!.show.bind(
                this.notificationWidgetRef.current
            )
        };
    }

    render() {
        return (
            <div className="App">
                <NotificationWidget
                    ref={this.notificationWidgetRef}
                    dismissDelay={5}
                />
            </div>
        );
    }
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
