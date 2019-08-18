import * as _ from 'lodash';

import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../core/Node';
import { InputPort, OutputPort } from '../../../core/Port';
import { Context } from '../../../core/Context';

export interface SineNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface SineNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Applies a sine transformation to the incoming value and assigns the result to the "result" output port
 */
export class SineNode extends Node {
    inputPorts: SineNodeInputPorts;
    outputPorts: SineNodeOutputPorts;

    constructor(context: Context) {
        const props: NodeProps = {
            inputPorts: {
                x: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val)
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0
                }
            }
        };

        super(context, props);
    }

    compute() {
        this.outputPorts.result.value = Math.sin(this.inputPorts.x.value);
    }
}
