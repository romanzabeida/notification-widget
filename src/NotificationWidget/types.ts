export enum Position {
    TopLeft = 'tl',
    TopRight = 'tr',
    BottomRight = 'br',
    BottomLeft = 'bl'
}

export enum Type {
    Alert = 'alert',
    Info = 'info',
    Warning = 'warning'
}

export type Notification = {
    id: number;
    message: string;
    position: Position;
    type: Type;
};

export function isNotEmptyString(message: any): boolean {
    const isString = typeof message === 'string';
    const isNotEmpty = !!message;

    return isString && isNotEmpty;
}

export function isNotificationPosition(position: any): boolean {
    return [
        Position.TopLeft,
        Position.TopRight,
        Position.BottomRight,
        Position.BottomLeft
    ].includes(position);
}

export function isNotificationType(type: any): boolean {
    return [Type.Alert, Type.Info, Type.Warning].includes(type);
}
