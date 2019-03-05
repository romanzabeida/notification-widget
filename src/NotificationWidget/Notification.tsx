import React, { Component } from 'react';
import classnames from 'classnames';

import { Notification, Type } from './types';

export class NotificationComponent extends Component<Notification> {
    render() {
        const { type, id, message } = this.props;

        const className = classnames('notification', {
            notification_alert: type === Type.Alert,
            notification_info: type === Type.Info,
            notification_warning: type === Type.Warning
        });

        return (
            <div className={className}>
                {id} {message}
            </div>
        );
    }
}
