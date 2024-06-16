import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import xamanPkce from '@/utils/XamanPkce';
import { newTitleLabel } from '@/blocks/BlockField';

export const defineXamanSimpleLogoutBlock = () => {
  Blockly.Blocks['xaman_simple_logout'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(newTitleLabel("Xaman logout"));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xaman);
      this.setTooltip('Logout from Xaman');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xaman_simple_logout'] = function () {
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
