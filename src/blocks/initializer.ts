import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import { javascriptGenerator } from 'blockly/javascript';
import Interpreter from 'js-interpreter';
import * as BlockDynamicConnection from '@blockly/block-dynamic-connection';
import { ZoomToFitControl } from '@blockly/zoom-to-fit';
import { defineXrplNetworkWssSelectionBlock } from '@/blocks/xrplNetworkSelectionBlock';
import { defineXrplFaucetNetworkSelectionBlock } from '@/blocks/xrplFaucetNetworkSelectionBlock';
import { defineXrplCreateAccountBlock, initInterpreterXrplCreateAccount } from '@/blocks/xrplCreateAccountBlock';
import { defineXrplRequestFaucetBlock, initInterpreterXrplRequestFaucet } from '@/blocks/xrplRequestFaucetBlock';
import { defineXrplRequestCustomFaucetBlock, initInterpreterXrplRequestCustomFaucet } from '@/blocks/xrplRequestCustomFaucetBlock';
import { defineXrplAddressBlock } from '@/blocks/xrplAddressBlock';
import { defineXrplXrp2DropBlock, defineXrplDrop2XrpBlock } from '@/blocks/xrplAmountBlock';
import { defineXrplPaymentBlock } from '@/blocks/xrplPaymentBlock';
import { definePercentageBlock } from '@/blocks/percentageBlock'; 
import { defineXrplAccountInfoApiBlock, initInterpreterAccountInfoApi } from '@/blocks/xrplAccountInfoApiBlock';
import { defineConsoleLogBlock } from '@/blocks/consoleLogBlock';
import { defineJsonGetValueBlock } from '@/blocks/jsonValueBlock';
import { defineJsonToTextBlock } from '@/blocks/jsonToTextBlock';
import { defineJsonTextToJsonBlock } from '@/blocks/jsonTextToJsonBlock';
import { defineWaitForSecondsBlock, initInterpreterWaitForSeconds } from '@/blocks/waitForSecondsBlock';
import { defineArrayAppendBlock } from '@/blocks/arrayAppendBlock';
import { defineArrayInitBlock } from '@/blocks/arrayInitBlock';
import { defineDynamicListCreate, defineDynamicTextJoin, defineDynamicIf } from '@/blocks/pluginDynamicConnection';
import { defineXamanSimpleLoginBlock, initInterpreterXamanSimpleLogin } from '@/blocks/xamanSimpleLoginBlock';
import { defineXamanSimpleLogoutBlock, initInterpreterXamanSimpleLogout } from '@/blocks/xamanSimpleLogoutBlock';
import { defineXamanPaymentBlock, initInterpreterXamanPayment } from '@/blocks/xamanPaymentBlock';
import { defineXamanWaitForSignatureBlock, initInterpreterXamanWaitForSignatureBlock } from '@/blocks/xamanWaitForSignatureBlock';
import { defineConfettiAnimationBlock, initInterpreterConfettiAnimationFunctions  } from '@/blocks/confettiAnimationBlock';
import { BlockColors } from '@/utils/BlockColors';

let workspace:Blockly.WorkspaceSvg;

const toolbox = `
  <xml id="toolbox" style="display: none">
    <category name="XRPL" colour="${BlockColors.xrpl}">
      <block type="xrpl_network_wss_selection"></block>
      <block type="xrpl_faucet_network_selection"></block>
      <block type="xrpl_create_account"></block>
      <block type="xrpl_request_custom_faucet"></block>
      <block type="xrpl_request_faucet"></block>
      <block type="xrpl_account_info_api"></block>
      <block type="xrpl_address"></block>
      <block type="xrpl_xrp_to_drops"></block>
      <block type="xrpl_drops_to_xrp"></block>
    </category>
    <category name="Xaman" colour="${BlockColors.xaman}">
      <block type="xaman_simple_login"></block>
      <block type="xaman_simple_logout"></block>
      <block type="xaman_payment"></block>
      <block type="xaman_wait_for_signature"></block>
    </category>
    <category name="Text" colour="%{BKY_TEXTS_HUE}">
      <block type="text_print"></block>
      <block type="text"></block>
      <block type="dynamic_text_join"></block>
      <block type="text_length"></block>
      <block type="text_isEmpty"></block>
    </category>
    <category name="Math" colour="%{BKY_MATH_HUE}">
      <block type="math_number"></block>
      <block type="percentage"></block>
    </category>
    <category name="Conrol" colour="${BlockColors.control}">
      <block type="wait_seconds"></block>
    </category>
    <category name="Animation" colour="${BlockColors.animation}">
      <block type="confetti_animation"></block>
    </category>
    <category name="JSON" colour="${BlockColors.json}">
      <block type="json_get_value"></block>
      <block type="json_to_text"></block>
      <block type="text_to_json"></block>
    </category>
    <category name="Logic" colour="%{BKY_LOGIC_HUE}">
      <block type="dynamic_if"></block>
      <block type="logic_compare"></block>
    </category>
    <category name="Loops" colour="%{BKY_LOOPS_HUE}">
      <block type="controls_whileUntil"></block>
      <block type="controls_for"></block>
      <block type="controls_forEach"></block>
    </category>
    <category name="Lists" colour="%{BKY_LISTS_HUE}">
      <block type="array_init"></block>
      <block type="array_append"></block>
      <block type="dynamic_list_create"></block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_sort"></block>
    </category>
    <category name="Variables" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
      <block type="variables_get"></block>
    </category>
    <category name="Functions" custom="PROCEDURE" colour="%{BKY_PROCEDURES_HUE}">
    </category>
    <button text="Custom Button" callbackKey="customButtonPressed"></button>
  </xml>
`;


