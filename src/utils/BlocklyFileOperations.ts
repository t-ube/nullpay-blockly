import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

export const saveWorkspaceXML = (workspace: Blockly.WorkspaceSvg) => {
  const xml = Blockly.Xml.workspaceToDom(workspace);
  const blocks = xml.getElementsByTagName('block');
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].getAttribute('type') === 'text_onetime_block') {
      const fields = blocks[i].getElementsByTagName('field');
      for (let j = 0; j < fields.length; j++) {
        if (fields[j].getAttribute('name') === 'INPUT') {
          fields[j].textContent = '';
        }
      }
    }
  }
  const xmlText = Blockly.Xml.domToPrettyText(xml);
  const blob = new Blob([xmlText], { type: 'text/xml; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'workspace.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const saveWorkspaceMachineLearningFile = (workspace: Blockly.WorkspaceSvg) => {
  const save = (prompt:string) => {
    let jsonlData;
    if (false) {
      const state = Blockly.serialization.workspaces.save(workspace);
      jsonlData = JSON.stringify({
        prompt: prompt,
        completion: JSON.stringify(state)
      }) + '\n';
    } else {
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xml);
      jsonlData = JSON.stringify({
        prompt: prompt,
        completion: xmlText
      }) + '\n';
    }
    const blob = new Blob([jsonlData], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blockly_training_data.jsonl';
    a.click();
    URL.revokeObjectURL(url);
  };
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
    z-index: 10;
  `;
  const content = document.createElement('div');
  content.style.cssText = `
    background: white; padding: 20px; border-radius: 5px;
    display: flex; flex-direction: column;
  `;
  const textarea = document.createElement('textarea');
  textarea.style.cssText = 'width: 300px; height: 100px; margin-bottom: 10px;';
  textarea.placeholder = 'このBlocklyプログラムの説明を入力してください';
  
  const saveButton = document.createElement('button');
  saveButton.textContent = '保存';
  saveButton.onclick = () => {
    const prompt = textarea.value;
    if (prompt) {
      save(prompt);
    }
    document.body.removeChild(modal);
  };
  
  content.appendChild(textarea);
  content.appendChild(saveButton);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

export const downloadMlTrainingData = (prompt: string, xmlText: string) : void => {
  let jsonlData;
  jsonlData = JSON.stringify({
    prompt: prompt,
    completion: xmlText
  }) + '\n';
  const blob = new Blob([jsonlData], { type: 'application/jsonl' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'blockly_training_data.jsonl';
  a.click();
  URL.revokeObjectURL(url);
}

export const downloadXMLFromText = (xmlText: string) : void => {
  const blob = new Blob([xmlText], { type: 'text/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `blockly_code.xml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const saveWorkspaceJson = (workspace: Blockly.WorkspaceSvg) => {
  const state = Blockly.serialization.workspaces.save(workspace);
  const clearOneTimeBlocks = (block: any) => {
    if (block.type === 'text_onetime_block') {
      if (block.fields && 'INPUT' in block.fields) {
        block.fields.INPUT = '';
      }
    }
    if (block.inputs) {
      Object.values(block.inputs).forEach((input: any) => {
        if (input.block) {
          clearOneTimeBlocks(input.block);
        }
      });
    }
    if (block.next && block.next.block) {
      clearOneTimeBlocks(block.next.block);
    }
  };
  if (state.blocks !== undefined && 'blocks' in state.blocks) {
    state.blocks.blocks.forEach((block: any) => clearOneTimeBlocks(block));
  }
  const jsonState = JSON.stringify(state);
  const blob = new Blob([jsonState], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'workspace.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const convertMachineLearnFileXMLtoJson = (workspace: Blockly.WorkspaceSvg) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.jsonl';
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        const fileName = file.name.toLowerCase();
        if (fileName.endsWith('.jsonl')) {
          console.log(fileName);
          try {
            const lines = fileContent.split('\n');
            const convertedEntries = [];
            for (const line of lines) {
              if (line.trim()) {
                const json = JSON.parse(line);
                if (json.completion && typeof json.completion === 'string') {
                  const headlessWorkspace = new Blockly.Workspace();
                  const xml = Blockly.utils.xml.textToDom(json.completion);
                  Blockly.Xml.domToWorkspace(xml, headlessWorkspace);
                  const state = Blockly.serialization.workspaces.save(headlessWorkspace);
                  convertedEntries.push({
                    prompt: json.prompt,
                    completion: JSON.stringify(state)
                  });
                }
              }
            }
            const convertedJsonl = convertedEntries.map(entry => JSON.stringify(entry)).join('\n');
            const blob = new Blob([convertedJsonl], { type: 'application/jsonl' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted_' + fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            if (convertedEntries.length > 0) {
              Blockly.serialization.workspaces.load(JSON.parse(convertedEntries[convertedEntries.length - 1].completion), workspace);
              workspace.scrollCenter();
            }
          } catch (error) {
            console.error('Failed to load or convert JSONL:', error);
          }
        } else {
          console.error('Unsupported file type:', file.type);
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

export const loadWorkspace = (workspace: Blockly.WorkspaceSvg, callback: () => void) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml, .json, .jsonl';
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        const fileName = file.name.toLowerCase();
        if (file.type === 'application/json') {
          try {
            const json = JSON.parse(fileContent);
            Blockly.serialization.workspaces.load(json, workspace);
            workspace.scrollCenter();
          } catch (error) {
            console.error('Failed to load JSON:', error);
          }
        } else if (file.type === 'text/xml' || file.type === 'application/xml') {
          try {
            const xml = Blockly.utils.xml.textToDom(fileContent);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
            workspace.scrollCenter();
          } catch (error) {
            console.error('Failed to load XML:', error);
          }
        } else if (fileName.endsWith('.jsonl')) {
          try {
            const lines = fileContent.split('\n');
            for (const line of lines) {
              if (line.trim()) {
                const json = JSON.parse(line);
                if (json.completion && typeof json.completion === 'string') {
                  const xml = Blockly.utils.xml.textToDom(json.completion);
                  Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
                  workspace.scrollCenter();
                }
              }
              break;
            }
          } catch (error) {
            console.error('Failed to load JSONL:', error);
          }
        } else {
          console.error('Unsupported file type:', file.type);
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}
