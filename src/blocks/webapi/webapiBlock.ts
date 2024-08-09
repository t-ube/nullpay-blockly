import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';
import { getBlockSuccess, getBlockError } from '@/blocks/BlockResult';
import '@/blocks/webapi/webapiHeaders';
import '@/blocks/webapi/webapiUrlParameters';

// Define the block for WebAPI 
export const defineWebApiRequestBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "webapi_request",
      "message0": "%1",
      "args0": [
        {
          "type": "field_label",
          "text": "Web API Request",
          "class": "title-label"
        }
      ],
      "message1": "%1 %2",
      "args1": [
        {
          "type": "field_label",
          "text": "Method",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "METHOD",
          "options": [
            ["POST", "POST"],
            ["PUT", "PUT"],
            ["GET", "GET"],
            ["DELETE", "DELETE"],
            ["HEAD", "HEAD"],
            ["OPTIONS", "OPTIONS"],
            ["PATCH", "PATCH"]
          ]
        }
      ],
      "message2": "%1 %2",
      "args2": [
        {
          "type": "field_label",
          "text": "URL",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "URL",
          "check": blockCheckType.string
        }
      ],
      "message3": "%1 %2",
      "args3": [
        {
          "type": "field_label",
          "text": "HTTP Headers",
          "class": "args-label"
        },
        {
          "type": "input_value",
          "name": "HEADERS",
          "check": blockCheckType.webapiHeaders
        }
      ],
      "message4": "%1 %2 %3",
      "args4": [
        {
          "type": "field_label",
          "text": "Body",
          "class": "args-label"
        },
        {
          "type": "field_dropdown",
          "name": "BODY_FORMAT",
          "options": [
            ["None", "none"],
            ["JSON", "json"],
            ["URL-encoded", "urlencoded"],
            ["Text", "text"]
          ]
        },
        {
          "type": "input_value",
          "name": "BODY",
          "check": null
        }
      ],
      "message5": "%1 %2 %3",
      "args5": [
        {
          "type": "field_label",
          "text": "Result",
          "class": "output-label"
        },
        {
          "type": "field_variable",
          "name": "STATUS",
          "variable": "status"
        },
        {
          "type": "field_variable",
          "name": "RESPONSE",
          "variable": "response"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": BlockColors.webapi,
      "tooltip": "Sends a Web API request and stores the response in a variable",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['webapi_request'] = function(block, generator) {
    const method = block.getFieldValue('METHOD');
    const bodyFormat = block.getFieldValue('BODY_FORMAT');
    const url = generator.valueToCode(block, 'URL', Order.NONE) || '""';
    const headers = generator.valueToCode(block, 'HEADERS', Order.NONE) || '[]';
    const body = generator.valueToCode(block, 'BODY', Order.NONE) || '{}';

    let bodyPayload;
    switch (bodyFormat) {
      case 'none':
        bodyPayload = `""`;
        break;
      case 'json':
        bodyPayload = `JSON.stringify(${body})`;
        break;
      case 'urlencoded':
        bodyPayload = `${body}`;
        break;
      case 'text':
        bodyPayload = `${body}`;
        break;
      default:
        bodyPayload = `""`;
    }

    if (generator.nameDB_ === undefined) {
      return `webapiRequest("${method}",${url},${headers},${body},"${bodyFormat}",'','');\n`;
    }
    const status = generator.nameDB_.getName(block.getFieldValue('STATUS'), Blockly.VARIABLE_CATEGORY_NAME);
    const response = generator.nameDB_.getName(block.getFieldValue('RESPONSE'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `webapiRequest("${method}",${url},JSON.stringify(${headers}),"${bodyFormat}",${bodyPayload},'${status}','${response}');\n`;
    return code;
  };
};

export function initInterpreterWebApiRequest(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('webapiRequest');
  const wrapper = async function (method: string, url: string, headersText: string, bodyFormat: string, bodyText: string,
    statusVar:any, responseVar:any, callback:any) {
    try {
      let dataPayload: { url: string; method: string; headers?: Record<string, string>; body?: string } = {
        url: url,
        method: method
      };
      if (headersText !== '[]') {
        const headers = JSON.parse(headersText);
        let singleHeader = Object.assign({}, ...headers);
        dataPayload.headers = singleHeader;
      }
      if (bodyFormat !== 'none' && bodyText !== '{}') {
        switch (bodyFormat) {
          case 'json':
            dataPayload.body = JSON.parse(bodyText);
            dataPayload.headers = { ...dataPayload.headers, "Content-Type": "application/json" };
            break;
          case 'urlencoded':
            dataPayload.body = bodyText;
            dataPayload.headers = { ...dataPayload.headers, "Content-Type": "application/x-www-form-urlencoded" };
            break;
          case 'text':
            dataPayload.body = bodyText;
            dataPayload.headers = { ...dataPayload.headers, "Content-Type": "text/plain" };
            break;
          default:
            dataPayload.body = '';
        }
      }
      const payload = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataPayload)
      };
      const response = await fetch('/api/proxy/', payload);
      const responseJson = await response.json();
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockSuccess()));
      interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(responseJson));
      callback();
    } catch (error) {
      console.error('Failed to request:', error);
      interpreter.setProperty(globalObject, statusVar, interpreter.nativeToPseudo(getBlockError(`${error}`)));
      interpreter.setProperty(globalObject, responseVar, interpreter.nativeToPseudo(undefined));
      callback();
    }
  };
  interpreter.setProperty(globalObject, 'webapiRequest', interpreter.createAsyncFunction(wrapper));
}

