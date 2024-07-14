import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { ChartModalField } from '@/blocks/chart/ChartModalField';
import {
  generateBidAndAskData,
  convertBitbankDepthToOrderBookData,
  convertBitrueDepthToOrderBookData,
  extractBalancedOrderBook } from '@/blocks/chart/ChartDataHelper';
import { IOrderBookData } from '@/interfaces/IOrderBook';
import { IBitbankDepthResponce } from '@/interfaces/IBitbankAPI';
import { IBitrueDepthResponce } from '@/interfaces/IBitrueAPI';


export const defineChartOrderBookBlock = () => {
  Blockly.Blocks['chart_order_book_block'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Order book Chart')
        .appendField(new ChartModalField('Title'), 'INPUT');
      this.appendValueInput("TITLE")
        .setCheck(blockCheckType.string)
        .appendField("Title");
      this.appendValueInput("PAIR")
        .setCheck(blockCheckType.string)
        .appendField("Pair");
      this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("Bids & Asks");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.chart);
      this.setTooltip('Displays an order book chart with the given title, trading pair, and bid/ask data');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['chart_order_book_block'] = function(block, generator) {
    const title = generator.valueToCode(block, 'TITLE', Order.ATOMIC) || '""';
    const pair = generator.valueToCode(block, 'PAIR', Order.ATOMIC) || '""';
    const data = generator.valueToCode(block, 'DATA', Order.NONE);
    const code = `chartOrderBook('${block.id}', ${title}, ${pair}, JSON.stringify(${data}));\n`;
    return code;
  };
};

async function showChartOrderBook(blockId: string, title: string, pair: string, data: string): Promise<void> {
  const workspace = Blockly.getMainWorkspace();
  const block = workspace.getBlockById(blockId);
  if (block) {
    const field = block.getField('INPUT') as ChartModalField;
    return await field.showModalAtRuntime(data, title, pair);
  }
  return;
}

export function initInterpreterChartOrderBook(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('chartOrderBook');
  const wrapper = function(blockId: string, title: string, pair: string, data: string, callback: (result: void) => void) {
    showChartOrderBook(blockId, title, pair, data).then(result => {
      callback();
    });
  };
  interpreter.setProperty(globalObject, 'chartOrderBook', interpreter.createAsyncFunction(wrapper));
}

export const defineChartRandomOrderBookDataBlock = () => {
  Blockly.Blocks['chart_random_order_book_data'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Random bids & asks");
      this.setOutput(true, "Object");
      this.setColour(BlockColors.chart);
      this.setTooltip('Generates random order book data for use in the order book chart');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['chart_random_order_book_data'] = function(block, generator) {
    const code = `chartRandomOrderBookData()`;
    return [code, Order.NONE];
  };
};

export function initInterpreterChartRandomOrderBookData(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('chartRandomOrderBookData');
  const wrapper = function (jsonText:string, kvArrayText:string) {
    try {
      const json = generateBidAndAskData(10);
      return interpreter.nativeToPseudo(json);
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText},${kvArrayText}`, error);
      return interpreter.nativeToPseudo({});
    }
  };
  interpreter.setProperty(globalObject, 'chartRandomOrderBookData', interpreter.createNativeFunction(wrapper));
}

export const defineChartBitbankDepthToOrderBookBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "chart_bitbank_depth_to_order_book",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_label",
          "text": "Bitbank depth to bids & asks",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "DEPTH",
          "check": blockCheckType.json
        }
      ],
      "output": blockCheckType.json,
      "inputsInline": false,
      "colour": BlockColors.chart,
      "tooltip": "Convert a Bitbank depth to a bids & asks",
      "helpUrl": "Converts a Bitbank depth data structure to the format required for the order book chart"
    }
  ]);

  javascriptGenerator.forBlock['chart_bitbank_depth_to_order_book'] = function (block, generator) {
    const depth = generator.valueToCode(block, 'DEPTH', Order.ATOMIC) || '{}';
    const code = `chartBitbankDepthToOrderBook(JSON.stringify(${depth}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterChartBitbankDepthToOrderBook(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('chartBitbankDepthToOrderBook');
  const wrapper = function (depthText: string) {
    try {
      const json = JSON.parse(depthText) as IBitbankDepthResponce;
      return interpreter.nativeToPseudo(convertBitbankDepthToOrderBookData(json));
    } catch (error) {
      console.error(`Failed to convert: ${depthText}`,error);
      return interpreter.nativeToPseudo(null);
    }
  };
  interpreter.setProperty(globalObject, 'chartBitbankDepthToOrderBook', interpreter.createNativeFunction(wrapper));
}

export const defineChartBitrueDepthToOrderBookBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "chart_bitrue_depth_to_order_book",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_label",
          "text": "Bitrue depth to bids & asks",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "DEPTH",
          "check": blockCheckType.json
        }
      ],
      "output": blockCheckType.json,
      "inputsInline": false,
      "colour": BlockColors.chart,
      "tooltip": "Convert a Bitrue depth to a bids & asks",
      "helpUrl": "Converts a Bitrue depth data structure to the format required for the order book chart"
    }
  ]);

  javascriptGenerator.forBlock['chart_bitrue_depth_to_order_book'] = function (block, generator) {
    const depth = generator.valueToCode(block, 'DEPTH', Order.ATOMIC) || '{}';
    const code = `chartBitrueDepthToOrderBook(JSON.stringify(${depth}))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterChartBitrueDepthToOrderBook(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('chartBitrueDepthToOrderBook');
  const wrapper = function (depthText: string) {
    try {
      const json = JSON.parse(depthText) as IBitrueDepthResponce;
      return interpreter.nativeToPseudo(convertBitrueDepthToOrderBookData(json));
    } catch (error) {
      console.error(`Failed to convert: ${depthText}`,error);
      return interpreter.nativeToPseudo(null);
    }
  };
  interpreter.setProperty(globalObject, 'chartBitrueDepthToOrderBook', interpreter.createNativeFunction(wrapper));
}

export const defineChartextractBalancedOrderBookBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "chart_extract_balanced_order_book",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_label",
          "text": "Extract bids & asks",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "ORDERBOOK",
          "check": blockCheckType.json
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Limit",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "LIMIT",
          "check": blockCheckType.number
        }
      ],
      "output": blockCheckType.json,
      "inputsInline": false,
      "colour": BlockColors.chart,
      "tooltip": "Extract bids & asks",
      "helpUrl": "Extracts the bids and asks from an order book data structure, limiting the number of items per side"
    }
  ]);

  javascriptGenerator.forBlock['chart_extract_balanced_order_book'] = function (block, generator) {
    const orderbook = generator.valueToCode(block, 'ORDERBOOK', Order.ATOMIC) || '{}';
    const limit = generator.valueToCode(block, 'LIMIT', Order.ATOMIC) || 5;
    const code = `chartExtractBalancedOrderBook(JSON.stringify(${orderbook}),${limit})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterChartExtractBalancedOrderBook(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('chartExtractBalancedOrderBook');
  const wrapper = function (orderbookText: string, limit: number) {
    try {
      const json = JSON.parse(orderbookText) as IOrderBookData;
      return interpreter.nativeToPseudo(extractBalancedOrderBook(json, limit));
    } catch (error) {
      console.error(`Failed to convert: ${orderbookText}`,error);
      return interpreter.nativeToPseudo(null);
    }
  };
  interpreter.setProperty(globalObject, 'chartExtractBalancedOrderBook', interpreter.createNativeFunction(wrapper));
}
