import React, { Fragment, PureComponent } from 'react';

import './style/index.css';
import { NotificationComponent } from './Notification';
import { Notification, NotificationPosition, NotificationType } from './types';

type Props = {
    dismissDelay?: number;
};

type State = { [key in NotificationPosition]: Notification[] };

export class NotificationWidget extends PureComponent<Props, State> {
    static defaultProps = {
        dismissDelay: 10000
    };

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            [NotificationPosition.TopLeft]: [],
            [NotificationPosition.TopRight]: [],
            [NotificationPosition.BottomRight]: [],
            [NotificationPosition.BottomLeft]: []
        };

        this.notificationTimeoutHandler = this.notificationTimeoutHandler.bind(
            this
        );
        this.renderNotificationsBlockByPosition = this.renderNotificationsBlockByPosition.bind(
            this
        );
    }

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
                {this.state[position].map(
                    (notification: Notification, idx: number) => (
                        <NotificationComponent
                            notification={notification}
                            key={idx}
                            dismissDelay={
                                this.props.dismissDelay ||
                                NotificationWidget.defaultProps.dismissDelay
                            }
                            notificationTimeoutHandler={
                                this.notificationTimeoutHandler
                            }
                        />
                    )
                )}
            </div>
        );
    }

    private notificationTimeoutHandler(notification: Notification): void {
        const { position } = notification;

        this.setState({
            ...this.state,
            [position]: this.state[position].filter(n => notification !== n)
        });
    }

    private isMessage(message: any): boolean {
        const properType = typeof message === 'string';
        const notEmpty = !!message;

        return properType && notEmpty;
    }

    private isNotificationPosition(position: any): boolean {
        return [
            NotificationPosition.TopLeft,
            NotificationPosition.TopRight,
            NotificationPosition.BottomRight,
            NotificationPosition.BottomLeft
        ].includes(position);
    }

    private isNotificationType(type: any): boolean {
        return [
            NotificationType.Alert,
            NotificationType.Info,
            NotificationType.Warning
        ].includes(type);
    }

    show(
        message: string,
        position: NotificationPosition,
        type: NotificationType
    ): void {
        if (!this.isMessage(message)) {
            throw new Error('`message` argument should be a non empty string.');
        }
        if (!this.isNotificationPosition(position)) {
            throw new Error(
                `'position' argument should be one of '${
                    NotificationPosition.TopLeft
                }' | '${NotificationPosition.TopRight}' | '${
                    NotificationPosition.BottomRight
                }' | '${NotificationPosition.BottomLeft}'.`
            );
        }
        if (!this.isNotificationType(type)) {
            throw new Error(
                `'type' argument should be one of '${
                    NotificationType.Alert
                }' | '${NotificationType.Info}' | '${
                    NotificationType.Warning
                }'.`
            );
        }

        const notification = { message, position, type };
        this.setState({
            ...this.state,
            [position]: [...this.state[position], notification]
        });
    }
}
