import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { newTitleLabel, newArgsLabel, newOutputLabel } from '@/blocks/BlockField';

// Table Empty
export const defineTableEmptyBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "table_empty",
      "message0": "create empty table",
      "output": "Array",
      "colour": BlockColors.table,
      "tooltip": "Creates an empty table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_empty'] = function(block) {
    const code = '[]';
    return [code, Order.ATOMIC];
  };
};

// CSV to Table
export const defineTextToTableBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "csv_to_table",
      "message0": "CSV to table %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TABLE_TEXT",
          "check": "String"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Exclude header",
          "class": "args-label"
        },
        {
          "type": "field_checkbox",
          "name": "EXCLUDE_HEADER",
          "checked": false
        }
      ],
      "output": null,
      "inputsInline": false,
      "colour": BlockColors.table,
      "tooltip": "Converts the text data to a table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['csv_to_table'] = function (block, generator) {
    const tableText = generator.valueToCode(block, 'TABLE_TEXT', Order.NONE) || '""';
    const excludeHeader = block.getFieldValue('EXCLUDE_HEADER') === 'TRUE';
    let code = `JSON.parse(${tableText})`;
    if (excludeHeader) {
      code = `${code}.slice(1)`;
    }
    return [code, Order.ATOMIC];
  };
};

// Get Column
export const defineTableGetColumnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "table_get_column",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Table column",
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
          "text": "Column # (1 or greater)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "COLUMN",
          "check": "Number"
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Column data (List)",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "columnData"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.table,
      "tooltip": "Returns a list (array) of the specified column from the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_get_column'] = function (block,  generator) {
    const array = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const columnCode = generator.valueToCode(block, 'COLUMN', Order.NONE) || '1';
    const column = parseInt(columnCode, 10);
    if (generator.nameDB_ === undefined) {
      return `tableGetColumn(JSON.stringify(${array}), ${column-1}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `tableGetColumn(JSON.stringify(${array}), ${column-1}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterTableGetColumn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableGetColumn');
  const wrapper = async function (arrayText:string, column:number, variable:any, callback:any) {
    try {
      const array = JSON.parse(arrayText);
      if (array.length === 0 || column < 0 || column >= array[0].length) {
        throw new Error('Column index is out of range');
      }
      const result = array.map((row:any) => row[column]);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
      callback();
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'tableGetColumn', interpreter.createAsyncFunction(wrapper));
}

// Get Row
export const defineTableGetRowBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "table_get_row",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Table row",
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
          "text": "Row # (1 or greater)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ROW",
          "check": "Number"
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Row data (List)",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "rowData"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.table,
      "tooltip": "Returns a list (array) of the specified row from the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_get_row'] = function (block, generator) {
    const tableData = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const rowCode = generator.valueToCode(block, 'ROW', Order.NONE) || '1';
    const row = parseInt(rowCode, 10) - 1; // 1-based to 0-based index
    if (generator.nameDB_ === undefined) {
      return `tableGetRow(JSON.stringify(${tableData}), ${row}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `tableGetRow(JSON.stringify(${tableData}), ${row}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterTableGetRow(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableGetRow');
  const wrapper = async function (arrayText:string, row:number, variable:any, callback:any) {
    try {
      const array = JSON.parse(arrayText);
      if (array.length === 0 || row < 0 || row >= array.length) {
        throw new Error('Row index is out of range');
      }
      const result = array[row];
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(result));
      callback();
    } catch (error) {
      console.error(`Failed to retrieve row: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'tableGetRow', interpreter.createAsyncFunction(wrapper));
}

// Add Row to Table
export const defineTableAddRowBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "table_add_row",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Add row to table",
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
          "text": "Row",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ROW",
          "check": "Array"
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "New Table",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "newTabe"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.table,
      "tooltip": "Adds a row to the end of the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_add_row'] = function (block, generator) {
    const table = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const row = generator.valueToCode(block, 'ROW', Order.NONE) || '[]';
    if (generator.nameDB_ === undefined) {
      return `tableAddRow(JSON.stringify(${table}), JSON.stringify(${row}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `tableAddRow(JSON.stringify(${table}), JSON.stringify(${row}), '${variable}');\n`;
    return code;
  };
};

export function initInterpreterTableAddRow(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableAddRow');
  const wrapper = async function (arrayText:string, rowText:string, variable:any, callback:any) {
    try {
      const table = JSON.parse(arrayText);
      const row = JSON.parse(rowText);
      table.push(row);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(table));
      callback();
    } catch (error) {
      console.error(`Failed to retrieve row: ${error}`);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'tableAddRow', interpreter.createAsyncFunction(wrapper));
}


export const defineTableRowCountBlock = () => {
  Blockly.Blocks['table_row_count'] = {
    init: function () {
      this.appendValueInput("TABLE")
        .setCheck("String")
        .appendField("Row count of table");
      this.setOutput(true, 'Number');
      this.setColour(BlockColors.table);
      this.setTooltip('Returns the number of rows in the table');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['table_row_count'] = function (block, generator) {
    const tableData = generator.valueToCode(block, 'TABLE', Order.NONE) || '""';
    const code = `(JSON.parse(${tableData}).length)`;
    return [code, Order.ATOMIC];
  };
};

