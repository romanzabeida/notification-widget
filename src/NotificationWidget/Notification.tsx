import React, { Component } from 'react';
import classnames from 'classnames';

type Position = 'tl' | 'tr' | 'br' | 'bl';
type Type = 'alert' | 'info' | 'warning';

interface IProps {
    id: string;
    message: string;
    position: Position;
    type: Type;
    notificationTimeout?: (position: Position, id: string) => void;
}

export class Notification extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this._removeNotification = this._removeNotification.bind(this);
    }

    componentDidMount(): void {
        setTimeout(this._removeNotification, 5000);
    }

    render() {
        const { type, id } = this.props;

        const className = classnames('notification', {
            notification_alert: type === 'alert',
            notification_info: type === 'info',
            notification_warning: type === 'warning'
        });

        return <div className={className}>I'm notification {id}</div>;
    }

    _removeNotification(): void {
        if (this.props.notificationTimeout) {
            this.props.notificationTimeout(this.props.position, this.props.id);
        }
    }
}
