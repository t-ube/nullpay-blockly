import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { FieldTable } from '@/blocks/table/TableField';
import { BlockColors } from '@/blocks/BlockColors';

export const defineCsvBlock = () => {
  Blockly.Blocks['table_input_csv'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('CSV')
        .appendField(new FieldTable([['', ''], ['', '']]), 'TABLE');
      this.setOutput(true, 'String');
      this.setColour(BlockColors.table);
      this.setTooltip('Input a table of values');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['table_input_csv'] = function (block, generator) {
    const tableField = block.getField('TABLE') as FieldTable;
    const table = tableField.getValue();
    return [JSON.stringify(table), Order.ATOMIC];
  };
};

export const defineCSVSaveBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "table_csv_save",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Save to CSV",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Table",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TABLE",
          "check": "Array"
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "File name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILENAME",
          "check": "String"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.table,
      "tooltip": "Saves the data as a CSV file",
      "helpUrl": ""
    }
  ]);

  // JavaScript code generator for the CSV save block
  javascriptGenerator.forBlock['table_csv_save'] = function(block, generator) {
    const table = generator.valueToCode(block, 'TABLE', Order.NONE) || [];
    const filename = generator.valueToCode(block, 'FILENAME', Order.NONE) || 'data.csv';
    return `tableSaveAsCSV(JSON.stringify(${table}), ${filename});\n`;
  };
};

function arrayToCSV(array: any[][]): string {
  return array.map(row => row.join(',')).join('\n');
}

// Function to trigger CSV download
function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Function to save data as CSV
function saveAsCSV(arrayText: string, filename: string) {
  const array = JSON.parse(arrayText);
  const csv = arrayToCSV(array);
  downloadCSV(csv, filename);
}

// Registering the saveAsCSV function with the interpreter
export function initInterpreterTableCSVSave(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('tableSaveAsCSV');
  const wrapper = async function(arrayText: string, filename: string, callback: any) {
    saveAsCSV(arrayText, filename);
    callback();
  };
  interpreter.setProperty(globalObject, 'tableSaveAsCSV', interpreter.createAsyncFunction(wrapper));
}
