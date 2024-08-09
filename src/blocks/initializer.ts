import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import * as En from 'blockly/msg/en';
//import * as Ja from 'blockly/msg/ja';
import * as CustomEn from '@/blocks/msg/en.json';
//import * as CustomJa from '@/blocks/msg/ja.json';
import { javascriptGenerator } from 'blockly/javascript';
import Interpreter from 'js-interpreter';
import * as BlockDynamicConnection from '@blockly/block-dynamic-connection';
import { 
  defineDateTimeToRippleEpoch,
  defineRippleEpochToDateTime,
  initInterpreterDateTimeToRippleEpoch,
  initInterpreterRippleEpochToDateTime
} from '@/blocks/xrpl/datetimeToRippleEpochBlock';
import { 
  defineXrplNetworkWssSelectionBlock,
  defineXrplFaucetNetworkSelectionBlock
} from '@/blocks/xrpl/xrplNetworkSelectionBlock';
import { 
  defineXrplRequestFaucetBlock, initInterpreterXrplRequestFaucet,
  defineXrplRequestCustomFaucetBlock, initInterpreterXrplRequestCustomFaucet
} from '@/blocks/xrpl/xrplRequestFaucetBlock';
import { 
  defineXrplAddressBlock,
  defineXrplExchangeAddressBlock
} from '@/blocks/xrpl/xrplAddressBlock';
import {
  defineXrplClioNftInfoBlock, initInterpreterXrplClioNftInfo
} from '@/blocks/xrpl/xrplClioServerBlock';
import { defineXrplXrp2DropBlock, defineXrplDrop2XrpBlock } from '@/blocks/xrpl/xrplAmountBlock';
import { definePercentageBlock } from '@/blocks/math/mathBlock'; 
import { 
  defineXrplAccountInfoBlock,initInterpreterXrplAccountInfo,
  defineXrplAccountLinesCommandBlock, initInterpreterXrplAccountLinesCommand
} from '@/blocks/xrpl/xrplAccountInfoBlock';
//import { defineXrplSubscribeAllTxnBlock, initInterpreterXrplSubscribeAllTxn } from '@/blocks/xrpl/xrplSubscribeStreamsTxnBlock';
import { defineXrplClientInitializeBlock, initInterpreterXrplClientInitialize } from '@/blocks/xrpl/xrplClientInitializeBlock';
import {
  defineXrplSubscribeAccountTxnBlock, initInterpreterXrplSubscribeAccountTxn,
  defineXrplUnsubscribeAccountTxnBlock, initInterpreterXrplUnsubscribeAccountTxn,
  defineXrplSubscribeAllTxnBlock, initInterpreterXrplSubscribeAllTxn,
  defineXrplUnsubscribeAllTxnBlock, initInterpreterXrplUnsubscribeAllTxn
} from '@/blocks/xrpl/xrplSubscribeBlock';
import {
  // defineXrplPaymentBlock,
  defineXrplPaymentTxnBlock, initInterpreterXrplPaymentTxn,
  defineXrplPaymentTokenTxnBlock, initInterpreterXrplPaymentTokenTxn,
  defineXrplPaymentBlock, initInterpreterXrplPayment,
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  defineXrplLoadWalletBlock, initInterpreterXrplLoadWallet,
  defineXrplWalletSignBlock, initInterpreterXrplWalletSign,
  defineXrplWalletInfoBlock, initInterpreterXrplWalletInfo,
  defineXrplCreateAccountBlock, initInterpreterXrplCreateAccount
} from '@/blocks/xrpl/xrplWalletBlock';
import {
  defineXrplTokenSelectBlock,
  defineXrplCreateNewTokenBlock, initInterpreterXrplCreateNewToken,
  defineXrplTokenAmountSetBlock, initInterpreterXrplTokenAmountSet,
  defineXrplTokenAmountArithmeticBlock, initInterpreterXrplTokenAmountArithmetic
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
} from '@/blocks/xrpl/xrplSubmitBlock';
import {
  defineXrplTrustSetTxnBlock, initInterpreterXrplTrustSetTxn
} from '@/blocks/xrpl/xrplTrustSetTransactionBlock';
import {
  defineXrplGetTxnInfoBlock, initInterpreterXrplGetTxnInfoBlock,
  defineXrplExtractOfferCreateTxnBlock, initInterpreterXrplExtractOfferCreateTxnBlock
} from '@/blocks/xrpl/xrplAnalyticsTxnBlock';
import {
  defineXrplTxnTypeSelectBlock
} from '@/blocks/xrpl/xrplTransactionTypeBlock';
import {
  defineNFTokenBuyOfferBlock, initInterpreterXrplNftokenBuyOffer
} from '@/blocks/xrpl/xrplNFTokenBlock';
import { 
  defineTextUtilInspectPrintBlock, initInterpreterTextUtilInspectPrint,
} from '@/blocks/text/textPrintBlock';
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
import {
  defineJsonEditorBlock,
  defineJsonPopupBlock,
} from '@/blocks/dev/devModalBlock';
import {
  defineChartOrderBookBlock, initInterpreterChartOrderBook,
  defineChartRandomOrderBookDataBlock, initInterpreterChartRandomOrderBookData,
  defineChartBitbankDepthToOrderBookBlock, initInterpreterChartBitbankDepthToOrderBook,
  defineChartextractBalancedOrderBookBlock, initInterpreterChartExtractBalancedOrderBook,
  defineChartBitrueDepthToOrderBookBlock, initInterpreterChartBitrueDepthToOrderBook
} from '@/blocks/chart/chartBlock';
import {
  defineFormModalBlock, initInterpreterFormModal,
  defineFormSubmittedBlock, initInterpreterFormSubmitted,
  defineFormVariableGetBlock, initInterpreterFormVariableGet
} from '@/blocks/form/formBlock';
import { defineWaitForSecondsBlock, initInterpreterWaitForSeconds } from '@/blocks/control/waitForSecondsBlock';
import { defineControlRunSpeedBlock, initInterpreterControlRunSpeed } from '@/blocks/control/controlRunSpeed';
import {
  defineArrayInitBlock,
  defineArrayAppendBlock,
  defineListSortJsonValueBlock, initInterpreterListSortJsonValue
} from '@/blocks/list/arrayInitBlock';
import { defineDynamicListCreate, defineDynamicTextJoin, defineDynamicIf } from '@/blocks/plugins/pluginDynamicConnection';
import { 
  defineXamanSimpleLoginBlock, initInterpreterXamanSimpleLogin,
  defineXamanSimpleLogoutBlock, initInterpreterXamanSimpleLogout
 } from '@/blocks/xaman/xamanSimpleLoginBlock';
