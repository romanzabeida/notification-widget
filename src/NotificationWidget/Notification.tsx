import React, { Component } from 'react';
import classnames from 'classnames';

type Position = 'tl' | 'tr' | 'br' | 'bl';
type Type = 'alert' | 'info' | 'warning';

interface IProps {
    id: string;
    message: string;
    position: Position;
    type: Type;
    dismissDelay: number;
    notificationTimeoutHandler: (position: Position, id: string) => void;
}

export class Notification extends Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.removeNotification = this.removeNotification.bind(this);
    }

    componentDidMount(): void {
        const timeoutId = setTimeout(() => {
            this.removeNotification();
            clearTimeout(timeoutId);
        }, 5000);
    }

    render() {
        const { type } = this.props;

        const className = classnames('notification', {
            notification_alert: type === 'alert',
            notification_info: type === 'info',
            notification_warning: type === 'warning'
        });

        return <div className={className}>I'm notification</div>;
    }

    private removeNotification(): void {
        this.props.notificationTimeoutHandler(
            this.props.position,
            this.props.id
        );
    }
}
