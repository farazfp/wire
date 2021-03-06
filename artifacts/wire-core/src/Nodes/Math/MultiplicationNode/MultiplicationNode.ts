import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface MultiplicationNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface MultiplicationNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Multiplies input values and assigns the result to the "result" output port
 */
export class MultiplicationNode extends Node {
    inputPorts: MultiplicationNodeInputPorts;
    outputPorts: MultiplicationNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                a: {
                    defaultValue: 1,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'A'
                    }
                },
                b: {
                    defaultValue: 1,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'B'
                    }
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 1,
                    data: {
                        name: 'Result'
                    }
                }
            },
            data: {
                name: 'Multiplication'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        const values: number[] = Object.values(this.inputPorts).map(ip => ip.value);
        const result: number = values.reduce((acc: number, val: number) => acc * val);

        this.outputPorts.result.value = result;
    }
}
