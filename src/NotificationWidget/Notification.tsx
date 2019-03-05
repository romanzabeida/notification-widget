import React, { Component } from 'react';
import classnames from 'classnames';

import { Notification, NotificationType } from './types';

export class NotificationComponent extends Component<Notification> {
    render() {
        const { type, id, message } = this.props;

        const className = classnames('notification', {
            notification_alert: type === NotificationType.Alert,
            notification_info: type === NotificationType.Info,
            notification_warning: type === NotificationType.Warning
        });

        return (
            <div className={className}>
                {id} {message}
            </div>
        );
    }
}