import { 
  defineXamanPaymentBlock, initInterpreterXamanPayment,
  defineXamanWaitForSignatureBlock, initInterpreterXamanWaitForSignatureBlock,
  defineXamanPayloadSetBlock, initInterpreterXamanPayloadSet
} from '@/blocks/xaman/xamanPayloadBlock';
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
import { 
  defineTextToUpperCaseBlock,
  defineTextToLowerCaseBlock,
  defineNumberToTextBlock,
  defineTextToNumberBlock
} from '@/blocks/text/textConvertBlock';
import { defineTextBlockCommentBlock } from '@/blocks/text/textCommentBlock';
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
import {
  defineWebApiRequestBlock, initInterpreterWebApiRequest,
  defineDynamicWebApiHeadersBlock,
  defineWebApiHeaderBlock,
  defineWebApiKvBlock,
  defineWebApiUrlParametersBlock, initInterpreterWebApiUrlParameters
} from '@/blocks/webapi/webapiBlock';
import {
  defineXrplNftBuyOffersCommandBlock, initInterpreterXrplNftBuyOffersCommand
} from '@/blocks/xrpl/xrplPathAndOrderBookBlock';
/*
import {
  defineNotionCreateClientBlock, initInterpreterNotionCreateClient,
  defineNotionCreateDatabaseBlock, initInterpreterNotionCreateDatabase,
  defineNotionAddRecordBlock, initInterpreterNotionAddRecord
} from '@/blocks/notion/notionDatabaseBlock';
*/
import { defineCsvBlock, defineCSVSaveBlock, initInterpreterTableCSVSave  } from '@/blocks/table/tableCsvBlock';
import {
  defineCurrentDateTimeBlock, initInterpreterCurrentDateTime,
  defineCreateDateTimeBlock, initInterpreterCreateDateTime,
  defineAdjustDateTimeBlock, initInterpreterAdjustDateTime,
  defineCompareDateTimeBlock, initInterpreterCompareDateTime,
  defineDateTimeTextFormatBlock,
  defineTimezoneBlock,
  defineDatedatetimeToTextBlock, initInterpreterDatedatetimeToText
} from '@/blocks/time/timeBlock';
import { 
  defineFallbackBlock
} from '@/blocks/system/systemBlock';
import { defineConsoleLogBlock } from '@/blocks/debug/consoleLogBlock';
import { BlockColors } from '@/blocks/BlockColors';
//import { BlockStructures } from '@/blocks/BlockStructures';

let workspace:Blockly.WorkspaceSvg;
let flyout:Blockly.WorkspaceSvg;

