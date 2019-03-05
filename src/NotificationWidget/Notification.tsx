import React, { Component } from 'react';
import classnames from 'classnames';

import { Notification, NotificationType } from './types';

type Props = {
    notification: Notification;
    dismissDelay: number;
    notificationTimeoutHandler: (notification: Notification) => void;
};

export class NotificationComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.removeNotification = this.removeNotification.bind(this);
    }

    componentDidMount(): void {
        const timeoutId = setTimeout(() => {
            this.removeNotification();
            clearTimeout(timeoutId);
        }, this.props.dismissDelay);
    }

    render() {
        const { type } = this.props.notification;

        const className = classnames('notification', {
            notification_alert: type === NotificationType.Alert,
            notification_info: type === NotificationType.Info,
            notification_warning: type === NotificationType.Warning
        });

        return <div className={className}>I'm notification</div>;
    }

    private removeNotification(): void {
        this.props.notificationTimeoutHandler(this.props.notification);
    }
}
