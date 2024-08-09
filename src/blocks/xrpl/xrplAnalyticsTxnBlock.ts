import {
  AccountTxTransaction,
  AccountLinesTrustline,
  IssuedCurrencyAmount,
  TransactionMetadataBase,
  isCreatedNode,
  isModifiedNode,
  isDeletedNode,
  Node as XrplNode,
  Amount,
  Payment,
  OfferCreate
} from 'xrpl';
import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';


export const xrpl_read_txn_info : any = {
  "type": "xrpl_read_txn_info",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Read transaction info",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Transaction (validated)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "TRANSACTION_JSON",
      "check": blockCheckType.json
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Transaction type",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "TRANSACTION_TYPE",
      "variable": "transactionType"
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "ACCOUNT",
      "variable": "account"
    }
  ],
  "message4": "%1 %2",
  "args4": [
    {
      "type": "field_label",
      "text": "Ledger index",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "LEDGER_INDEX",
      "variable": "ledgerIndex"
    }
  ],
  "message5": "%1 %2",
  "args5": [
    {
      "type": "field_label",
      "text": "Hash",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "HASH",
      "variable": "hash"
    }
  ],
  "message6": "%1 %2",
  "args6": [
    {
      "type": "field_label",
      "text": "Date (Ripple epoch)",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "AMOUNT_DATE",
      "variable": "date"
    }
  ],
  "output": blockCheckType.boolean,
  "colour": BlockColors.xrpl,
  "tooltip": "Retrieve transaction information and store it in separate variables",
  "helpUrl": ""
};

export const defineXrplGetTxnInfoBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_read_txn_info
  ]);

  javascriptGenerator.forBlock['xrpl_read_txn_info'] = function(block, generator) {
    const transactionJson = generator.valueToCode(block, 'TRANSACTION_JSON', Order.NONE) || '{}';
    if (generator.nameDB_ === undefined) {
      return `xrplGetTxnInfo(JSON.stringify(${transactionJson}),'','','','','')`;
    }
    const typeVar = generator.nameDB_.getName(block.getFieldValue('TRANSACTION_TYPE'), Blockly.VARIABLE_CATEGORY_NAME);
    const accountVar = generator.nameDB_.getName(block.getFieldValue('ACCOUNT'), Blockly.VARIABLE_CATEGORY_NAME);
    const indexVar = generator.nameDB_.getName(block.getFieldValue('LEDGER_INDEX'), Blockly.VARIABLE_CATEGORY_NAME);
    const hashVar = generator.nameDB_.getName(block.getFieldValue('HASH'), Blockly.VARIABLE_CATEGORY_NAME);
    const dateVar = generator.nameDB_.getName(block.getFieldValue('AMOUNT_DATE'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplGetTxnInfo(JSON.stringify(${transactionJson}),'${typeVar}','${accountVar}','${indexVar}','${hashVar}','${dateVar}')`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplGetTxnInfoBlock(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplGetTxnInfo');
  const wrapper = function (jsonText:string,typeVar:any,accountVar:any,indexVar:any,hashVar:any,dateVar:any) {
    try {
      const json = JSON.parse(jsonText);
      if (!json.ledger_index) {
        throw new Error('Not found ledger_index');
      }

      let txn = null;
      if (json.transaction) {
        // subscribe txn
        txn = json.transaction;
      } else {
        // tx command
        txn = json;
      }

      if (txn.NetworkID && txn.NetworkID === 21337) {
        // Xahau network
      }

      interpreter.setProperty(globalObject, typeVar, interpreter.nativeToPseudo(txn.TransactionType || ''));
      interpreter.setProperty(globalObject, accountVar, interpreter.nativeToPseudo(txn.Account || ''));
      interpreter.setProperty(globalObject, indexVar, interpreter.nativeToPseudo(json.ledger_index));
      interpreter.setProperty(globalObject, hashVar, interpreter.nativeToPseudo(txn.hash || ''));
      interpreter.setProperty(globalObject, dateVar, interpreter.nativeToPseudo(txn.date || ''));
      return interpreter.nativeToPseudo(true);
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText}`);
      return interpreter.nativeToPseudo(false);
    }
  };
  interpreter.setProperty(globalObject, 'xrplGetTxnInfo', interpreter.createNativeFunction(wrapper));
}


