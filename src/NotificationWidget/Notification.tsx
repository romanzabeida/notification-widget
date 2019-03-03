import * as React from 'react';

type Position = 'tl' | 'tr' | 'br' | 'bl';
type Type = 'alert' | 'info' | 'warning';

interface IProps {
    message: string;
    position: Position;
    type: Type;
}

export class Notification extends React.Component<IProps> {
    render() {
        return <div>I'm notification</div>;
    }
}
