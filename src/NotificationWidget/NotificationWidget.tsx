import React, { Fragment, PureComponent } from 'react';

import './style/index.css';
import { DismissDelay } from './constants';
import { NotificationComponent } from './Notification';
import {
    Notification,
    NotificationPosition,
    NotificationType,
    isNotEmptyString,
    isNotificationPosition,
    isNotificationType
} from './types';

type Props = {
    dismissDelay?: number;
};

type State = { [key in NotificationPosition]: Notification[] };

export class NotificationWidget extends PureComponent<Props, State> {
    static defaultProps = {
        dismissDelay: DismissDelay
    };

    state: State = {
        [NotificationPosition.TopLeft]: [],
        [NotificationPosition.TopRight]: [],
        [NotificationPosition.BottomRight]: [],
        [NotificationPosition.BottomLeft]: []
    };

    render(): React.ReactElement {
        return (
            <Fragment>
                {this.renderNotificationsBlockByPosition(
                    NotificationPosition.TopLeft
                )}
                {this.renderNotificationsBlockByPosition(
                    NotificationPosition.TopRight
                )}
                {this.renderNotificationsBlockByPosition(
                    NotificationPosition.BottomRight
                )}
                {this.renderNotificationsBlockByPosition(
                    NotificationPosition.BottomLeft
                )}
            </Fragment>
        );
    }

    private renderNotificationsBlockByPosition(
        position: NotificationPosition
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

    private notificationTimeoutHandler(
        position: NotificationPosition,
        id: number
    ): void {
        this.setState({
            ...this.state,
            [position]: this.state[position].filter(
                notification => notification.id !== id
            )
        });
    }

    show(
        message: string,
        position: NotificationPosition,
        type: NotificationType
    ): void {
        if (!isNotEmptyString(message)) {
            throw new Error(`'message' argument should be a non empty string.`);
        }
        if (!isNotificationPosition(position)) {
            throw new Error(
                `'position' argument should be one of '${
                    NotificationPosition.TopLeft
                }' | '${NotificationPosition.TopRight}' | '${
                    NotificationPosition.BottomRight
                }' | '${NotificationPosition.BottomLeft}'.`
            );
        }
        if (!isNotificationType(type)) {
            throw new Error(
                `'type' argument should be one of '${
                    NotificationType.Alert
                }' | '${NotificationType.Info}' | '${
                    NotificationType.Warning
                }'.`
            );
        }

        const id: number = setTimeout(
            () => this.notificationTimeoutHandler(position, id),
            this.props.dismissDelay
        );
        const notification = { id, message, position, type };
        this.setState({
            ...this.state,
            [position]: [...this.state[position], notification]
        });
    }
}
