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
