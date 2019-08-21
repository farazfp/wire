import * as React from 'react';
import { get } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Connection as _Connection } from 'wire-core';

export interface Position {
    x: number;
    y: number;
}

export interface IConnectionProps {
    fromPosition?: Position;
    toPosition?: Position;
    connection?: _Connection;
    onClick?(): void;
}

const PORT_OFFSET_X = 10;
const PORT_OFFSET_Y = 10;

export const Connection = observer(({ fromPosition, toPosition, connection, onClick }: IConnectionProps) => {
    const [pathString, setPathString] = React.useState('');
    const [fromPos, setFromPos] = React.useState({ x: 0, y: 0 });
    const [toPos, setToPos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if (fromPosition && toPosition) {
            const newFromPos = {
                x: fromPosition.x + PORT_OFFSET_X,
                y: toPosition.y + PORT_OFFSET_Y
            };

            setFromPos(newFromPos);
            setToPos(toPosition);

            setPathString(bezierCurve(newFromPos, toPos));
        } else if (connection) {
            const outputPortPosition = get(connection.fromPort.data, 'position') || { x: 0, y: 0 };
            const inputPortPosition = get(connection.toPort.data, 'position') || { x: 0, y: 0 };

            const newFromPos = {
                x: outputPortPosition.x + PORT_OFFSET_X,
                y: outputPortPosition.y + PORT_OFFSET_Y
            };

            const newToPos = {
                x: inputPortPosition.x - PORT_OFFSET_X,
                y: inputPortPosition.y + PORT_OFFSET_Y
            };

            setFromPos(newFromPos);
            setToPos(newToPos);

            setPathString(bezierCurve(newFromPos, newToPos));
        }
    });

    let strokeColor;

    if (connection) {
        if (!connection.isValid) {
            strokeColor = '#ff4444';
        } else {
            strokeColor = '#444';
        }
    } else {
        strokeColor = '#fff';
    }

    return (
        <g>
            <path
                className="connector"
                d={pathString}
                fill="none"
                strokeWidth="2"
                stroke={strokeColor}
                onClick={onClick}
            />
            <path
                className="port"
                d={`M${fromPos.x},${fromPos.y},${fromPos.x + 2},${fromPos.y}`}
                fill="none"
                strokeWidth="10"
                stroke="#0044ff"
            />
            <path
                className="port"
                d={`M${toPos.x - 2},${toPos.y},${toPos.x},${toPos.y}`}
                fill="none"
                strokeWidth="10"
                stroke="#0044ff"
            />
        </g>
    );
});

const bezierCurve = (start: Position, end: Position) => {
    let x1 = start.x;
    let y1 = start.y;
    let x4 = end.x;
    let y4 = end.y;
    let min_diff = 42;
    let diffx = Math.max(min_diff, x4 - x1);
    let diffy = Math.max(min_diff, y4 - y1);

    let x2 = x1 + diffx * 0.5;
    let y2 = y1;
    let x3 = x4 - diffx * 0.5;
    let y3 = y4;

    return `M${x1.toFixed(3)},${y1.toFixed(3)} C${x2},${y2} ${x3},${y3}  ${x4.toFixed(3)},${y4.toFixed(3)}`;
};
