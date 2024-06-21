import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
import { javascriptGenerator } from 'blockly/javascript';
import Interpreter from 'js-interpreter';
import * as BlockDynamicConnection from '@blockly/block-dynamic-connection';
import { 
  defineDateTimeToRippleEpoch,
  defineRippleEpochToDateTime,
  initInterpreterDateTimeToRippleEpoch,
  initInterpreterRippleEpochToDateTime
} from '@/blocks/xrpl/datetimeToRippleEpochBlock';
import { defineXrplNetworkWssSelectionBlock } from '@/blocks/xrpl/xrplNetworkSelectionBlock';
import { defineXrplFaucetNetworkSelectionBlock } from '@/blocks/xrpl/xrplFaucetNetworkSelectionBlock';
import { defineXrplCreateAccountBlock, initInterpreterXrplCreateAccount } from '@/blocks/xrpl/xrplCreateAccountBlock';
import { defineXrplRequestFaucetBlock, initInterpreterXrplRequestFaucet } from '@/blocks/xrpl/xrplRequestFaucetBlock';
import { defineXrplRequestCustomFaucetBlock, initInterpreterXrplRequestCustomFaucet } from '@/blocks/xrpl/xrplRequestCustomFaucetBlock';
import { defineXrplAddressBlock } from '@/blocks/xrpl/xrplAddressBlock';
import { defineXrplXrp2DropBlock, defineXrplDrop2XrpBlock } from '@/blocks/xrpl/xrplAmountBlock';
import { defineXrplPaymentBlock } from '@/blocks/xrpl/xrplPaymentBlock';
import { definePercentageBlock } from '@/blocks/math/percentageBlock'; 
import { defineXrplAccountInfoBlock, initInterpreterXrplAccountInfo } from '@/blocks/xrpl/xrplAccountInfoBlock';
//import { defineXrplClientSubscribeStreamsTxnsBlock, initInterpreterXrplClientSubscribeStreamsTxns } from '@/blocks/xrpl/xrplClientSubscribeStreamsTxnsBlock';
import { defineXrplClientInitializeBlock, initInterpreterXrplClientInitialize } from '@/blocks/xrpl/xrplClientInitializeBlock';
import {
  defineXrplClientSubscribeAccountTxnsBlock,
  initInterpreterXrplClientSubscribeAccountTxns,
  defineXrplClientUnsubscribeAccountTxnsBlock,
  initInterpreterXrplClientUnsubscribeAccountTxns
} from '@/blocks/xrpl/xrplClientSubscribeAccountTxnsBlock';
import {
  defineXrplPaymentTxnBlock,
  initInterpreterXrplPaymentTxn
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  defineXrplLoadWalletBlock,
  initInterpreterXrplLoadWallet,
  defineXrplWalletSignBlock,
  initInterpreterXrplWalletSign
} from '@/blocks/xrpl/xrplWalletBlock';

import {
  defineXrplClientSubmitBlock, initInterpreterXrplClientSubmit
} from '@/blocks/xrpl/xrplClientSubmitBlock';
import {
  defineXrplExchangeAddressBlock
} from '@/blocks/xrpl/xrplExchangeAddressBlock';

import { defineTextUtilInspectPrintBlock, initInterpreterTextUtilInspectPrint } from '@/blocks/text/textUtilInspectPrintBlock';
import { defineUndefinedBlock, defineNullBlock } from '@/blocks/logic/logicBlock';