const createCustomBlocks = () => {
  // Common
  defineWaitForSecondsBlock();
  definePercentageBlock();
  defineConsoleLogBlock();
  defineJsonGetValueBlock();
  defineJsonToTextBlock();
  defineJsonTextToJsonBlock();
  defineArrayAppendBlock();
  defineArrayInitBlock();
  defineConfettiAnimationBlock();

  // Plugins
  defineDynamicListCreate();
  defineDynamicTextJoin();
  defineDynamicIf();

  // XRPL & Xahau
  defineXrplNetworkWssSelectionBlock();
  defineXrplFaucetNetworkSelectionBlock();
  defineXrplCreateAccountBlock();
  defineXrplRequestFaucetBlock();
  defineXrplRequestCustomFaucetBlock();
  defineXrplAddressBlock();
  defineXrplXrp2DropBlock();
  defineXrplDrop2XrpBlock();
  defineXrplPaymentBlock();
  defineXrplAccountInfoApiBlock();

  // Xaman Wallet
  defineXamanSimpleLoginBlock();
  defineXamanSimpleLogoutBlock();
  defineXamanPaymentBlock();
  defineXamanWaitForSignatureBlock();
}

const initInterpreter = (interpreter: Interpreter, scope: any) => {
  initInterpreterWaitForSeconds(interpreter, scope);
  initInterpreterAccountInfoApi(interpreter, scope);
  initInterpreterXrplCreateAccount(interpreter, scope);
  initInterpreterXrplRequestFaucet(interpreter, scope);
  initInterpreterXrplRequestCustomFaucet(interpreter, scope);
  initInterpreterXamanSimpleLogin(interpreter, scope);
  initInterpreterXamanSimpleLogout(interpreter, scope);
  initInterpreterXamanPayment(interpreter, scope);
  initInterpreterXamanWaitForSignatureBlock(interpreter, scope);
  initInterpreterConfettiAnimationFunctions(interpreter, scope);
}

const handleBlocklyResize = () => {
  const blocklyArea = document.getElementById("blocklyArea");
  const blocklyDiv = document.getElementById("blocklyDiv");
  
  const onresize = function () {
    if (blocklyArea !== null && blocklyDiv != null) {
      let element: HTMLElement = blocklyArea;
      let x = 0;
      let y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent as HTMLElement;
      } while (element);
      blocklyDiv.style.left = x + "px";
      blocklyDiv.style.top = y + "px";
      blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
      blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
      Blockly.svgResize(workspace);
    }
  };

  window.addEventListener("resize", onresize, false);
  onresize();
  Blockly.svgResize(workspace);
};

const workspaceAdjustment = () => {
  const zoomToFit = new ZoomToFitControl(workspace);
  zoomToFit.init();
  workspace.addChangeListener(BlockDynamicConnection.finalizeConnections);
  
  javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  javascriptGenerator.addReservedWords('highlightBlock');
}


const blocklyInit = () => {
  console.log('Initializing Blockly...');

  Blockly.setLocale(En);
  //Blockly.utils.colour.setHsvSaturation(0.9);
  //Blockly.utils.colour.setHsvValue(0.6);

  createCustomBlocks();

  workspace = Blockly.inject("blocklyDiv", {
    toolbox : toolbox,
    zoom: {
      controls: true,
      wheel: false,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true
    },
    plugins: {
      connectionPreviewer:
        BlockDynamicConnection.decoratePreviewer(
          Blockly.InsertionMarkerPreviewer,
        ),
    },
  });

  workspaceAdjustment();
  handleBlocklyResize();

  // Override (Disabled)
  // BlockDynamicConnection.overrideOldBlockDefinitions();
  console.log('Blockly initialized with workspace:', workspace);
}

const blocklyUpdate = () => {
  console.log('Updating Blockly...');
  workspace = Blockly.inject("blocklyDiv", {
    toolbox : toolbox,
    zoom: {
      controls: true,
      wheel: false,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true
    },
    plugins: {
      connectionPreviewer:
        BlockDynamicConnection.decoratePreviewer(
          Blockly.InsertionMarkerPreviewer,
        ),
    },
    horizontalLayout: true
  });
  workspaceAdjustment();
  handleBlocklyResize();
  console.log('Blockly updated with workspace:', workspace);
}

export { blocklyInit, initInterpreter, blocklyUpdate, workspace };
