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
    message: string;
    position: NotificationPosition;
    type: NotificationType;
};
