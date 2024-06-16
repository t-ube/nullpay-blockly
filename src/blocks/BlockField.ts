import * as Blockly from 'blockly/core';


export function newTitleLabel (fieldName:string) : Blockly.FieldLabel {
  return new Blockly.FieldLabel(fieldName, "title-label");
}

export function newArgsLabel (fieldName:string) : Blockly.FieldLabel {
  return new Blockly.FieldLabel(fieldName, "args-label");
}

export function newOutputLabel (fieldName:string) : Blockly.FieldLabel {
  return new Blockly.FieldLabel(fieldName, "output-label");
}
