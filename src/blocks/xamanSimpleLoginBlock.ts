import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '../utils/BlockColors';
import xamanPkce from '@/utils/XamanPkce';


export const defineXamanSimpleLoginBlock = () => {
  Blockly.Blocks['xaman_simple_login'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("Xaman login", "bold-label"));
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel("User", "args-label"))
        .appendField(new Blockly.FieldVariable("userInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xaman);
      this.setTooltip('Login to Xaman and save user info to a variable');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xaman_simple_login'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
      return `xamanSimpleLogin('');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
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
