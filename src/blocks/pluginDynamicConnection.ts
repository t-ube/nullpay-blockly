import { javascriptGenerator, Order } from 'blockly/javascript';

export const defineDynamicListCreate = () => {
  javascriptGenerator.forBlock['dynamic_list_create'] = function (block:any, generator) {
    // Initialize an empty array to store the items
    const elements = [];
    // Iterate over each input and generate the corresponding code
    for (let i = 0; i < block.itemCount; i++) {
      const input = block.getInput(`ADD${i}`);
      const value = generator.valueToCode(block, `ADD${i}`, Order.NONE) || 'null';
      elements.push(value);
    }
    // Join all elements with commas to form the array code
    const code = `[${elements.join(', ')}]`;
    return [code, Order.ATOMIC];
  };
};

export const defineDynamicTextJoin = () => {
  javascriptGenerator.forBlock['dynamic_text_join'] = function (block:any, generator) {
    // Initialize an empty array to store the items
    const elements = [];
    // Iterate over each input and generate the corresponding code
    for (let i = 0; i < block.itemCount; i++) {
      const value = generator.valueToCode(block, `ADD${i}`, Order.NONE) || '""';
      elements.push(value);
    }
    // Join all elements with plus signs to form the string concatenation code
    const code = elements.join(' + ');
    return [code, Order.ADDITION];
  };
};

export const defineDynamicIf = () => {
  javascriptGenerator.forBlock['dynamic_if'] = function (block:any, generator) {
    let n = 0;
    let code = '';
    do {
      const conditionCode = generator.valueToCode(block, `IF${n}`, Order.NONE) || 'false';
      const branchCode = generator.statementToCode(block, `DO${n}`);
      code += (n === 0 ? 'if ' : ' else if ') + `(${conditionCode}) {\n${branchCode}}\n`;
      n++;
    } while (block.getInput(`IF${n}`));

    if (block.getInput('ELSE')) {
      const branchCode = generator.statementToCode(block, 'ELSE');
      code += ` else {\n${branchCode}}\n`;
    }
    return code;
  };
};
