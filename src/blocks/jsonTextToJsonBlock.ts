import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '../utils/BlockColors';

export const defineJsonTextToJsonBlock = () => {
    Blockly.Blocks['text_to_json'] = {
        init: function () {
        this.appendValueInput("TEXT")
            .setCheck('String')
            .appendField("Convert text to JSON");
        this.setOutput(true, 'String');
        this.setColour(BlockColors.json);
        this.setTooltip('Convert a plain text to a JSON string');
        this.setHelpUrl('');
        }
    };

    javascriptGenerator.forBlock['text_to_json'] = function (block, generator) {
        const textInput = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
        const code = `JSON.parse(${textInput})`;
        return [code, Order.ATOMIC];
    };
};
