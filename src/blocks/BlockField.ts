import * as Blockly from 'blockly/core';

interface BlockCheckTypeMap {
  [key: string]: string;
}

export const blockCheckType : BlockCheckTypeMap = {
  number: "Number",
  string: "String",
  table: "Table",
  array: "Array",
  json: "JSON",
  datetime: "Datetime",
  xrplToken: "XrplToken",
  xrplClient: "Client",
  xrplTxnPayload: "XrplPayload",
  supabaseClient: "supabaseClient",
  notionClient: "notionClient",
}

export function newTitleLabel (fieldName:string) : Blockly.FieldLabel {
  return new Blockly.FieldLabel(fieldName, "title-label");
}

export function newArgsLabel (fieldName:string) : Blockly.FieldLabel {
  return new Blockly.FieldLabel(fieldName, "args-label");
}

export function newOutputLabel (fieldName:string) : Blockly.FieldLabel {
  return new Blockly.FieldLabel(fieldName, "output-label");
}
