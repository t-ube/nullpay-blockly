import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { newTitleLabel, newArgsLabel, newOutputLabel, blockCheckType } from '@/blocks/BlockField';

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
      "output": blockCheckType.array,
      "inputsInline": false,
      "colour": BlockColors.table,
      "tooltip": "Returns a list (array) of the specified column from the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_get_column'] = function (block,  generator) {
    const array = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const columnCode = generator.valueToCode(block, 'COLUMN', Order.NONE) || '1';
    const column = parseInt(columnCode, 10);
    const code = `tableGetColumn(JSON.stringify(${array}), ${column-1})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTableGetColumn(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableGetColumn');
  const wrapper = function (arrayText:string, column:number) {
    try {
      const array = JSON.parse(arrayText);
      if (array.length === 0 || column < 0 || column >= array[0].length) {
        throw new Error('Column index is out of range');
      }
      const result = array.map((row:any) => row[column]);
      return interpreter.nativeToPseudo(result);
    } catch (error) {
      console.error(`Failed to subscribe: ${error}`);
      return interpreter.nativeToPseudo([]);
    }
  };
  interpreter.setProperty(globalObject, 'tableGetColumn', interpreter.createNativeFunction(wrapper));
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
      "output": blockCheckType.array,
      "inputsInline": false,
      "colour": BlockColors.table,
      "tooltip": "Returns a list (array) of the specified row from the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_get_row'] = function (block, generator) {
    const tableData = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const rowCode = generator.valueToCode(block, 'ROW', Order.NONE) || '1';
    const row = parseInt(rowCode, 10) - 1; // 1-based to 0-based index
    const code = `tableGetRow(JSON.stringify(${tableData}), ${row})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTableGetRow(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableGetRow');
  const wrapper = function (arrayText:string, row:number, variable:any, callback:any) {
    try {
      const array = JSON.parse(arrayText);
      if (array.length === 0 || row < 0 || row >= array.length) {
        throw new Error('Row index is out of range');
      }
      const result = array[row];
      return interpreter.nativeToPseudo(result);
    } catch (error) {
      console.error(`Failed to retrieve row: ${error}`);
      return interpreter.nativeToPseudo([]);
    }
  };
  interpreter.setProperty(globalObject, 'tableGetRow', interpreter.createNativeFunction(wrapper));
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
      "output": blockCheckType.array,
      "inputsInline": false,
      "colour": BlockColors.table,
      "tooltip": "Adds a row to the end of the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_add_row'] = function (block, generator) {
    const table = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const row = generator.valueToCode(block, 'ROW', Order.NONE) || '[]';
    const code = `tableAddRow(JSON.stringify(${table}), JSON.stringify(${row}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTableAddRow(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableAddRow');
  const wrapper = function (arrayText:string, rowText:string) {
    try {
      const table = JSON.parse(arrayText);
      const row = JSON.parse(rowText);
      table.push(row);
      return interpreter.nativeToPseudo(table);
    } catch (error) {
      console.error(`Failed to add row: ${error}`);
      return interpreter.nativeToPseudo([]);
    }
  };
  interpreter.setProperty(globalObject, 'tableAddRow', interpreter.createNativeFunction(wrapper));
}


export const defineTableRowCountBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "table_row_count",
      "message0": "row count of table %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TABLE",
          "check": blockCheckType.array
        }
      ],
      "output": blockCheckType.number,
      "inputsInline": false,
      "colour": BlockColors.table,
      "tooltip": "Returns the number of rows in the table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['table_row_count'] = function (block, generator) {
    const tableData = generator.valueToCode(block, 'TABLE', Order.NONE) || '[]';
    const code = `tableRowCount(JSON.stringify(${tableData}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterTableRowCount(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('tableRowCount');
  const wrapper = function (tableText:string) {
    try {
      const table = JSON.parse(tableText);
      return interpreter.nativeToPseudo(table.length);
    } catch (error) {
      console.error(`Failed to add row: ${error}`);
      return interpreter.nativeToPseudo(0);
    }
  };
  interpreter.setProperty(globalObject, 'tableRowCount', interpreter.createNativeFunction(wrapper));
}
