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
//import { defineXrplSubscribeAllTxnBlock, initInterpreterXrplSubscribeAllTxn } from '@/blocks/xrpl/xrplSubscribeStreamsTxnBlock';
import { defineXrplClientInitializeBlock, initInterpreterXrplClientInitialize } from '@/blocks/xrpl/xrplClientInitializeBlock';
import {
  defineXrplSubscribeAccountTxnBlock, initInterpreterXrplSubscribeAccountTxn,
  defineXrplUnsubscribeAccountTxnBlock, initInterpreterXrplUnsubscribeAccountTxn
} from '@/blocks/xrpl/xrplSubscribeAccountTxnBlock';
import {
  defineXrplSubscribeAllTxnBlock, initInterpreterXrplSubscribeAllTxn,
  defineXrplUnsubscribeAllTxnBlock, initInterpreterXrplUnsubscribeAllTxn
} from '@/blocks/xrpl/xrplSubscribeStreamsTxnBlock';
import {
  defineXrplPaymentTxnBlock, initInterpreterXrplPaymentTxn,
  defineXrplPaymentTokenTxnBlock, initInterpreterXrplPaymentTokenTxn
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  defineXrplLoadWalletBlock, initInterpreterXrplLoadWallet,
  defineXrplWalletSignBlock, initInterpreterXrplWalletSign,
  defineXrplWalletInfoBlock, initInterpreterXrplWalletInfo
} from '@/blocks/xrpl/xrplWalletBlock';
import {
  defineXrplTokenSelectBlock,
  defineXrplCreateNewTokenBlock, initInterpreterXrplCreateNewToken,
} from '@/blocks/xrpl/xrplTokenBlock';
import {
  defineXrplRipplingTxnBlock, initInterpreterXrplRipplingTxn,
} from '@/blocks/xrpl/xrplAccountSetTransactionBlock';
import {
  defineBuyTokenOfferTxnBlock, initInterpreterBuyTokenOfferTxn,
  defineSaleTokenOfferTxnBlock, initInterpreterSaleTokenOfferTxn
} from '@/blocks/xrpl/xrplOfferTransactionBlock';
import {
  defineXrplClientSubmitBlock, initInterpreterXrplClientSubmit,
  defineXrplClientAutoFillBlock, initInterpreterXrplClientAutofill,
  defineXrplEasySubmitBlock, initInterpreterXrplEasySubmit,
  defineXrplTxCommandBlock, initInterpreterXrplTxCommand,
  defineXrplAccountLinesCommandBlock, initInterpreterXrplAccountLinesCommand
} from '@/blocks/xrpl/xrplSubmitBlock';
import {
  defineXrplTrustSetTxnBlock, initInterpreterXrplTrustSetTxn
} from '@/blocks/xrpl/xrplTrustSetTransactionBlock';
import {
  defineXrplExchangeAddressBlock
} from '@/blocks/xrpl/xrplExchangeAddressBlock';
import {
  defineXrplGetTxnInfoBlock, initInterpreterXrplGetTxnInfoBlock,
  defineXrplExtractOfferCreateTxnBlock, initInterpreterXrplExtractOfferCreateTxnBlock
} from '@/blocks/xrpl/xrplAnalyticsTxnBlock';
import {
  defineXrplTxnTypeSelectBlock
} from '@/blocks/xrpl/xrplTransactionTypeBlock';
import { defineTextUtilInspectPrintBlock, initInterpreterTextUtilInspectPrint } from '@/blocks/text/textUtilInspectPrintBlock';
import { 
  defineUndefinedBlock,
  defineNullBlock,
  defineTrueBlock,
  defineFalseBlock
} from '@/blocks/logic/logicBlock';
import { 
  defineJsonGetValueBlock,
  defineJsonToTextBlock,
  defineJsonToTextV2Block,
  defineJsonTextToJsonBlock,
  defineJsonInputJsonBlock, initInterpreterJsonInputJson,
  defineDynamicJsonKVsBlock,
  defineJsonKeyValueBlock,
  defineJsonTextToJsonV2Block, initInterpreterJsonTextToJsonV2,
  defineJsonSetKVsBlock, initInterpreterJsonSetKVs,
} from '@/blocks/json/jsonValueBlock';
/*
import {
  defineJsonEditorBlock,
  defineJsonPopupBlock,
} from '@/blocks/dev/devModalBlock';
*/
import {
  defineFormModalBlock, initInterpreterFormModal
} from '@/blocks/form/formBlock';
import { defineWaitForSecondsBlock, initInterpreterWaitForSeconds } from '@/blocks/control/waitForSecondsBlock';
import { defineControlRunSpeedBlock, initInterpreterControlRunSpeed } from '@/blocks/control/controlRunSpeed';
import { defineArrayAppendBlock } from '@/blocks/list/arrayAppendBlock';
import { defineArrayInitBlock } from '@/blocks/list/arrayInitBlock';
import { defineDynamicListCreate, defineDynamicTextJoin, defineDynamicIf } from '@/blocks/plugins/pluginDynamicConnection';
import { defineXamanSimpleLoginBlock, initInterpreterXamanSimpleLogin } from '@/blocks/xaman/xamanSimpleLoginBlock';
import { defineXamanSimpleLogoutBlock, initInterpreterXamanSimpleLogout } from '@/blocks/xaman/xamanSimpleLogoutBlock';
import { defineXamanPaymentBlock, initInterpreterXamanPayment } from '@/blocks/xaman/xamanPaymentBlock';
import { 
  defineXamanWaitForSignatureBlock, initInterpreterXamanWaitForSignatureBlock,
} from '@/blocks/xaman/xamanWaitForSignatureBlock';
import {
  defineXamanVariableKeyBlock,
  defineXamanVariableSetBlock, initInterpreterXamanVariableSet,
  defineXamanVariableGetBlock, initInterpreterXamanVariableGet,
} from '@/blocks/xaman/xamanVariableBlock';
import { defineConfettiAnimationBlock, initInterpreterConfettiAnimationFunctions  } from '@/blocks/animation/confettiAnimationBlock';
import { 
  defineTextEndsWithBlock, initInterpreterTextStartsWith,
  defineTextStartsWithBlock, initInterpreterTextEndsWith
} from '@/blocks/text/textCompareBlock';
import {
  defineTextOnetimeBlock
} from '@/blocks/text/textPrivateBlock';
import { defineTextToUpperCaseBlock, defineTextToLowerCaseBlock } from '@/blocks/text/textConvertBlock';
import { defineNumberToTextBlock } from '@/blocks/text/textNumberToTextBlock';
import { defineTextToNumberBlock } from '@/blocks/text/textTextToNumberBlock';
import {
  defineTableEmptyBlock,
  defineTableGetRowBlock, initInterpreterTableGetRow,
  defineTableRowCountBlock, initInterpreterTableRowCount,
  defineTextToTableBlock,
  defineTableGetColumnBlock, initInterpreterTableGetColumn,
  defineTableAddRowBlock, initInterpreterTableAddRow,
} from '@/blocks/table/tableBlock';
import {
  defineSupabaseCreateClientBlock, initInterpreterSupabaseCreateClient,
  defineSupabaseInsertBlock, initInterpreterSupabaseInsert,
  defineSupabaseTextToJsonBlock, initInterpreterSupabaseTextToJson,
  defineSupabaseSelectBlock, initInterpreterSupabaseSelect,
  defineSupabaseUpdateBlock, initInterpreterSupabaseUpdate,
  defineSupabaseDeleteBlock, initInterpreterSupabaseDelete
} from '@/blocks/supabase/supabaseClientBlock';
/*
import {
  defineNotionCreateClientBlock, initInterpreterNotionCreateClient,
  defineNotionCreateDatabaseBlock, initInterpreterNotionCreateDatabase,
  defineNotionAddRecordBlock, initInterpreterNotionAddRecord
} from '@/blocks/notion/notionDatabaseBlock';
*/
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
      <block type="table_load_csv"></block>
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
  defineXrplSubscribeAccountTxnBlock();
  defineXrplUnsubscribeAccountTxnBlock();
  defineXrplSubscribeAllTxnBlock();
  defineXrplUnsubscribeAllTxnBlock();
  defineXrplLoadWalletBlock();
  defineXrplEasySubmitBlock();
  defineXrplTxCommandBlock();
  defineXrplAccountLinesCommandBlock();
  defineXrplWalletSignBlock();
  defineXrplWalletInfoBlock();
  defineXrplPaymentTxnBlock();
  defineXrplPaymentTokenTxnBlock();
  defineXrplClientSubmitBlock();
  defineXrplClientAutoFillBlock();
  defineXrplExchangeAddressBlock();
  defineXrplTokenSelectBlock();
  defineXrplCreateNewTokenBlock();
  defineXrplRipplingTxnBlock();
  defineXrplTrustSetTxnBlock();
  defineBuyTokenOfferTxnBlock();
  defineSaleTokenOfferTxnBlock();
  defineXrplGetTxnInfoBlock();
  defineXrplExtractOfferCreateTxnBlock();
  defineXrplTxnTypeSelectBlock();

  // Xaman Wallet
  defineXamanSimpleLoginBlock();
  defineXamanSimpleLogoutBlock();
  defineXamanPaymentBlock();
  defineXamanWaitForSignatureBlock();
  defineXamanVariableKeyBlock();
  defineXamanVariableSetBlock();
  defineXamanVariableGetBlock();

  // Math
  definePercentageBlock();

  // Text
  defineTextToNumberBlock();
  defineTextUtilInspectPrintBlock();
  defineNumberToTextBlock();
  defineTextEndsWithBlock();
  defineTextStartsWithBlock();
  defineTextToUpperCaseBlock();
  defineTextToLowerCaseBlock();
  defineTextOnetimeBlock();

  // JSON
  defineJsonGetValueBlock();
  defineJsonToTextBlock();
  defineJsonToTextV2Block();
  defineJsonTextToJsonBlock();
  defineJsonInputJsonBlock();
  defineDynamicJsonKVsBlock();
  defineJsonKeyValueBlock();
  defineJsonTextToJsonV2Block();
  defineJsonSetKVsBlock();

  //defineJsonEditorBlock();
  //defineJsonPopupBlock();

  // Modal
  defineFormModalBlock();

  // Table
  defineTableEmptyBlock();
  defineTableGetRowBlock();
  defineTableRowCountBlock();
  defineTextToTableBlock();
  defineTableGetColumnBlock();
  defineTableAddRowBlock();
  defineCsvBlock();
  defineCSVSaveBlock();

  // Supabase
  defineSupabaseCreateClientBlock();
  defineSupabaseInsertBlock();
  defineSupabaseTextToJsonBlock();
  defineSupabaseSelectBlock();
  defineSupabaseUpdateBlock();
  defineSupabaseDeleteBlock();

  // Notion
  //defineNotionCreateClientBlock();
  //defineNotionCreateDatabaseBlock();
  //defineNotionAddRecordBlock();

  // List
  defineArrayAppendBlock();
  defineArrayInitBlock();

  // Control
  defineWaitForSecondsBlock();
  defineControlRunSpeedBlock();

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
  defineTrueBlock();
  defineFalseBlock();

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

  initInterpreterXrplAccountInfo(interpreter, scope);
  initInterpreterXrplClientInitialize(interpreter, scope);
  initInterpreterXrplSubscribeAccountTxn(interpreter, scope);
  initInterpreterXrplUnsubscribeAccountTxn(interpreter, scope);
  initInterpreterXrplSubscribeAllTxn(interpreter, scope);
  initInterpreterXrplCreateAccount(interpreter, scope);
  initInterpreterXrplRequestFaucet(interpreter, scope);
  initInterpreterXrplRequestCustomFaucet(interpreter, scope);
  initInterpreterXrplLoadWallet(interpreter, scope);
  initInterpreterXrplWalletSign(interpreter, scope);
  initInterpreterXrplWalletInfo(interpreter, scope);
  initInterpreterXrplEasySubmit(interpreter, scope);
  initInterpreterXrplClientSubmit(interpreter, scope);
  initInterpreterXrplClientAutofill(interpreter, scope);
  initInterpreterXrplPaymentTxn(interpreter, scope);
  initInterpreterXrplPaymentTokenTxn(interpreter, scope);
  initInterpreterXrplCreateNewToken(interpreter, scope);
  initInterpreterXrplRipplingTxn(interpreter, scope);
  initInterpreterXrplTrustSetTxn(interpreter, scope);
  initInterpreterXrplGetTxnInfoBlock(interpreter, scope);
  initInterpreterBuyTokenOfferTxn(interpreter, scope);
  initInterpreterSaleTokenOfferTxn(interpreter, scope);
  initInterpreterXrplTxCommand(interpreter, scope);
  initInterpreterXrplExtractOfferCreateTxnBlock(interpreter, scope);
  initInterpreterXrplUnsubscribeAllTxn(interpreter, scope);
  initInterpreterXrplAccountLinesCommand(interpreter, scope);

  initInterpreterXamanSimpleLogin(interpreter, scope);
  initInterpreterXamanSimpleLogout(interpreter, scope);
  initInterpreterXamanPayment(interpreter, scope);
  initInterpreterXamanWaitForSignatureBlock(interpreter, scope);
  initInterpreterXamanVariableSet(interpreter, scope);
  initInterpreterXamanVariableGet(interpreter, scope);

  initInterpreterWaitForSeconds(interpreter, scope);
  initInterpreterControlRunSpeed(interpreter, scope);
  initInterpreterConfettiAnimationFunctions(interpreter, scope);

  initInterpreterCurrentDateTime(interpreter, scope);
  initInterpreterDatedatetimeToText(interpreter, scope);
  initInterpreterCreateDateTime(interpreter, scope);
  initInterpreterDateTimeToRippleEpoch(interpreter, scope);
  initInterpreterRippleEpochToDateTime(interpreter, scope);
  initInterpreterAdjustDateTime(interpreter, scope);
  initInterpreterCompareDateTime(interpreter, scope);

  initInterpreterTextStartsWith(interpreter, scope);
  initInterpreterTextEndsWith(interpreter, scope);
  initInterpreterJsonInputJson(interpreter, scope);
  initInterpreterJsonTextToJsonV2(interpreter, scope);
  initInterpreterJsonSetKVs(interpreter, scope);

  initInterpreterTableGetColumn(interpreter, scope);
  initInterpreterTableRowCount(interpreter, scope);
  initInterpreterTableGetRow(interpreter, scope);
  initInterpreterTableAddRow(interpreter, scope);
  initInterpreterTableCSVSave(interpreter, scope);

  initInterpreterSupabaseCreateClient(interpreter, scope);
  initInterpreterSupabaseInsert(interpreter, scope);
  initInterpreterSupabaseTextToJson(interpreter, scope);
  initInterpreterSupabaseSelect(interpreter, scope);
  initInterpreterSupabaseUpdate(interpreter, scope);
  initInterpreterSupabaseDelete(interpreter, scope);

  initInterpreterBuyTokenOfferTxn(interpreter, scope);
  initInterpreterSaleTokenOfferTxn(interpreter, scope);
  //initInterpreterNotionCreateClient(interpreter, scope);
  //initInterpreterNotionCreateDatabase(interpreter, scope);
  //initInterpreterNotionAddRecord(interpreter, scope);
  initInterpreterFormModal(interpreter, scope);
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
