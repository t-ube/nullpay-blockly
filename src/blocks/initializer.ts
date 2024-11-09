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
  defineXrplAccountLinesCommandBlock, initInterpreterXrplAccountLinesCommand,
  defineXrplGetAccountActivatorsBlock, initInterpreterXrplGetAccountActivators,
  defineXrplGetActivatedAccountsBlock, initInterpreterXrplGetActivatedAccounts
} from '@/blocks/xrpl/xrplAccountInfoBlock';
//import { defineXrplSubscribeAllTxnBlock, initInterpreterXrplSubscribeAllTxn } from '@/blocks/xrpl/xrplSubscribeStreamsTxnBlock';
import { defineXrplClientInitializeBlock, initInterpreterXrplClientInitialize } from '@/blocks/xrpl/xrplClientInitializeBlock';
import {
  defineXrplSubscribeAccountTxnBlock, initInterpreterXrplSubscribeAccountTxn,
  defineXrplUnsubscribeAccountTxnBlock, initInterpreterXrplUnsubscribeAccountTxn,
  defineXrplSubscribeAllTxnBlock, initInterpreterXrplSubscribeAllTxn,
  defineXrplUnsubscribeAllTxnBlock, initInterpreterXrplUnsubscribeAllTxn,
  defineXrplSubscribeFilteredTransactionsBlock, initInterpreterXrplSubscribeFilteredTransactions,
  defineXrplUnsubscribeFilteredTransactionsBlock, initInterpreterXrplUnsubscribeFilteredTransactions,
  defineXrplSubscribeFirstLedgerAmmTransactionsBlock, initInterpreterXrplFirstLedgerAmmSubscribeTransactions,
  defineXrplSubscribeXpmAmmTransactionsBlock, initInterpreterXrplXpmAmmSubscribeTransactions
} from '@/blocks/xrpl/xrplSubscribeBlock';
import {
  // defineXrplPaymentBlock,
  defineXrplPaymentTokenTxnBlock, initInterpreterXrplPaymentTokenTxn,
  defineXrplPaymentBlock, initInterpreterXrplPayment
} from '@/blocks/xrpl/xrplPaymentTransactionBlock';
import {
  defineXrplLoadWalletBlock, initInterpreterXrplLoadWallet,
  defineXrplWalletSignBlock, initInterpreterXrplWalletSign,
  defineXrplWalletInfoBlock, initInterpreterXrplWalletInfo,
  defineXrplCreateAccountBlock, initInterpreterXrplCreateAccount,
  defineXrplLoadWalletFromSecretNumbersBlock, initInterpreterXrplLoadWalletFromSecretNumbers,
  defineXrplWalletBalanceBlock, initInterpreterXrplWalletBalance
} from '@/blocks/xrpl/xrplWalletBlock';
import {
  defineXrplTokenSelectBlock,
  defineXrplCreateNewTokenBlock, initInterpreterXrplCreateNewToken,
  defineXrplTokenAmountSetBlock, initInterpreterXrplTokenAmountSet,
  defineXrplTokenAmountArithmeticBlock, initInterpreterXrplTokenAmountArithmetic
} from '@/blocks/xrpl/xrplTokenBlock';
import {
  defineXrplRipplingTxnBlock, initInterpreterXrplRipplingTxn,
  defineXrplAccountFlagsBlock, initInterpreterXrplAccountFlags
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
  defineXrplTrustSetTxnBlock, initInterpreterXrplTrustSetTxn,
  defineXrplDecodeCurrencyBlock, initInterpreterXrplDecodeCurrency,
  defineXrplTrustSetRemoveTxnBlock, initInterpreterXrplTrustSetRemoveTxn
} from '@/blocks/xrpl/xrplTrustSetTransactionBlock';
import {
  defineXrplGetTxnInfoBlock, initInterpreterXrplExtractTransactionDetailsBlock,
  defineXrplExtractOfferCreateTxnBlock, initInterpreterXrplExtractOfferCreateTxnBlock
} from '@/blocks/xrpl/xrplAnalyticsTxnBlock';
import {
  defineXrplTxnTypeSelectBlock
} from '@/blocks/xrpl/xrplTransactionTypeBlock';
import {
  defineXrplNFTokenMintBlock, initInterpreterXrplNFTokenMintTxn,
  defineNFTokenBuyOfferBlock, initInterpreterXrplNftokenBuyOffer
} from '@/blocks/xrpl/xrplNFTokenBlock';
import { 
  defineTextUtilInspectPrintBlock, initInterpreterTextUtilInspectPrint,
} from '@/blocks/text/textPrintBlock';
import { 
  defineUndefinedBlock,
  defineTrueBlock,
  defineFalseBlock
} from '@/blocks/logic/logicBlock';
import { 
  defineJsonGetValueBlock,
  defineJsonToTextV2Block,
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
  defineChartBitrueDepthToOrderBookBlock, initInterpreterChartBitrueDepthToOrderBook,
  defineChartCoinbaseBookToOrderBookBlock, initInterpreterChartCoinbaseBookToOrderBook,
} from '@/blocks/chart/chartBlock';
import {
  defineFormModalBlock, initInterpreterFormModal,
  defineFormSubmittedBlock, initInterpreterFormSubmitted,
  defineFormVariableGetBlock, initInterpreterFormVariableGet
} from '@/blocks/form/formBlock';
import { 
  defineWaitForSecondsBlock, initInterpreterWaitForSeconds,
  defineWaitUntilDatetimeBlock, initInterpreterWaitUntilDatetime
} from '@/blocks/control/waitForSecondsBlock';
import {
  defineAudioBlocks, initInterpreterAudio
} from '@/blocks/control/audioPlay';
import { defineControlRunSpeedBlock, initInterpreterControlRunSpeed } from '@/blocks/control/controlRunSpeed';
import {
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
  defineTextStartsWithBlock, initInterpreterTextEndsWith,
  defineTextContainsBlock, initInterpreterTextContains
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
import {
  defineMessageModalBlock, initInterpreterMessageModal
} from '@/blocks/message/messageBlock';
import { defineConsoleLogBlock } from '@/blocks/debug/consoleLogBlock';
import { BlockColors } from '@/blocks/BlockColors';
//import { BlockStructures } from '@/blocks/BlockStructures';

let workspace:Blockly.WorkspaceSvg;
let flyout:Blockly.WorkspaceSvg;

const toolbox = `
  <xml id="toolbox" style="display: none">
    <category name="XRPL" colour="${BlockColors.xrpl}">
      <block type="xrpl_select_websocket_endpoint"></block>
    </category>
  </xml>
`;

const createCustomBlocks = () => {
  // XRPL & Xahau
  defineXrplNetworkWssSelectionBlock();
  defineXrplFaucetNetworkSelectionBlock();
  defineXrplCreateAccountBlock();
  defineXrplLoadWalletFromSecretNumbersBlock();
  defineXrplWalletBalanceBlock();
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
  defineXrplSubscribeFilteredTransactionsBlock();
  defineXrplUnsubscribeFilteredTransactionsBlock();
  defineXrplSubscribeFirstLedgerAmmTransactionsBlock();
  defineXrplSubscribeXpmAmmTransactionsBlock();
  defineXrplLoadWalletBlock();
  defineXrplEasySubmitBlock();
  defineXrplTxCommandBlock();
  defineXrplAccountLinesCommandBlock();
  defineXrplGetAccountActivatorsBlock();
  defineXrplGetActivatedAccountsBlock();
  defineXrplWalletSignBlock();
  defineXrplWalletInfoBlock();
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
  defineXrplAccountFlagsBlock();
  defineXrplTrustSetTxnBlock();
  defineXrplDecodeCurrencyBlock();
  defineXrplTrustSetRemoveTxnBlock();
  defineBuyTokenOfferTxnBlock();
  defineSaleTokenOfferTxnBlock();
  defineXrplGetTxnInfoBlock();
  defineXrplExtractOfferCreateTxnBlock();
  defineXrplTxnTypeSelectBlock();
  defineNFTokenBuyOfferBlock();
  defineXrplNFTokenMintBlock();
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
  defineTextContainsBlock();
  defineTextToUpperCaseBlock();
  defineTextToLowerCaseBlock();
  defineTextOnetimeBlock();
  defineTextBlockCommentBlock();

  // JSON
  defineJsonGetValueBlock();
  defineJsonToTextV2Block();
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
  defineChartCoinbaseBookToOrderBookBlock();

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
  defineListSortJsonValueBlock();

  // Control
  defineWaitForSecondsBlock();
  defineWaitUntilDatetimeBlock();
  defineControlRunSpeedBlock();
  defineAudioBlocks();

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

  // Message
  defineMessageModalBlock();
}

const initInterpreter = (interpreter: Interpreter, scope: any) => {

  initInterpreterXrplAccountInfo(interpreter, scope);
  initInterpreterXrplClientInitialize(interpreter, scope);
  initInterpreterXrplSubscribeAccountTxn(interpreter, scope);
  initInterpreterXrplUnsubscribeAccountTxn(interpreter, scope);
  initInterpreterXrplSubscribeAllTxn(interpreter, scope);
  initInterpreterXrplSubscribeFilteredTransactions(interpreter, scope);
  initInterpreterXrplUnsubscribeFilteredTransactions(interpreter, scope);
  initInterpreterXrplFirstLedgerAmmSubscribeTransactions(interpreter, scope);
  initInterpreterXrplXpmAmmSubscribeTransactions(interpreter, scope);
  initInterpreterXrplCreateAccount(interpreter, scope);
  initInterpreterXrplRequestFaucet(interpreter, scope);
  initInterpreterXrplRequestCustomFaucet(interpreter, scope);
  initInterpreterXrplLoadWallet(interpreter, scope);
  initInterpreterXrplWalletSign(interpreter, scope);
  initInterpreterXrplWalletInfo(interpreter, scope);
  initInterpreterXrplLoadWalletFromSecretNumbers(interpreter, scope);
  initInterpreterXrplWalletBalance(interpreter, scope);
  initInterpreterXrplEasySubmit(interpreter, scope);
  initInterpreterXrplClientSubmit(interpreter, scope);
  initInterpreterXrplClientAutofill(interpreter, scope);
  initInterpreterXrplPaymentTokenTxn(interpreter, scope);
  initInterpreterXrplPayment(interpreter, scope);
  initInterpreterXrplCreateNewToken(interpreter, scope);
  initInterpreterXrplTokenAmountSet(interpreter, scope);
  initInterpreterXrplTokenAmountArithmetic(interpreter, scope);
  initInterpreterXrplRipplingTxn(interpreter, scope);
  initInterpreterXrplAccountFlags(interpreter, scope);
  initInterpreterXrplTrustSetTxn(interpreter, scope);
  initInterpreterXrplTrustSetRemoveTxn(interpreter, scope);
  initInterpreterXrplDecodeCurrency(interpreter, scope);
  initInterpreterXrplExtractTransactionDetailsBlock(interpreter, scope);
  initInterpreterBuyTokenOfferTxn(interpreter, scope);
  initInterpreterSaleTokenOfferTxn(interpreter, scope);
  initInterpreterXrplTxCommand(interpreter, scope);
  initInterpreterXrplExtractOfferCreateTxnBlock(interpreter, scope);
  initInterpreterXrplUnsubscribeAllTxn(interpreter, scope);
  initInterpreterXrplAccountLinesCommand(interpreter, scope);
  initInterpreterXrplGetAccountActivators(interpreter, scope);
  initInterpreterXrplGetActivatedAccounts(interpreter, scope);
  initInterpreterXrplNftokenBuyOffer(interpreter, scope);
  initInterpreterXrplNFTokenMintTxn(interpreter, scope);
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
  initInterpreterWaitUntilDatetime(interpreter, scope);
  initInterpreterControlRunSpeed(interpreter, scope);
  initInterpreterConfettiAnimationFunctions(interpreter, scope);
  initInterpreterAudio(interpreter, scope);

  initInterpreterCurrentDateTime(interpreter, scope);
  initInterpreterDatedatetimeToText(interpreter, scope);
  initInterpreterCreateDateTime(interpreter, scope);
  initInterpreterDateTimeToRippleEpoch(interpreter, scope);
  initInterpreterRippleEpochToDateTime(interpreter, scope);
  initInterpreterAdjustDateTime(interpreter, scope);
  initInterpreterCompareDateTime(interpreter, scope);

  initInterpreterTextStartsWith(interpreter, scope);
  initInterpreterTextEndsWith(interpreter, scope);
  initInterpreterTextContains(interpreter, scope);
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
  initInterpreterChartCoinbaseBookToOrderBook(interpreter, scope);

  initInterpreterMessageModal(interpreter, scope);
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
    sounds: false
  });

  workspaceAdjustment();
  handleBlocklyResize();

  //console.log(BlockStructures);

  //console.log('Blockly initialized with workspace:', workspace);
}

export { blocklyInit, initInterpreterEx, workspace, flyout };