const toolbox = `
  <xml id="toolbox" style="display: none">
    <category name="XRPL" colour="${BlockColors.xrpl}">
      <block type="xrpl_network_wss_selection"></block>
    </category>
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
  //defineXrplPaymentBlock();
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
  defineXrplPaymentBlock();
  defineXrplClientSubmitBlock();
  defineXrplClientAutoFillBlock();
  defineXrplExchangeAddressBlock();
  defineXrplTokenSelectBlock();
  defineXrplCreateNewTokenBlock();
  defineXrplTokenAmountSetBlock();
  defineXrplTokenAmountArithmeticBlock();
  defineXrplRipplingTxnBlock();
  defineXrplTrustSetTxnBlock();
  defineBuyTokenOfferTxnBlock();
  defineSaleTokenOfferTxnBlock();
  defineXrplGetTxnInfoBlock();
  defineXrplExtractOfferCreateTxnBlock();
  defineXrplTxnTypeSelectBlock();
  defineNFTokenBuyOfferBlock();
  defineXrplNftBuyOffersCommandBlock();
  defineXrplClioNftInfoBlock();
  

  // Xaman Wallet
  defineXamanSimpleLoginBlock();
  defineXamanSimpleLogoutBlock();
  defineXamanPaymentBlock();
  defineXamanPayloadSetBlock();
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
  defineTextBlockCommentBlock();

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
  defineChartOrderBookBlock();
  defineChartRandomOrderBookDataBlock();
  defineChartBitbankDepthToOrderBookBlock();
  defineChartextractBalancedOrderBookBlock();
  defineChartBitrueDepthToOrderBookBlock();

  // Modal
  defineFormModalBlock();
  defineFormSubmittedBlock();
  defineFormVariableGetBlock();

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

  // Web API
  defineWebApiRequestBlock();
  defineDynamicWebApiHeadersBlock();
  defineWebApiHeaderBlock();
  defineWebApiKvBlock();
  defineWebApiUrlParametersBlock();

  // Notion
  //defineNotionCreateClientBlock();
  //defineNotionCreateDatabaseBlock();
  //defineNotionAddRecordBlock();

  // List
  defineArrayAppendBlock();
  defineArrayInitBlock();
  defineListSortJsonValueBlock();

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
  
  // System
  defineFallbackBlock();

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
  initInterpreterXrplPayment(interpreter, scope);
  initInterpreterXrplCreateNewToken(interpreter, scope);
  initInterpreterXrplTokenAmountSet(interpreter, scope);
  initInterpreterXrplTokenAmountArithmetic(interpreter, scope);
  initInterpreterXrplRipplingTxn(interpreter, scope);
  initInterpreterXrplTrustSetTxn(interpreter, scope);
  initInterpreterXrplGetTxnInfoBlock(interpreter, scope);
  initInterpreterBuyTokenOfferTxn(interpreter, scope);
  initInterpreterSaleTokenOfferTxn(interpreter, scope);
  initInterpreterXrplTxCommand(interpreter, scope);
  initInterpreterXrplExtractOfferCreateTxnBlock(interpreter, scope);
  initInterpreterXrplUnsubscribeAllTxn(interpreter, scope);
  initInterpreterXrplAccountLinesCommand(interpreter, scope);
  initInterpreterXrplNftokenBuyOffer(interpreter, scope);
  initInterpreterXrplNftBuyOffersCommand(interpreter, scope);
  initInterpreterXrplClioNftInfo(interpreter, scope);

  initInterpreterXamanSimpleLogin(interpreter, scope);
  initInterpreterXamanSimpleLogout(interpreter, scope);
  initInterpreterXamanPayment(interpreter, scope);
  initInterpreterXamanWaitForSignatureBlock(interpreter, scope);
  initInterpreterXamanVariableSet(interpreter, scope);
  initInterpreterXamanVariableGet(interpreter, scope);
  initInterpreterXamanPayloadSet(interpreter, scope);

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

  initInterpreterListSortJsonValue(interpreter, scope);

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

  initInterpreterWebApiRequest(interpreter, scope);
  initInterpreterWebApiUrlParameters(interpreter, scope);

  initInterpreterBuyTokenOfferTxn(interpreter, scope);
  initInterpreterSaleTokenOfferTxn(interpreter, scope);
  //initInterpreterNotionCreateClient(interpreter, scope);
  //initInterpreterNotionCreateDatabase(interpreter, scope);
  //initInterpreterNotionAddRecord(interpreter, scope);
  initInterpreterFormModal(interpreter, scope);
  initInterpreterFormSubmitted(interpreter, scope);
  initInterpreterFormVariableGet(interpreter, scope);

  initInterpreterChartOrderBook(interpreter, scope);
  initInterpreterChartRandomOrderBookData(interpreter, scope);
  initInterpreterChartBitbankDepthToOrderBook(interpreter, scope);
  initInterpreterChartExtractBalancedOrderBook(interpreter, scope);
  initInterpreterChartBitrueDepthToOrderBook(interpreter, scope);
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
  Blockly.setLocale(CustomEn);
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

  //console.log(BlockStructures);

  //console.log('Blockly initialized with workspace:', workspace);
}

export { blocklyInit, initInterpreterEx, workspace, flyout };
