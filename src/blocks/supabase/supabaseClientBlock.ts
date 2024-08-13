import { createClient } from '@supabase/supabase-js';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { supabaseClientInstances, getSupabaseClient } from '@/blocks/supabase/supabaseClient';



// Define the block for Supabase 
export const defineSupabaseCreateClientBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "supabase_create_client",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Supabase client",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Supabase URL",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SUPABASE_URL",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Anon key",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ANON_KEY",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Supabase client",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "SUPABASE_CLIENT",
          "variable": "supabaseClient"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.supabase,
      "tooltip": "Create a Supabase client using the specified URL and anon key",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['supabase_create_client'] = function(block, generator) {
    const url = generator.valueToCode(block, 'SUPABASE_URL', Order.NONE) || '""';
    const key = generator.valueToCode(block, 'ANON_KEY', Order.NONE) || '""';
    if (generator.nameDB_ === undefined) {
      return `supabaseCreateClient(${url},${key}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('SUPABASE_CLIENT'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `supabaseCreateClient(${url},${key},'${variable}');\n`;
    return code;
  };
};

export function initInterpreterSupabaseCreateClient(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('supabaseCreateClient');
  const wrapper = async function (url: string, key: string, variable:any, callback:any) {
    try {
      const supabase = createClient(url, key);
      supabaseClientInstances[variable] = supabase;
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(variable));
      console.log('Supabase Client initialized:', variable);
      callback();
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'supabaseCreateClient', interpreter.createAsyncFunction(wrapper));
}

export const defineSupabaseInsertBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "supabase_insert",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Supabase insert",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Supabase client",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SUPABASE_CLIENT",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Table name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TABLE_NAME",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Records (JSON)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "INSERT_RECORDS_JSON",
          "check": blockCheckType.json
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "IS_ERROR",
          "variable": "isError"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.supabase,
      "tooltip": "Insert data into a specified table in Supabase",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['supabase_insert'] = function(block, generator) {
    const client = generator.valueToCode(block, 'SUPABASE_CLIENT', Order.NONE) || '""';
    const table = generator.valueToCode(block, 'TABLE_NAME', Order.NONE) || '""';
    const data = generator.valueToCode(block, 'INSERT_RECORDS_JSON', Order.NONE) || {};
    if (generator.nameDB_ === undefined) {
      return `supabaseInsert(${client},${table},JSON.stringify(${data}), '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `supabaseInsert(${client},${table},JSON.stringify(${data}),'${variable}');\n`;
    return code;
  };
};

// Supabase Insert
export function initInterpreterSupabaseInsert(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('supabaseInsert');
  const wrapper = async function (clientKey:string, table:string, insertData:string, variable:any, callback:any) {
    try {
      const supabase = getSupabaseClient(clientKey);
      const parseData = JSON.parse(insertData);
      let arrayData = [];
      if (parseData.length === 0) {
        arrayData.push(parseData);
      } else {
        arrayData = parseData;
      }
      const { error } = await supabase.from(table).insert(arrayData);
      if (error) {
        throw new Error('Supabase inserting data:', error);
      }
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(false));
      callback();
    } catch (error) {
      console.error(`${error}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(true));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'supabaseInsert', interpreter.createAsyncFunction(wrapper));
}

// Supabase Select
export const defineSupabaseSelectBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "supabase_select",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Supabase select",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Supabase client",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SUPABASE_CLIENT",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Table name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TABLE_NAME",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Columns",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "COLUMNS",
          "check": blockCheckType.string
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "Filter column",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILTER_COLUMN",
          "check": blockCheckType.string
        }
      ],
      "message5": "%1 %2",
      "args5": [
        {
          "type": "field_label",
          "text": "Filter Operator",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "FILTER_OPERATOR",
          "options": [
            ["Equal to", "eq"],
            ["Greater than", "gt"],
            ["Less than", "lt"],
            ["Greater than or equal to", "gte"],
            ["Less than or equal to", "lte"],
            ["Case sensitive", "like"],
            ["Case insensitive", "ilike"],
            ["Is null", "is"],
            ["In array", "in"],
            ["Not equal to", "neq"],
            ["Array contains", "contains"],
            ["Contained by array", "containedBy"],
            ["Greater than a range", "rangeGt"],
            ["Greater than or equal to a range", "rangeGte"],
            ["Less than a range", "rangeLt"],
            ["Less than or equal to a range", "rangeLte"],
            ["Mutually exclusive to a range", "rangeAdjacent"]
          ]
        }
      ],
      "message6": "%1 %2",
      "args6": [
        {
          "type": "field_label",
          "text": "Filter value",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILTER_VALUE",
          "check": blockCheckType.string
        }
      ],
      "message7": "%1 %2",
      "args7": [
        {
          "type": "field_label",
          "text": "Selected data",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "SELECTED_DATA",
          "variable": "selectedData"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.supabase,
      "tooltip": "Select data from a Supabase table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['supabase_select'] = function(block, generator) {
    const client = generator.valueToCode(block, 'SUPABASE_CLIENT', Order.NONE) || '""';
    const table = generator.valueToCode(block, 'TABLE_NAME', Order.NONE) || '""';
    const columns = generator.valueToCode(block, 'COLUMNS', Order.NONE) || '"*"';
    const filterColumn = generator.valueToCode(block, 'FILTER_COLUMN', Order.NONE) || '""';
    const condition = block.getFieldValue('FILTER_OPERATOR');
    let filterValue = generator.valueToCode(block, 'FILTER_VALUE', Order.NONE) || '""';
    if (condition === 'is') {
      filterValue = `'null'`; // Is null condition
    }
    if (generator.nameDB_ === undefined) {
      return `supabaseSelect(${client}, ${table}, ${columns}, ${filterColumn}, '${condition}', ${filterValue}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('SELECTED_DATA'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `supabaseSelect(${client}, ${table}, ${columns}, ${filterColumn}, '${condition}', ${filterValue}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterSupabaseSelect(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('supabaseSelect');
  const wrapper = async function (clientKey:string, table:string, columns:string,
     filterColumn:string, condition:string, filterValue:string, variable:any, callback:any) {
    try {
      const supabase = getSupabaseClient(clientKey);
      let query = supabase.from(table).select(columns);
      console.log(filterValue);
      if (filterColumn && condition && filterValue) {
        if (condition === 'in' || condition === 'contains' || condition === 'containedBy') {
          filterValue = JSON.parse(filterValue);
        }
        query = query[condition](filterColumn, filterValue);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error('Supabase select error:', error);
      }
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(data));
      callback();
    } catch (error) {
      console.error(`${error}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(null));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'supabaseSelect', interpreter.createAsyncFunction(wrapper));
}

export const defineSupabaseUpdateBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "supabase_update",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Supabase update",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Supabase client",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SUPABASE_CLIENT",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Table name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TABLE_NAME",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Update Fields (JSON)",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "UPDATE_FIELDS_JSON",
          "check": blockCheckType.json
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "Filter column",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILTER_COLUMN",
          "check": blockCheckType.string
        }
      ],
      "message5": "%1 %2",
      "args5": [
        {
          "type": "field_label",
          "text": "Filter Operator",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "FILTER_OPERATOR",
          "options": [
            ["Equal to", "eq"],
            ["Greater than", "gt"],
            ["Less than", "lt"],
            ["Greater than or equal to", "gte"],
            ["Less than or equal to", "lte"],
            ["Case sensitive", "like"],
            ["Case insensitive", "ilike"],
            ["Is null", "is"],
            ["In array", "in"],
            ["Not equal to", "neq"],
            ["Array contains", "contains"],
            ["Contained by array", "containedBy"],
            ["Greater than a range", "rangeGt"],
            ["Greater than or equal to a range", "rangeGte"],
            ["Less than a range", "rangeLt"],
            ["Less than or equal to a range", "rangeLte"],
            ["Mutually exclusive to a range", "rangeAdjacent"]
          ]
        }
      ],
      "message6": "%1 %2",
      "args6": [
        {
          "type": "field_label",
          "text": "Filter value",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILTER_VALUE",
          "check": blockCheckType.string
        }
      ],
      "message7": "%1 %2",
      "args7": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "IS_ERROR",
          "variable": "isError"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.supabase,
      "tooltip": "Update data in a Supabase table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['supabase_update'] = function(block, generator) {
    const client = generator.valueToCode(block, 'SUPABASE_CLIENT', Order.NONE) || '""';
    const table = generator.valueToCode(block, 'TABLE_NAME', Order.NONE) || '""';
    const data = generator.valueToCode(block, 'UPDATE_FIELDS_JSON', Order.NONE) || {};
    const filterColumn = generator.valueToCode(block, 'FILTER_COLUMN', Order.NONE) || '""';
    const condition = block.getFieldValue('FILTER_OPERATOR');
    let filterValue = generator.valueToCode(block, 'FILTER_VALUE', Order.NONE) || '""';

    if (condition === 'in' || condition === 'contains' || condition === 'containedBy') {
      filterValue = `JSON.parse(${filterValue})`;
    } else if (condition === 'is') {
      filterValue = `'null'`; // Is null condition
    } else {
      filterValue = `${filterValue}`;
    }
    console.log(filterValue);
    if (generator.nameDB_ === undefined) {
      return `supabaseUpdate(${client}, ${table}, JSON.stringify(${data}), ${filterColumn}, '${condition}', ${filterValue}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `supabaseUpdate(${client}, ${table}, JSON.stringify(${data}), ${filterColumn}, '${condition}', ${filterValue}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterSupabaseUpdate(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('supabaseUpdate');
  const wrapper = async function (clientKey:string, table:string, updateData:string,
    filterColumn:string, condition:string, filterValue:string, variable:any, callback:any) {
    try {
      const parseData = JSON.parse(updateData);
      const supabase = getSupabaseClient(clientKey);
      let query = supabase.from(table).update(parseData);

      if (filterColumn && condition && filterValue) {
        console.log(filterValue);
        if (condition === 'in' || condition === 'contains' || condition === 'containedBy') {
          filterValue = JSON.parse(filterValue);
        }
        query = query[condition](filterColumn, filterValue);
      }

      const { error } = await query;
      if (error) {
        throw new Error(`Supabase update error: ${error.message}`);
      }
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(false));
      callback();
    } catch (error) {
      console.error(`Supabase update error: ${error}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(true));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'supabaseUpdate', interpreter.createAsyncFunction(wrapper));
}


export const defineSupabaseDeleteBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "supabase_delete",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Supabase delete",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Supabase client",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "SUPABASE_CLIENT",
          "check": blockCheckType.string
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "Table name",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "TABLE_NAME",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "Filter column",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILTER_COLUMN",
          "check": blockCheckType.string
        }
      ],
      "message4": "%1 %2",
      "args4": [
        {
          "type": "field_label",
          "text": "Filter Operator",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "FILTER_OPERATOR",
          "options": [
            ["Equal to", "eq"],
            ["Greater than", "gt"],
            ["Less than", "lt"],
            ["Greater than or equal to", "gte"],
            ["Less than or equal to", "lte"],
            ["Case sensitive", "like"],
            ["Case insensitive", "ilike"],
            ["Is null", "is"],
            ["In array", "in"],
            ["Not equal to", "neq"],
            ["Array contains", "contains"],
            ["Contained by array", "containedBy"],
            ["Greater than a range", "rangeGt"],
            ["Greater than or equal to a range", "rangeGte"],
            ["Less than a range", "rangeLt"],
            ["Less than or equal to a range", "rangeLte"],
            ["Mutually exclusive to a range", "rangeAdjacent"]
          ]
        }
      ],
      "message5": "%1 %2",
      "args5": [
        {
          "type": "field_label",
          "text": "Filter value",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "FILTER_VALUE",
          "check": blockCheckType.string
        }
      ],
      "message6": "%1 %2",
      "args6": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "IS_ERROR",
          "variable": "isError"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.supabase,
      "tooltip": "Delete data from a Supabase table",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['supabase_delete'] = function(block, generator) {
    const client = generator.valueToCode(block, 'SUPABASE_CLIENT', Order.NONE) || '""';
    const table = generator.valueToCode(block, 'TABLE_NAME', Order.NONE) || '""';
    const filterColumn = generator.valueToCode(block, 'FILTER_COLUMN', Order.NONE) || '""';
    const condition = block.getFieldValue('FILTER_OPERATOR');
    let filterValue = generator.valueToCode(block, 'FILTER_VALUE', Order.NONE) || '""';

    if (condition === 'in' || condition === 'contains' || condition === 'containedBy') {
      filterValue = `JSON.parse(${filterValue})`;
    }else if (condition === 'is') {
      filterValue = `'null'`; // Is null condition
    } else {
      filterValue = `${filterValue}`;
    }
    if (generator.nameDB_ === undefined) {
      return `supabaseDelete(${client}, ${table}, ${filterColumn}, '${condition}', ${filterValue}, '');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('IS_ERROR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `supabaseDelete(${client}, ${table}, ${filterColumn}, '${condition}', ${filterValue}, '${variable}');\n`;
    return code;
  };
};

export function initInterpreterSupabaseDelete(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('supabaseDelete');
  const wrapper = async function (clientKey:string, table:string,
    filterColumn:string, condition:string, filterValue:string, variable:any, callback:any) {
    try {
      const supabase = getSupabaseClient(clientKey);
      let query = supabase.from(table).delete();

      if (filterColumn && condition && filterValue) {
        if (condition === 'in' || condition === 'contains' || condition === 'containedBy') {
          filterValue = JSON.parse(filterValue);
        }
        query = query[condition](filterColumn, filterValue);
      }

      const { data, error } = await query;
      if (error) {
        throw new Error(`Supabase delete error: ${error.message}`);
      }
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(false));
      callback();
    } catch (error) {
      console.error(`Supabase delete error: ${error}`);
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(true));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'supabaseDelete', interpreter.createAsyncFunction(wrapper));
}
