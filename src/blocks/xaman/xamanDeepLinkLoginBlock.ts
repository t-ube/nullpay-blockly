import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/blockColors';

export const defineXamanDeepLinkLoginBlock = () => {
  Blockly.Blocks['xaman_login'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Xaman login");
      this.appendDummyInput()
        .appendField("save to")
        .appendField(new Blockly.FieldVariable("userInfo"), "VAR");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(BlockColors.xrpl);
      this.setTooltip('Login to Xaman and save user info to a variable');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator.forBlock['xaman_login'] = function (block, generator) {
    if (generator.nameDB_ === undefined) {
      return `xamanLogin('');\n`;
    }
    const variable = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    const code = `xamanLogin('${variable}');\n`;
    return code;
  };
};

export function initInterpreterXamanDeepLinkLogin(interpreter:any, globalObject:any) {
  javascriptGenerator.addReservedWords('xamanLogin');
  const wrapper = function (variable:any, callback:any) {
    fetch('/api/xaman/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => {
        // Display QR code to user
        const qrCodeUrl = data.refs.qr_png;
        displayQrCode(qrCodeUrl);

        // Connect to WebSocket to wait for user authentication
        const ws = new WebSocket(data.refs.websocket_status);
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.signed) {
            // User signed in successfully
            fetch(`/api/xaman/userinfo?uuid=${data.uuid}`)
              .then(response => response.json())
              .then(userInfo => {
                interpreter.setProperty(globalObject, variable, interpreter.nativeToPseudo(userInfo));
                ws.close();
                callback();
              });
          } else if (message.expired) {
            // QR code expired
            console.error('Xaman login QR code expired');
            ws.close();
            callback();
          }
        };
      })
      .catch(error => {
        console.error('Error logging into Xaman:', error);
        callback();
      });
  };
  interpreter.setProperty(globalObject, 'xamanLogin', interpreter.createAsyncFunction(wrapper));
}

function displayQrCode(url:string) {
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  if (qrCodeContainer) {
    qrCodeContainer.innerHTML = `<img src="${url}" alt="Xumm Login QR Code">`;
    qrCodeContainer.style.display = 'block';
  }
}

function hideQrCode() {
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  if (qrCodeContainer) {
    qrCodeContainer.style.display = 'none';
  }
}
