'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import Interpreter from 'js-interpreter';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { blocklyInit, initInterpreter, workspace } from '@/blocks/initializer';
import { MainTabs } from '@/components/MainTabs';

const BlocklyComponent = () => {
  const codeArea = useRef<HTMLTextAreaElement>(null);
  const outputArea = useRef<HTMLTextAreaElement>(null);
  const cancelledRef = useRef(false);
  const suspendRef = useRef(false);
  const highlightedBlockId = useRef<string>('');
  const [playState, setPlayState] = useState<string>('init');
  const myInterpreter = useRef<Interpreter | null>(null);
  const [selectedTab, setSelectedTab] = useState("log");

  useEffect(() => {
    blocklyInit();
    
    const saveWorkspaceButton = document.getElementById('saveWorkspaceButton');
    if (saveWorkspaceButton) {
      saveWorkspaceButton.addEventListener('click', () => {
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xml);
        const blob = new Blob([xmlText], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workspace.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }

    const loadWorkspaceButton = document.getElementById('loadWorkspaceButton');
    if (loadWorkspaceButton) {
      loadWorkspaceButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xml';
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const xmlText = e.target?.result as string;
              const xml = Blockly.utils.xml.textToDom(xmlText);
              Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
            };
            reader.readAsText(file);
          }
        };
        input.click();
      });
    }
  }, []);

  const initApi = useCallback(async (interpreter: Interpreter, scope: any) => {
    const wrapper = (text: string) => {
      text = text ? text.toString() : '';
      if (outputArea.current) {
        outputArea.current.value += `\n${text}`;
      }
    };
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));

    // Add an API function for highlighting blocks.
    const wrapperHighlight = function (id:string) {
      id = String(id || '');
      highlightedBlockId.current = id;
      return highlightBlock(id);
    };
    interpreter.setProperty(
      scope,
      'highlightBlock',
      interpreter.createNativeFunction(wrapperHighlight),
    );
    initInterpreter(interpreter, scope);
    
  },[]);

  const playCode = useCallback(async () => {
    
    if (cancelledRef.current) {
      clearHighlight();
      myInterpreter.current = null;
      if (outputArea.current) {
        outputArea.current.value += '\n<< Execution cancelled >>';
      }
      setPlayState('init');
      cancelledRef.current = false;
      return;
    }
    if (suspendRef.current) {
      setTimeout(() => {
        playCode();
      }, 10);
      return;
    }

    let interpreterTemp = myInterpreter.current;
    if (!interpreterTemp) {
      const code = javascriptGenerator.workspaceToCode(workspace);
      interpreterTemp = new Interpreter(code, initApi);
      outputArea.current!.value = '';
    }

    let hasMoreCode = interpreterTemp.step();
    if (hasMoreCode) {
      myInterpreter.current = interpreterTemp;
      setTimeout(playCode, 10);
    } else {
      clearHighlight();
      myInterpreter.current = null;
      if (outputArea.current) {
        outputArea.current!.value += '\n\n<< Program complete >>';
      }
      setPlayState('init');
    }

  },[initApi, myInterpreter]);
  
  useEffect(() => {
    // State Management
    if (playState === 'start') {
      suspendRef.current = false;
      cancelledRef.current = false;
      playCode();
    } else if (playState === 'resume') {
      suspendRef.current = false;
    } else if (playState === 'suspend') {
      suspendRef.current = true;
    } else if (playState === 'init') {

    } else if (playState === 'cancel') {
      cancelledRef.current = true;
    }
  }, [playState, playCode]);

  function highlightBlock(id:string) {
    workspace.highlightBlock(id);
  }

  function clearHighlight() {
    workspace.highlightBlock(null);
  }
  
  function getStartButton () {
    if (playState === 'start' || playState === 'resume') {
      return (<></>);
    } else if (playState === 'init' || playState === 'cancel') {
      return (
        <button
          id="executeCodeButton" 
          className="flex items-center px-3 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200"
          onClick={() => setPlayState('start')}
        >
          <PlayIcon className="h-5 w-5 mr-2"/>Run
        </button>
      );
    }
    return (
      <button
        id="resumeExecutionButton"
        className="flex items-center px-3 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-700 transition duration-200"
        onClick={() => setPlayState('resume')}
      >
        <PlayIcon className="h-5 w-5 mr-2"/>Run
      </button>
    );
  }

  function getStopButton () {
    if (playState === 'start' || playState === 'resume') {
      return (
        <button
          id="suspendExecutionButton"
          className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-700 transition duration-200"
          onClick={() => setPlayState('suspend')}
        >
          <PauseIcon className="h-5 w-5 mr-2"/>Pause
        </button>
      );
    }
    return (<></>);
  }

  function getEndButton() {
    const isDisabled = false;
    return (
      <button
        id="cancelExecutionButton"
        className={`flex items-center px-3 py-2 text-white rounded shadow hover:bg-red-700 transition duration-200 ${
          isDisabled ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
        }`}
        disabled={isDisabled}
        onClick={() => setPlayState('cancel')}
      >
        <StopIcon className="h-5 w-5 mr-2" />End
      </button>
    );
  }

  const handleTabChange = (newValue: string) => {
    if (newValue === 'code') {
      const code = `${javascriptGenerator.workspaceToCode(workspace)}`;
      if (codeArea.current) {
        const cleanedCode = code.replace(/highlightBlock\(.*?\);\n/g, '');
        codeArea.current.value = cleanedCode;
      }
    }
    setSelectedTab(newValue);
  };

  return (
    <>
      <div className='flex space-x-2'>
        <table style={{ height: '100vh', width: '100%' }}>
          <thead>
            <tr>
              <th colSpan={2}>
                <h1>Cheat Block - Blockly with XRPL</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '70%' }}>
                <div id="blocklyArea" style={{ height: 'calc(100vh - 63px)', width: '100%' }} className="bg-white">
                  <div className='bg-white flex justify-center items-center text-center'>
                    Loading Workspace...
                  </div>
                </div>
              </td>
              <td style={{ width: '30%' }}>
                <div className='bg-white px-2 py-2' style={{ height: 'calc(100vh - 63px)', overflowY: 'auto' }}>
                  <div className='flex space-x-2'>
                    {getStartButton()}
                    {getStopButton()}
                    {getEndButton()}
                    <div className="border-l border-gray-300 h-10 mx-2"></div>
                    <button id="saveWorkspaceButton" className="flex items-center px-3 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-700 transition duration-200">
                      <DocumentArrowDownIcon className="h-5 w-5 mr-2" />Save
                    </button>
                    <button id="loadWorkspaceButton" className="flex items-center px-3 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-700 transition duration-200">
                      <FolderOpenIcon className="h-5 w-5 mr-2" />Load
                    </button>
                  </div>
                  <MainTabs page={selectedTab} onTabChange={handleTabChange}>
                    <div style={{ display: selectedTab === 'log' ? 'block' : 'none' }} className='px-5 py-1'>
                      <textarea ref={outputArea} id="outputArea" style={{ height: '200px', width: '100%' }}></textarea>
                    </div>
                    <div style={{ display: selectedTab === 'code' ? 'block' : 'none' }} className='px-5 py-1'>
                      <textarea ref={codeArea} id="codeArea" style={{ height: '200px', width: '100%' }}></textarea>
                    </div>
                  </MainTabs>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ height: '30px' }}>
                footer
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="blocklyDiv" style={{ position: 'absolute' }}></div>
    </>
  );
};

export default BlocklyComponent;