export const defineDynamicWebApiHeadersBlock = () => {
  javascriptGenerator.forBlock['dynamic_webapi_headers'] = function (block:any, generator) {
    let elements = [];
    for (let i = 0; i < block.itemCount; i++) {
      const value = generator.valueToCode(block, `ADD${i}`, Order.NONE) || 'null';
      if (value !== 'null')
        elements.push(value);
    }
    const code = `[${elements.join(',')}]`;
    return [code, Order.ATOMIC];
  };
};

export const defineWebApiHeaderBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "webapi_header",
      "message0": "Header Key-Value %1:%2",
      "args0": [
        {
          "type": "input_value",
          "name": "KEY",
          "check": blockCheckType.string
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": null
        }
      ],
      "inputsInline": true,
      "output": blockCheckType.jsonKv,
      "colour": BlockColors.webapi,
      "tooltip": "Create a single HTTP header key-value pair",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['webapi_header'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '""';
    const valueCode:string | null = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || null;
    let outputValue:any = '';
    if ((valueCode) && (/^['"].*['"]$/.test(valueCode))) {
      outputValue = `"${valueCode.replace(/^'(.*)'$/,'$1')}"`;
    } else {
      outputValue = valueCode;
    }
    const code = `{"${key.replace(/^'(.*)'$/,'$1')}": ${outputValue}}`;
    return [code, Order.ATOMIC];
  };
};

export const defineWebApiKvBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "webapi_url_param",
      "message0": "URL param %1=%2",
      "args0": [
        {
          "type": "input_value",
          "name": "KEY",
          "check": blockCheckType.string
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": null
        }
      ],
      "inputsInline": true,
      "output": blockCheckType.urlParam,
      "colour": BlockColors.webapi,
      "tooltip": "Create a single URL query pamaeter key-value pair",
      "helpUrl": ""
    }
  ]);

  javascriptGenerator.forBlock['webapi_url_param'] = function (block, generator) {
    const key = generator.valueToCode(block, 'KEY', Order.ATOMIC) || '';
    const valueCode:string | null = generator.valueToCode(block, 'VALUE', Order.ATOMIC) || null;
    let outputValue:any = '';
    if ((valueCode) && (/^['"].*['"]$/.test(valueCode))) {
      outputValue = `"${valueCode.replace(/^'(.*)'$/,'$1')}"`;
    } else {
      outputValue = valueCode;
    }
    const code = `${key.replace(/^'(.*)'$/,'$1')}=${outputValue}`;
    return [code, Order.ATOMIC];
  };
};

export const defineWebApiUrlParametersBlock = () => {
  javascriptGenerator.forBlock['webapi_url_params'] = function (block:any, generator) {
    let elements = [];
    for (let i = 0; i < block.itemCount; i++) {
      const value = generator.valueToCode(block, `ADD${i}`, Order.NONE) || '';
      if (value !== '') {
        let escapedValue = value;
        if (typeof value === 'string') {
          escapedValue = value.replace(/"/g, '\\"');
        }
        elements.push(`"${escapedValue}"`);
      }
    }
    const code = `webApiUrlParameters(JSON.stringify([${elements.join(',')}]))`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterWebApiUrlParameters(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('webApiUrlParameters');
  const wrapper = function (jsonText:string) {
    try {
      const paramsArray = JSON.parse(jsonText);
      const params = new URLSearchParams();
      for (const param of paramsArray) {
        const [key, value] = param.split('=');
        params.append(key.replace(/"/g, ''), value.replace(/"/g, ''));
      }
      return interpreter.nativeToPseudo(params.toString());
    } catch (error) {
      console.error(`Failed to parse json: ${jsonText}`);
      return interpreter.nativeToPseudo("");
    }
  };
  interpreter.setProperty(globalObject, 'webApiUrlParameters', interpreter.createNativeFunction(wrapper));
}
