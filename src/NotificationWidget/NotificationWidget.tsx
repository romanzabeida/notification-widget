import React, { PureComponent, Fragment } from 'react';
import { v4 as uuid } from 'uuid';

import { Notification as NotificationComponent } from './Notification';

type NotificationPosition = 'tl' | 'tr' | 'br' | 'bl';
type NotificationType = 'alert' | 'info' | 'warning';
type Notification = {
    id: string;
    message: string;
    position: NotificationPosition;
    type: NotificationType;
};

interface IProps {
    dismissDelay?: number;
}

interface IState {
    notifications: { [key in NotificationPosition]: Notification[] };
}

export class NotificationWidget extends PureComponent<IProps, IState> {
    static defaultProps = {
        dismissDelay: 10000
    };

    constructor(props: IProps, state: IState) {
        super(props, state);

        this.state = {
            notifications: {
                tl: [],
                tr: [],
                br: [],
                bl: []
            }
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
                {this.renderNotificationsBlockByPosition('tl')}
                {this.renderNotificationsBlockByPosition('tr')}
                {this.renderNotificationsBlockByPosition('br')}
                {this.renderNotificationsBlockByPosition('bl')}
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
                {this.state.notifications[position].map(
                    (notification: Notification) => (
                        <NotificationComponent
                            {...notification}
                            key={notification.id}
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

    private notificationTimeoutHandler(
        position: NotificationPosition,
        id: string
    ): void {
        const inStateNotifications = this.state.notifications;
        const inStateNotificationsByPosition = inStateNotifications[position];
        const notifications = {
            ...inStateNotifications,
            [position]: inStateNotificationsByPosition.filter(
                notification => notification.id !== id
            )
        };
        this.setState({ notifications });
    }

    private isMessage(message: any): boolean {
        const properType = typeof message === 'string';
        const notEmpty = !!message;

        return properType && notEmpty;
    }

    private isNotificationPosition(position: any): boolean {
        return ['tl', 'tr', 'br', 'bl'].includes(position);
    }

    private isNotificationType(type: any): boolean {
        return ['alert', 'info', 'warning'].includes(type);
    }

    show(
        message: string,
        position: NotificationPosition,
        type: NotificationType
    ): string {
        if (!this.isMessage(message)) {
            throw new Error('`message` argument should be a non empty string.');
        }
        if (!this.isNotificationPosition(position)) {
            throw new Error(
                '`position` argument should be one of `tl` `tr` `br` `bl`.'
            );
        }
        if (!this.isNotificationType(type)) {
            throw new Error(
                '`type` argument should be one of `alert` `info` `warning`.'
            );
        }

        const id = uuid();
        const inStateNotifications = this.state.notifications;
        const inStateNotificationsByPosition = inStateNotifications[position];
        const notification = { id, message, position, type };
        const notifications = {
            ...inStateNotifications,
            [position]: [...inStateNotificationsByPosition, notification]
        };
        this.setState({ notifications });

        return id;
    }
}
