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
    dismissDelay: number;
}

interface IState {
    notifications: { [key in NotificationPosition]: Notification[] };
}

export class NotificationWidget extends PureComponent<IProps, IState> {
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
    }

    render(): React.ReactElement {
        return (
            <Fragment>
                <div className="notification-container notification-container_tl">
                    <NotificationComponent
                        id="1"
                        message="msg"
                        position="bl"
                        type="info"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="2"
                        message="msg"
                        position="bl"
                        type="warning"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="3"
                        message="msg"
                        position="bl"
                        type="alert"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                </div>
                <div className="notification-container notification-container_tr">
                    <NotificationComponent
                        id="1"
                        message="msg"
                        position="bl"
                        type="info"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="2"
                        message="msg"
                        position="bl"
                        type="warning"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="3"
                        message="msg"
                        position="bl"
                        type="alert"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                </div>
                <div className="notification-container notification-container_br">
                    <NotificationComponent
                        id="1"
                        message="msg"
                        position="bl"
                        type="info"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="2"
                        message="msg"
                        position="bl"
                        type="warning"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="3"
                        message="msg"
                        position="bl"
                        type="alert"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                </div>
                <div className="notification-container notification-container_bl">
                    <NotificationComponent
                        id="1"
                        message="msg"
                        position="bl"
                        type="info"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="2"
                        message="msg"
                        position="bl"
                        type="warning"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                    <NotificationComponent
                        id="3"
                        message="msg"
                        position="bl"
                        type="alert"
                        notificationTimeout={this._notificationTimeoutHandler}
                    />
                </div>
            </Fragment>
        );
    }

    show(
        message: string,
        position: NotificationPosition,
        type: NotificationType
    ): string {
        const id = uuid();
        // Sorry guys, I wasn't able to conquer TS error: Element implicitly has an 'any' type because type '{ tl: Notification[]; tr: Notification[]; br: Notification[]; bl: Notification[]; }' has no index signature.
        // @ts-ignore
        const inStateNotifications = this.state.notifications[type];
        const notification = { id, message, position, type };
        const notifications = {
            ...inStateNotifications,
            [type]: [...inStateNotifications, notification]
        };
        this.setState({ notifications });

        return id;
    }

    _notificationTimeoutHandler(
        position: NotificationPosition,
        id: string
    ): void {
        console.log(id);
    }
}
