import React, { Fragment, PureComponent } from 'react';

import './style/index.css';
import { NotificationComponent } from './Notification';
import {
    Notification,
    Position,
    Type,
    INotificationWidget,
    assertIfEmptyString,
    assertIfNonPosition,
    assertIfNotType
} from './types';

export const DismissDelay = 10; // seconds
const milliseconds = 1000;

type Props = {
    dismissDelay?: number;
};

type State = { [key in Position]: Notification[] };

export class NotificationWidget extends PureComponent<Props, State>
    implements INotificationWidget {
    static defaultProps = {
        dismissDelay: DismissDelay
    };

    state: State = {
        [Position.TopLeft]: [],
        [Position.TopRight]: [],
        [Position.BottomRight]: [],
        [Position.BottomLeft]: []
    };

    render(): React.ReactElement {
        return (
            <Fragment>
                {this.renderNotificationsBlockByPosition(Position.TopLeft)}
                {this.renderNotificationsBlockByPosition(Position.TopRight)}
                {this.renderNotificationsBlockByPosition(Position.BottomRight)}
                {this.renderNotificationsBlockByPosition(Position.BottomLeft)}
            </Fragment>
        );
    }

    private renderNotificationsBlockByPosition(
        position: Position
    ): React.ReactElement {
        return (
            <div
                className={`notification-container notification-container_${position}`}
            >
                {this.state[position].map((notification: Notification) => (
                    <NotificationComponent
                        {...notification}
                        key={notification.id}
                    />
                ))}
            </div>
        );
    }

    private notificationTimeoutHandler(position: Position, id: number): void {
        this.setState({
            ...this.state,
            [position]: this.state[position].filter(
                notification => notification.id !== id
            )
        });
    }

    show(message: string, position: Position, type: Type): void {
        assertIfEmptyString(message);
        assertIfNonPosition(position);
        assertIfNotType(type);

        const id: number = window.setTimeout(
            () => this.notificationTimeoutHandler(position, id),
            (this.props.dismissDelay ||
                NotificationWidget.defaultProps.dismissDelay) * milliseconds
        );
        const notification = { id, message, position, type };
        this.setState({
            ...this.state,
            [position]: [...this.state[position], notification]
        });
    }
}
