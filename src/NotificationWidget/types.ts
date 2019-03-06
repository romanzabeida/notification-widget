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

export interface INotificationWidget {
    show(message: string, position: Position, type: Type): void;
}

export function assertIfEmptyString(message: any): void {
    if (typeof message !== 'string' || !message) {
        throw new Error(`'message' argument should be a non empty string.`);
    }
}

export function assertIfNonPosition(position: any): void {
    const isPosition = [
        Position.TopLeft,
        Position.TopRight,
        Position.BottomRight,
        Position.BottomLeft
    ].includes(position);

    if (!isPosition) {
        throw new Error(
            `'position' argument should be one of '${Position.TopLeft}' | '${
                Position.TopRight
            }' | '${Position.BottomRight}' | '${Position.BottomLeft}'.`
        );
    }
}

export function assertIfNotType(type: any): void {
    const isType = [Type.Alert, Type.Info, Type.Warning].includes(type);

    if (!isType) {
        throw new Error(
            `'type' argument should be one of '${Type.Alert}' | '${
                Type.Info
            }' | '${Type.Warning}'.`
        );
    }
}
