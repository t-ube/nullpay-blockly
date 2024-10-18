import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

export const xrpl_payload_nftoken_mint: any = {
  "type": "xrpl_payload_nftoken_mint",
  "message0": "NFToken Mint",
  "message1": "Account %1",
  "args1": [
    {
      "type": "input_value",
      "name": "ACCOUNT",
      "check": blockCheckType.string
    }
  ],
  "message2": "NFTokenTaxon %1",
  "args2": [
    {
      "type": "input_value",
      "name": "NFTOKEN_TAXON",
      "check": blockCheckType.number
    }
  ],
  "message3": "URI %1",
  "args3": [
    {
      "type": "input_value",
      "name": "URI",
      "check": blockCheckType.string
    }
  ],
  "message4": "Flags:",
  "message5": "Burnable %1",
  "args5": [
    {
      "type": "field_checkbox",
      "name": "FLAG_BURNABLE",
      "checked": true
    }
  ],
  "message6": "OnlyXRP %1",
  "args6": [
    {
      "type": "field_checkbox",
      "name": "FLAG_ONLY_XRP",
      "checked": false
    }
  ],
  "message7": "Transferable %1",
  "args7": [
    {
      "type": "field_checkbox",
      "name": "FLAG_TRANSFERABLE",
      "checked": true
    }
  ],
  "message8": "TransferFee %1",
  "args8": [
    {
      "type": "input_value",
      "name": "TRANSFER_FEE",
      "check": blockCheckType.number
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "colour": BlockColors.xrpl,
  "tooltip": "Creates an NFTokenMint transaction",
  "helpUrl": ""
};

export const defineXrplNFTokenMintBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_nftoken_mint
  ]);

  // JavaScript code generator for the NFTokenMint block
  javascriptGenerator.forBlock['xrpl_payload_nftoken_mint'] = function(block, generator) {
    const account = generator.valueToCode(block, 'ACCOUNT', Order.ATOMIC) || '""';
    const nftokenTaxon = generator.valueToCode(block, 'NFTOKEN_TAXON', Order.ATOMIC) || '0';
    const uri = generator.valueToCode(block, 'URI', Order.ATOMIC) || '""';
    
    // Calculate flags
    let flags = 0;
    if (block.getFieldValue('FLAG_BURNABLE') === 'TRUE') flags |= 1;
    if (block.getFieldValue('FLAG_ONLY_XRP') === 'TRUE') flags |= 2;
    if (block.getFieldValue('FLAG_TRANSFERABLE') === 'TRUE') flags |= 8;
    
    const transferFee = generator.valueToCode(block, 'TRANSFER_FEE', Order.ATOMIC) || '0';

    const code = `xrplNFTokenMintTxn(${account}, ${nftokenTaxon}, ${uri}, ${flags}, ${transferFee})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplNFTokenMintTxn(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplNFTokenMintTxn');
  const wrapper = function (account: string, nftokenTaxon: number, uri: string, flags: number, transferFee: number) {
    const transaction = {
      TransactionType: 'NFTokenMint',
      Account: account,
      NFTokenTaxon: nftokenTaxon,
      URI: uri,
      Flags: flags,
      TransferFee: transferFee
    };
    return interpreter.nativeToPseudo(transaction);
  };
  interpreter.setProperty(globalObject, 'xrplNFTokenMintTxn', interpreter.createNativeFunction(wrapper));
}

export const xrpl_payload_nft_buy_offer : any = {
  "type": "xrpl_payload_nft_buy_offer",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label",
      "text": "NFT buy offer payload",
      "class": "title-label"
    }
  ],
  "message1": "%1 %2",
  "args1": [
    {
      "type": "field_label",
      "text": "Owner address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "OWNER_ID",
      "check": blockCheckType.string
    }
  ],
  "message2": "%1 %2",
  "args2": [
    {
      "type": "field_label",
      "text": "NFT ID",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "NFT_ID",
      "check": blockCheckType.string
    }
  ],
  "message3": "%1 %2",
  "args3": [
    {
      "type": "field_label",
      "text": "Amount",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": [blockCheckType.xrplTokenAmount, blockCheckType.number]
    }
  ],
  "message4": "%1 %2",
  "args4": [
    {
      "type": "field_label",
      "text": "Expiration (Ripple epoch)",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "EXPIRATION_RIPPLE_EPOCH",
      "check": null
    }
  ],
  "message5": "%1 %2",
  "args5": [
    {
      "type": "field_label",
      "text": "Destination address",
      "class": "args-label"
    },
    {
      "type": "input_value",
      "name": "DESTINATION_ADDRESS",
      "check": null
    }
  ],
  "output": blockCheckType.xrplTxnPayload,
  "inputsInline": false,
  "colour": BlockColors.xrpl,
  "tooltip": "Create an NFT buy offer payload with the specified token details and offer amount",
  "helpUrl": ""
};

export const defineNFTokenBuyOfferBlock = () => {
  Blockly.defineBlocksWithJsonArray([
    xrpl_payload_nft_buy_offer
  ]);

  javascriptGenerator.forBlock['xrpl_payload_nft_buy_offer'] = function(block, generator) {
    const ownerID = generator.valueToCode(block, 'OWNER_ID', Order.NONE) || '""';
    const tokenID = generator.valueToCode(block, 'NFT_ID', Order.NONE) || '""';
    const amount = generator.valueToCode(block, 'AMOUNT', Order.NONE) || '"0"';
    const expiration = generator.valueToCode(block, 'EXPIRATION_RIPPLE_EPOCH', Order.NONE) || 'null';
    const destination = generator.valueToCode(block, 'DESTINATION_ADDRESS', Order.NONE) || '""';
    const code = `xrplNftokenBuyOffer(${ownerID},${tokenID},JSON.stringify(${amount}),${expiration},${destination})`;
    return [code, Order.ATOMIC];
  };
};

export function initInterpreterXrplNftokenBuyOffer(interpreter: any, globalObject: any) {
  javascriptGenerator.addReservedWords('xrplNftokenBuyOffer');
  const wrapper = function (ownerID: string, tokenID: string, amountText: string, expiration: number, destination: string) {
    let payload : any = {};

    try {
      const amount = JSON.parse(amountText);
      
      payload = {
        TransactionType: 'NFTokenCreateOffer',
        Owner: ownerID,
        NFTokenID: tokenID,
        Amount: typeof amount === 'number' ? String(amount) : amount
      };

      if (expiration !== null) {
        payload.Expiration = expiration;
      }
      if (destination.length > 0) {
        payload.Destination = destination;
      }
      
      return interpreter.nativeToPseudo(payload);
    } catch (error) {
      console.error(`Failed to parse json: ${amountText}`);
    }
  };
  interpreter.setProperty(globalObject, 'xrplNftokenBuyOffer', interpreter.createNativeFunction(wrapper));
}
