import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

// ビープ音を鳴らすブロック
export const audio_beep: any = {
  "type": "audio_beep",
  "message0": "play beep sound frequency %1 duration %2 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "FREQUENCY",
      "check": blockCheckType.number
    },
    {
      "type": "input_value",
      "name": "DURATION",
      "check": blockCheckType.number
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.control,
  "tooltip": "Plays a beep sound with specified frequency and duration",
  "helpUrl": ""
};

// 音声ファイルを再生するブロック
export const audio_play_sound: any = {
  "type": "audio_play_sound",
  "message0": "play sound %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SOUND",
      "options": [
        ["Notification", "notification"],
        ["Success", "success"],
        ["Error", "error"]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": BlockColors.control,
  "tooltip": "Plays a predefined sound",
  "helpUrl": ""
};

export const defineAudioBlocks = () => {
  Blockly.defineBlocksWithJsonArray([
    audio_beep,
    audio_play_sound
  ]);

  // ビープ音ブロックのコードジェネレーター
  javascriptGenerator.forBlock['audio_beep'] = function(block, generator) {
    const frequency = generator.valueToCode(block, 'FREQUENCY', Order.ATOMIC) || '440';
    const duration = generator.valueToCode(block, 'DURATION', Order.ATOMIC) || '1';
    const code = `playBeep(${frequency}, ${duration});\n`;
    return code;
  };

  // 音声再生ブロックのコードジェネレーター
  javascriptGenerator.forBlock['audio_play_sound'] = function(block, generator) {
    const sound = block.getFieldValue('SOUND');
    const code = `playSound("${sound}");\n`;
    return code;
  };
};

// インタープリタの初期化
export function initInterpreterAudio(interpreter: any, globalObject: any) {
  // ビープ音再生関数
  const playBeepWrapper = interpreter.createAsyncFunction(
    async function(frequency: number, duration: number, callback: Function) {
      try {
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // フェードイン/アウトを設定
        const fadeTime = 0.05;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + fadeTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);

        // 再生終了を待つ
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        callback();
      } catch (error) {
        console.error('Audio playback error:', error);
        callback();
      }
    }
  );

  // プリセット音声再生関数
  const playSoundWrapper = interpreter.createAsyncFunction(
    async function(soundType: string, callback: Function) {
      try {
        const audio = new Audio();
        
        // プリセット音声のURLを設定
        switch (soundType) {
          case 'notification':
            audio.src = '/sounds/open_config.mp3';
            break;
          case 'success':
            audio.src = '/sounds/continue_37.mp3';
            break;
          case 'error':
            audio.src = '/sounds/beep_1.mp3';
            break;
          default:
            audio.src = '/sounds/open_config.mp3';
        }

        // 再生完了を待つ
        await new Promise((resolve, reject) => {
          audio.onended = resolve;
          audio.onerror = reject;
          audio.play().catch(reject);
        });

        callback();
      } catch (error) {
        console.error('Sound playback error:', error);
        callback();
      }
    }
  );

  // 関数を登録
  javascriptGenerator.addReservedWords('playBeep');
  javascriptGenerator.addReservedWords('playSound');
  interpreter.setProperty(globalObject, 'playBeep', playBeepWrapper);
  interpreter.setProperty(globalObject, 'playSound', playSoundWrapper);
}
