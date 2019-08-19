import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from '../../../';

export interface CosineNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface CosineNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Applies a cosine transformation to the incoming value and assigns the result to the "result" output port
 */
export class CosineNode extends Node {
    inputPorts: CosineNodeInputPorts;
    outputPorts: CosineNodeOutputPorts;

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
        this.outputPorts.result.value = Math.cos(this.inputPorts.x.value);
    }
}