export enum NotificationPosition {
    TopLeft = 'tl',
    TopRight = 'tr',
    BottomRight = 'br',
    BottomLeft = 'bl'
}

export enum NotificationType {
    Alert = 'alert',
    Info = 'info',
    Warning = 'warning'
}

export type Notification = {
    id: number;
    message: string;
    position: NotificationPosition;
    type: NotificationType;
};

export function isNotEmptyString(message: any): boolean {
    const isString = typeof message === 'string';
    const isNotEmpty = !!message;

    return isString && isNotEmpty;
}

export function isNotificationPosition(position: any): boolean {
    return [
        NotificationPosition.TopLeft,
        NotificationPosition.TopRight,
        NotificationPosition.BottomRight,
        NotificationPosition.BottomLeft
    ].includes(position);
}

export function isNotificationType(type: any): boolean {
    return [
        NotificationType.Alert,
        NotificationType.Info,
        NotificationType.Warning
    ].includes(type);
}
