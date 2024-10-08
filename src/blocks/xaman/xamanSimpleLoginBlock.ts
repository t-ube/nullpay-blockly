import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import xamanPkce from '@/utils/XamanPkce';


export const xaman_login : any = {
  "type": "xaman_login",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Xaman login",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "User",
      "class": "output-label"
    },
    {
      "type": "field_variable",
      "name": "USER_INFO",
      "variable": "userInfo"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xaman,
  "tooltip": "Login to Xaman and save user info to a variable",
  "helpUrl": ""
};

export const defineXamanSimpleLoginBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xaman_login
  ]);

  javascriptGenerator.forBlock['xaman_login'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
      return `xamanSimpleLogin('');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('USER_INFO'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanSimpleLogin('${variable}');\n`;
    return code;
  };
};


export function initInterpreterXamanSimpleLogin(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanSimpleLogin');
  const wrapper = async function (variable:any, callback:any) {
    if (xamanPkce === undefined) {
      console.log('Error during Xaman authorization');
      callback();
      return;
    }

    let callbackCalled = false;

    xamanPkce.on("success", async () => {
      if (callbackCalled) return;
      callbackCalled = true;
      console.log('Xaman login');
      const state = await xamanPkce.state();
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(state?.me));
    });

    xamanPkce.on("retrieved", async () => {
      if (callbackCalled) return;
      callbackCalled = true;
      console.log("Retrieved: from localStorage or mobile browser redirect");
      const state = await xamanPkce.state();
      interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(state?.me));
    });

    xamanPkce.on("error", (error:any) => {
      if (callbackCalled) return;
      callbackCalled = true;
      console.error("Error with Xaman:", error);
    });

    try {
      await xamanPkce.authorize();
    } catch (e) {
      console.log('Error during Xaman authorization', e);
    }
    callback();
  };
  interpreter.setProperty(globalObject, 'xamanSimpleLogin', interpreter.createAsyncFunction(wrapper));
}


export const xaman_logout : any = {
  "type": "xaman_logout",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "Xaman logout",
      "class": "title-label"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.xaman,
  "tooltip": "Logout from Xaman",
  "helpUrl": ""
};

export const defineXamanSimpleLogoutBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xaman_logout
  ]);

  javascriptGenerator.forBlock['xaman_logout'] = function () {
    const code = `xamanSimpleLogout();\n`;
    return code;
  };
};

export function initInterpreterXamanSimpleLogout(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanSimpleLogout');
  const wrapper = async function (callback:any) {
    if (xamanPkce === undefined) {
      console.log('Error during Xaman authorization');
      callback();
      return;
    }

    xamanPkce.logout();
    
    console.log('Logged out from Xaman');
    callback();
  };
  interpreter.setProperty(globalObject, 'xamanSimpleLogout', interpreter.createAsyncFunction(wrapper));
}
