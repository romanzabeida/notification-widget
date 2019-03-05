import React, { Fragment, PureComponent } from 'react';

import './style/index.css';
import { NotificationComponent } from './Notification';
import {
    Notification,
    Position,
    Type,
    isNotEmptyString,
    isNotificationPosition,
    isNotificationType
} from './types';

export const DismissDelay = 10; // seconds
const milliseconds = 1000;

type Props = {
    dismissDelay?: number;
};

type State = { [key in Position]: Notification[] };

export class NotificationWidget extends PureComponent<Props, State> {
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
        if (!isNotEmptyString(message)) {
            throw new Error(`'message' argument should be a non empty string.`);
        }
        if (!isNotificationPosition(position)) {
            throw new Error(
                `'position' argument should be one of '${
                    Position.TopLeft
                }' | '${Position.TopRight}' | '${Position.BottomRight}' | '${
                    Position.BottomLeft
                }'.`
            );
        }
        if (!isNotificationType(type)) {
            throw new Error(
                `'type' argument should be one of '${Type.Alert}' | '${
                    Type.Info
                }' | '${Type.Warning}'.`
            );
        }

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