import { defineJsonGetValueBlock } from '@/blocks/json/jsonValueBlock';
import { defineJsonToTextBlock } from '@/blocks/json/jsonToTextBlock';
import { defineJsonTextToJsonBlock } from '@/blocks/json/jsonTextToJsonBlock';
import { defineWaitForSecondsBlock, initInterpreterWaitForSeconds } from '@/blocks/control/waitForSecondsBlock';
import { defineArrayAppendBlock } from '@/blocks/list/arrayAppendBlock';
import { defineArrayInitBlock } from '@/blocks/list/arrayInitBlock';
import { defineDynamicListCreate, defineDynamicTextJoin, defineDynamicIf } from '@/blocks/plugins/pluginDynamicConnection';
import { defineXamanSimpleLoginBlock, initInterpreterXamanSimpleLogin } from '@/blocks/xaman/xamanSimpleLoginBlock';
import { defineXamanSimpleLogoutBlock, initInterpreterXamanSimpleLogout } from '@/blocks/xaman/xamanSimpleLogoutBlock';
import { defineXamanPaymentBlock, initInterpreterXamanPayment } from '@/blocks/xaman/xamanPaymentBlock';
import { defineXamanWaitForSignatureBlock, initInterpreterXamanWaitForSignatureBlock } from '@/blocks/xaman/xamanWaitForSignatureBlock';
import { defineConfettiAnimationBlock, initInterpreterConfettiAnimationFunctions  } from '@/blocks/animation/confettiAnimationBlock';
import { defineNumberToTextBlock } from '@/blocks/text/textNumberToTextBlock';
import { defineTextToNumberBlock } from '@/blocks/text/textTextToNumberBlock';
import {
  defineTableEmptyBlock,
  defineTableGetRowBlock,
  defineTableRowCountBlock,
  defineTextToTableBlock,
  defineTableGetColumnBlock,
  defineTableAddRowBlock,
  initInterpreterTableGetColumn,
  initInterpreterTableGetRow,
  initInterpreterTableAddRow
 } from '@/blocks/table/tableBlock';
 import { defineCsvBlock, defineCSVSaveBlock, initInterpreterTableCSVSave  } from '@/blocks/table/tableCsvBlock';
 import { defineCurrentDateTimeBlock, initInterpreterCurrentDateTime } from '@/blocks/time/getCurrentDateTimeBlock';
import { defineDatedatetimeToTextBlock, initInterpreterDatedatetimeToText } from '@/blocks/time/datetimeToTextBlock';
import { defineCreateDateTimeBlock, initInterpreterCreateDateTime } from '@/blocks/time/createTimeBlock';
import { defineAdjustDateTimeBlock, initInterpreterAdjustDateTime } from '@/blocks/time/adjustDateTimeBlock';
import { defineDateTimeTextFormatBlock } from '@/blocks/time/dateTimeTextFormatBlock';
import { defineTimezoneBlock } from '@/blocks/time/timezoneBlock';
import { defineCompareDateTimeBlock, initInterpreterCompareDateTime } from '@/blocks/time/compareDateTimeBlock';
import { defineConsoleLogBlock } from '@/blocks/debug/consoleLogBlock';
import { BlockColors } from '@/blocks/BlockColors';
import { BaseTheme } from '@/blocks/BlocklyTheme';

let workspace:Blockly.WorkspaceSvg;
let flyout:Blockly.WorkspaceSvg;

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
      <block type="number_to_text"></block>
      <block type="text_to_number"></block>
    </category>
    <category name="Math" colour="%{BKY_MATH_HUE}">
      <block type="math_number"></block>
      <block type="percentage"></block>
    </category>
    <category name="Conrol" colour="${BlockColors.control}">
      <block type="wait_seconds"></block>
    </category>
    <category name="Time" colour="${BlockColors.time}">
      <block type="current_datetime"></block>
      <block type="create_datetime"></block>
      <block type="datetime_to_text"></block>
      <block type="datetime_to_ripple_epoch"></block>
      <block type="ripple_epoch_to_datetime"></block>
      <block type="adjust_datetime"></block>
      <block type="datetime_text_format"></block>
      <block type="timezone_block"></block>
      <block type="compare_datetime"></block>
    </category>
    <category name="JSON" colour="${BlockColors.json}">
      <block type="json_get_value"></block>
      <block type="json_to_text"></block>
      <block type="text_to_json"></block>
    </category>
    <category name="Table" colour="%{BKY_LOOPS_HUE}">
      <block type="table_input_csv"></block>
    </category>
    <category name="Animation" colour="${BlockColors.animation}">
      <block type="confetti_animation"></block>
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
      <block type="lists_repeat"></block>
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
  defineXrplAccountInfoBlock();
  defineXrplClientInitializeBlock();
  defineXrplClientSubscribeAccountTxnsBlock();
  defineXrplClientUnsubscribeAccountTxnsBlock();
  defineXrplLoadWalletBlock();
  defineXrplWalletSignBlock();
  defineXrplPaymentTxnBlock();
  defineXrplClientSubmitBlock();
  defineXrplExchangeAddressBlock();

  // Xaman Wallet
  defineXamanSimpleLoginBlock();
  defineXamanSimpleLogoutBlock();
  defineXamanPaymentBlock();
  defineXamanWaitForSignatureBlock();

  // Math
  definePercentageBlock();

  // Text
  defineTextToNumberBlock();
  defineTextUtilInspectPrintBlock();
  defineNumberToTextBlock();

  // JSON
  defineJsonGetValueBlock();
  defineJsonToTextBlock();
  defineJsonTextToJsonBlock();

  // Table
  defineTableEmptyBlock();
  defineTableGetRowBlock();
  defineTableRowCountBlock();
  defineTextToTableBlock();
  defineTableGetColumnBlock();
  defineTableAddRowBlock();
  defineCsvBlock();
  defineCSVSaveBlock();

  // List
  defineArrayAppendBlock();
  defineArrayInitBlock();

  // Control
  defineWaitForSecondsBlock();

  // Time
  defineCurrentDateTimeBlock();
  defineDatedatetimeToTextBlock();
  defineCreateDateTimeBlock();
  defineDateTimeToRippleEpoch();
  defineRippleEpochToDateTime();
  defineAdjustDateTimeBlock();
  defineDateTimeTextFormatBlock();
  defineTimezoneBlock();
  defineCompareDateTimeBlock();

  // Logic
  defineUndefinedBlock();
  defineNullBlock();

  // Animation
  defineConfettiAnimationBlock();
  
  // Debug
  defineConsoleLogBlock();
  
  // Plugins
  defineDynamicListCreate();
  defineDynamicTextJoin();
  defineDynamicIf();
}