export const xrpl_extract_offer_create_txn : any = {
  "type": "xrpl_extract_offer_create_txn",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Extract offer create transaction",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Transaction (validated)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "TRANSACTION_JSON",
      "check": blockCheckType.json
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "Account address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "ACCOUNT_ADDRESS",
      "check": blockCheckType.string
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Extracted data",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "EXTRACTED_DATA",
      "variable": "extractedData"
    }
  ],
  "output": blockCheckType.boolean,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Extract and process the OfferCreate transaction payload into separate variables",
  "helpUrl": ""
};

export const defineXrplExtractOfferCreateTxnBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_extract_offer_create_txn
  ]);

  javascriptGenerator.forBlock['xrpl_extract_offer_create_txn'] = function(block, generator) {
    const transactionJson = generator.valueToCode(block, 'TRANSACTION_JSON', Order.NONE) || '{}';
    const account = generator.valueToCode(block, 'ACCOUNT_ADDRESS', Order.NONE) || '""';
    if (generator.nameDB_ === undefined) {
      return `xrplExtractOfferCreateTxn(JSON.stringify(${transactionJson}),'')`;
    }
    const parsedVar = generator.nameDB_.getName(block.getFieldValue('EXTRACTED_DATA'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xrplExtractOfferCreateTxn(JSON.stringify(${transactionJson}),${account},'${parsedVar}')`;
    return [code, Order.ATOMIC];
  };
};

const getNodeAmountValue = (node: XrplNode, field: string, nativeCurrency:string): IssuedCurrencyAmount | null => {
  let prevValue = 0;
  let finalValue = 0;
  let currency = '';
  let issuer = '';

  if (isCreatedNode(node) &&
    node.CreatedNode.LedgerEntryType === 'RippleState' &&
    node.CreatedNode.NewFields !== undefined &&
    node.CreatedNode.NewFields[field] !== undefined) {
    const newValue = node.CreatedNode.NewFields[field];
    if (typeof newValue === 'object') {
      const amount = newValue as IssuedCurrencyAmount;
      finalValue = Number(amount.value);
      currency = amount.currency;
      issuer = amount.issuer;
    } else {
      finalValue = Number(newValue);
    }
  } else if (isModifiedNode(node) &&
    node.ModifiedNode.PreviousFields !== undefined &&
    node.ModifiedNode.FinalFields !== undefined &&
    node.ModifiedNode.PreviousFields[field] !== undefined &&
    node.ModifiedNode.FinalFields[field] !== undefined
  ) {
    const prevValueField = node.ModifiedNode.PreviousFields[field];
    const finalValueField = node.ModifiedNode.FinalFields[field];

    if (typeof prevValueField === 'object') {
      const amountPrev = prevValueField as IssuedCurrencyAmount;
      prevValue = Number(amountPrev.value);
      currency = amountPrev.currency;
      issuer = amountPrev.issuer;
    } else {
      prevValue = Number(prevValueField);
    }
    if (typeof finalValueField === 'object') {
      const amountFinal = finalValueField as IssuedCurrencyAmount;
      finalValue = Number(amountFinal.value);
      currency = amountFinal.currency;
      issuer = amountFinal.issuer;
    } else {
      finalValue = Number(finalValueField);
    }
  } else if (isDeletedNode(node) &&
    node.DeletedNode.PreviousFields !== undefined &&
    node.DeletedNode.FinalFields !== undefined &&
    node.DeletedNode.PreviousFields[field] !== undefined &&
    node.DeletedNode.FinalFields[field] !== undefined
  ) {
    const prevValueField = node.DeletedNode.PreviousFields[field];
    const finalValueField = node.DeletedNode.FinalFields[field];
    if (typeof prevValueField === 'object') {
      const amountPrev = prevValueField as IssuedCurrencyAmount;
      prevValue = Number(amountPrev.value);
      currency = amountPrev.currency;
      issuer = amountPrev.issuer;
    } else {
      prevValue = Number(prevValueField);
    }
    if (typeof finalValueField === 'object') {
      const amountFinal = finalValueField as IssuedCurrencyAmount;
      finalValue = Number(amountFinal.value);
      currency = amountFinal.currency;
      issuer = amountFinal.issuer;
    } else {
      finalValue = Number(finalValueField);
    }
  }

  if ((finalValue - prevValue) === 0)
    return null;

  if (currency && issuer) {
    return copyAndModifyAmount({ currency, issuer, value: '0' }, finalValue - prevValue);
  }

  return copyAndModifyAmount({ currency: nativeCurrency, issuer, value: '0' }, finalValue - prevValue);
};

const copyAndModifyAmount = (amount: IssuedCurrencyAmount, newValue: number): IssuedCurrencyAmount => {
  return {
    ...amount,
    value: newValue.toString()
  };
};

export function initInterpreterXrplExtractOfferCreateTxnBlock(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xrplExtractOfferCreateTxn');
  const wrapper = function (jsonText:string, account:string, parsedVar:any) {
    try {
      const json = JSON.parse(jsonText);

      let txn = null;
      if (json.transaction) {
        // subscribe txn
        txn = json.transaction as OfferCreate;
      } else {
        // tx command
        txn = json as OfferCreate;
      }

      if (txn.TransactionType !== 'OfferCreate') {
        throw new Error('Not OfferCreate');
      }

      let nativeCurrency = 'XRP';
      if (txn.NetworkID && txn.NetworkID === 21337) {
        // Xahau network
        nativeCurrency = 'XAH';
      }

      const txAccountAmounts = {
        Account: txn.Account,
        Counterparty: '',
        AmountReceived: {},
        AmountPaid: {},
        AmountReceiveOffer: {},
        AmountPayOffer: {},
      };

      const txOtherAmounts = {
        Account: '',
        AmountReceived: {},
        AmountPaid: {}
      };

      if (typeof txn.TakerGets === 'string') {
        const issuer = '';
        txAccountAmounts.AmountPayOffer = copyAndModifyAmount({ currency: nativeCurrency, issuer, value: '0' }, Number(txn.TakerGets));
      } else {
        txAccountAmounts.AmountPayOffer = txn.TakerGets;
      }

      if (typeof txn.TakerPays === 'string') {
        const issuer = '';
        txAccountAmounts.AmountReceiveOffer = copyAndModifyAmount({ currency: nativeCurrency, issuer, value: '0' }, Number(txn.TakerPays));
      } else {
        txAccountAmounts.AmountReceiveOffer = txn.TakerPays;
      }

      const meta = json.meta as TransactionMetadataBase;
      if (meta && meta.AffectedNodes && meta.AffectedNodes.length) {
        for (const node of meta.AffectedNodes) {
          if (isCreatedNode(node) &&
          node.CreatedNode.NewFields.Account) {
            
            const gets:any = getNodeAmountValue(node, 'TakerGets', nativeCurrency);
            const pays:any = getNodeAmountValue(node, 'TakerPays', nativeCurrency);
            if (gets != null && pays != null) {
              if (node.CreatedNode.NewFields.Account !== txn.Account) {
                txOtherAmounts.Account = node.CreatedNode.NewFields.Account as string;
                txOtherAmounts.AmountReceived = copyAndModifyAmount(pays, -1 * Number(pays.value));
                txOtherAmounts.AmountPaid = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txAccountAmounts.Counterparty = node.CreatedNode.NewFields.Account as string;
                txAccountAmounts.AmountReceived = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txAccountAmounts.AmountPaid = copyAndModifyAmount(pays, -1 * Number(pays.value));
              } else {
                txAccountAmounts.AmountReceived = copyAndModifyAmount(pays, -1 * Number(pays.value));
                txAccountAmounts.AmountPaid = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txOtherAmounts.AmountReceived = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txOtherAmounts.AmountPaid = copyAndModifyAmount(pays, -1 * Number(pays.value));
              }
            }
          } else if (isModifiedNode(node) &&
            node.ModifiedNode.FinalFields?.Account !== undefined &&
            node.ModifiedNode.PreviousFields &&
            ((txn.Account === account) || (isModifiedNode(node) && node.ModifiedNode.FinalFields?.Account === account))
          ) {
            // Dexではフィールドのアカウントが主体
            // TakerGets = MakerPays であり、アカウントが支払った通貨
            // TakerPays = MakerGets であり、アカウントが受け取った通貨
            // アカウントが主体であるが、客体の金額も入っている
            // const Balance:any = getNodeAmountValue(node, 'Balance');
            const gets:any = getNodeAmountValue(node, 'TakerGets', nativeCurrency);
            const pays:any = getNodeAmountValue(node, 'TakerPays', nativeCurrency);
            if (gets != null && pays != null) {
              if (node.ModifiedNode.FinalFields?.Account !== txn.Account) {
                txOtherAmounts.Account = node.ModifiedNode.FinalFields.Account as string;
                txOtherAmounts.AmountReceived = copyAndModifyAmount(pays, -1 * Number(pays.value));
                txOtherAmounts.AmountPaid = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txAccountAmounts.Counterparty = node.ModifiedNode.FinalFields.Account as string;
                txAccountAmounts.AmountReceived = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txAccountAmounts.AmountPaid = copyAndModifyAmount(pays, -1 * Number(pays.value));
              } else {
                txAccountAmounts.AmountReceived = copyAndModifyAmount(pays, -1 * Number(pays.value));
                txAccountAmounts.AmountPaid = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txOtherAmounts.AmountReceived = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txOtherAmounts.AmountPaid = copyAndModifyAmount(pays, -1 * Number(pays.value));
              }
            }
          } else if (isDeletedNode(node) &&
            node.DeletedNode.FinalFields.Account &&
            node.DeletedNode.PreviousFields &&
            ((txn.Account === account) || (isDeletedNode(node) && node.DeletedNode.FinalFields?.Account === account))
          ) {
            //const Balance:any = getNodeAmountValue(node, 'Balance');
            const gets:any = getNodeAmountValue(node, 'TakerGets', nativeCurrency);
            const pays:any = getNodeAmountValue(node, 'TakerPays', nativeCurrency);
            if (gets != null && pays != null) {
              if (node.DeletedNode.FinalFields.Account !== txn.Account) {
                txOtherAmounts.Account = node.DeletedNode.FinalFields.Account as string;
                txOtherAmounts.AmountReceived = copyAndModifyAmount(pays, -1 * Number(pays.value));
                txOtherAmounts.AmountPaid = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txAccountAmounts.Counterparty = node.DeletedNode.FinalFields.Account as string;
                txAccountAmounts.AmountReceived = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txAccountAmounts.AmountPaid = copyAndModifyAmount(pays, -1 * Number(pays.value));
              } else {
                txAccountAmounts.AmountReceived = copyAndModifyAmount(pays, -1 * Number(pays.value));
                txAccountAmounts.AmountPaid = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txOtherAmounts.AmountReceived = copyAndModifyAmount(gets, -1 * Number(gets.value));
                txOtherAmounts.AmountPaid = copyAndModifyAmount(pays, -1 * Number(pays.value));
              }
            }
          }
        }
      }
      interpreter.setProperty(globalObject, parsedVar, interpreter.nativeToPseudo(txAccountAmounts));
      return interpreter.nativeToPseudo(true);
    } catch (error) {
      console.error(`Failed to extract json: ${jsonText}`);
      return interpreter.nativeToPseudo(false);
    }
  };
  interpreter.setProperty(globalObject, 'xrplExtractOfferCreateTxn', interpreter.createNativeFunction(wrapper));
}