const initInterpreter = (interpreter: Interpreter, scope: any) => {
  initInterpreterWaitForSeconds(interpreter, scope);
  initInterpreterXrplAccountInfo(interpreter, scope);
  initInterpreterXrplClientInitialize(interpreter, scope);
  initInterpreterXrplClientSubscribeAccountTxns(interpreter, scope);
  initInterpreterXrplClientUnsubscribeAccountTxns(interpreter, scope);
  initInterpreterXrplCreateAccount(interpreter, scope);
  initInterpreterXrplRequestFaucet(interpreter, scope);
  initInterpreterXrplRequestCustomFaucet(interpreter, scope);
  initInterpreterXrplLoadWallet(interpreter, scope);
  initInterpreterXrplWalletSign(interpreter, scope);
  initInterpreterXrplClientSubmit(interpreter, scope);
  initInterpreterXrplPaymentTxn(interpreter, scope);
  initInterpreterXamanSimpleLogin(interpreter, scope);
  initInterpreterXamanSimpleLogout(interpreter, scope);
  initInterpreterXamanPayment(interpreter, scope);
  initInterpreterXamanWaitForSignatureBlock(interpreter, scope);
  initInterpreterConfettiAnimationFunctions(interpreter, scope);
  initInterpreterCurrentDateTime(interpreter, scope);
  initInterpreterDatedatetimeToText(interpreter, scope);
  initInterpreterCreateDateTime(interpreter, scope);
  initInterpreterDateTimeToRippleEpoch(interpreter, scope);
  initInterpreterRippleEpochToDateTime(interpreter, scope);
  initInterpreterAdjustDateTime(interpreter, scope);
  initInterpreterCompareDateTime(interpreter, scope);
  initInterpreterTableGetColumn(interpreter, scope);
  initInterpreterTableGetRow(interpreter, scope);
  initInterpreterTableAddRow(interpreter, scope);
  initInterpreterTableCSVSave(interpreter, scope);
}

const initInterpreterEx = (interpreter: Interpreter, scope: any, logArea:HTMLTextAreaElement | null) => {
  initInterpreter(interpreter, scope);
  if (logArea) {
    initInterpreterTextUtilInspectPrint(interpreter, scope, logArea);
  }
}

const handleBlocklyResize = () => {
  //console.log('resize');
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
  if(workspace){
    const toolboxTemp = workspace.getToolbox();
    if (toolboxTemp) {
      toolboxTemp.setVisible(false);
    }
  }
  // Bug
  //const zoomToFit = new ZoomToFitControl(workspace);
  //zoomToFit.init();
  //workspace.addChangeListener(BlockDynamicConnection.finalizeConnections);
  
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
      startScale: 0.9,
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

  //console.log('Blockly initialized with workspace:', workspace);
}

const handleFlyoutResize = () => {
  const onresize = function () {
    Blockly.svgResize(flyout);
  }
  window.addEventListener("resize", onresize, false);
  Blockly.svgResize(flyout);
};

export { blocklyInit, initInterpreterEx, workspace, flyout };
