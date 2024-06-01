'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Split from "react-split";
import Interpreter from 'js-interpreter';
import { PlayIcon, PauseIcon, StopIcon, FolderOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { blocklyInit, initInterpreter, workspace } from '@/blocks/initializer';
import { MainTabs } from '@/components/MainTabs';
import WelcomeDialog from '@/components/WelcomeDialog';
import { DemoBlockXml } from '@/demo/blocksDemo';
import { useReward } from 'react-rewards';
import { setConfettiAnimationFunction } from '@/blocks/confettiAnimationBlock';

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const BlocklyComponent = () => {
  const blocklyAreaRef = useRef<HTMLDivElement>(null);
  const codeArea = useRef<HTMLTextAreaElement>(null);
  const outputArea = useRef<HTMLTextAreaElement>(null);
  const cancelledRef = useRef(false);
  const suspendRef = useRef(false);
  const highlightedBlockId = useRef<string>('');
  const [playState, setPlayState] = useState<string>('init');
  const myInterpreter = useRef<Interpreter | null>(null);
  const [selectedTab, setSelectedTab] = useState("log");
  const [isMobileView, setIsMobileView] = useState(false);
  const { reward, isAnimating } = useReward("confettiItem", "confetti");
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(0);

  useInterval(() => {
    if (!isAnimating && isRunning) {
      reward();
    }
  }, 1000);

  useEffect(() => {
    const confettiAnimationInternal = (duration: number) => {
      setIsRunning(true);
      setDuration(duration);
    };
    setConfettiAnimationFunction(confettiAnimationInternal);
  }, [reward, isAnimating]);

  const updateIsMobileView = () => {
    setIsMobileView(window.innerWidth <= 932);
  };

  useEffect(() => {
    if (isRunning && duration > 0) {
      const timer = setTimeout(() => {
        setIsRunning(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, duration]);

  useEffect(() => {
    updateIsMobileView();
    window.addEventListener('resize', updateIsMobileView);

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

  function getButtons() {
    return (
      <>
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
      </>
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

  const handleDragEnd = () => {
    if (blocklyAreaRef.current) {
      Blockly.svgResize(workspace);
      window.dispatchEvent(new Event('resize'));
    }
  };

  const handleDrag = () => {
    window.dispatchEvent(new Event('resize'));
  };

  const handleShowDemo = useCallback(() => {
    const blockDom = Blockly.utils.xml.textToDom(DemoBlockXml);
    if (Blockly && workspace && blockDom) {
      Blockly.Xml.domToWorkspace(blockDom, workspace);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className={`flex-none ${isMobileView ? 'py-1' : 'py-2'} bg-white px-4 shadow flex`}>
          <Image
            src="/nullpay-256.png"
            alt="nullpay Logo"
            width={40}
            height={40}
          />
          <h1 className="px-4" style={{fontWeight:'bold', userSelect: 'none'}}>null pay</h1>
        </header>
        <div className="border-t border-gray-300"></div>
        <div className="flex flex-1 overflow-hidden">
          <Split
            className="flex flex-1"
            sizes={[70, 30]}
            minSize={100}
            gutterSize={10}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-center items-center text-center w-full h-full bg-white">
              <div id="blocklyArea" ref={blocklyAreaRef} className="w-full h-full flex justify-center items-center">
                <span className="text-lg">Loading Workspace...</span>
                <span id="confettiItem" style={{zIndex: 99}} />
              </div>
            </div>
            <div className="flex flex-col bg-white p-2 border-l">
              <div className="flex space-x-2 mb-2">
                {getButtons()}
              </div>
              <div className="flex-1 flex flex-col">
                <MainTabs page={selectedTab} onTabChange={handleTabChange} />
                <div style={{ display: selectedTab === 'log' ? 'flex' : 'none' }} className='py-1 flex-1 overflow-auto'>
                  <textarea ref={outputArea} id="outputArea" className="px-1 w-full h-full resize-none border"></textarea>
                </div>
                <div style={{ display: selectedTab === 'code' ? 'flex' : 'none' }} className='py-1 flex-1 overflow-auto'>
                  <textarea ref={codeArea} id="codeArea" className="px-1 w-full h-full resize-none border"></textarea>
                </div>
              </div>
            </div>
          </Split>
        </div>
        <footer className="flex-none bg-white text-gray-800 p-1 text-center w-full border-t">
          <p style={{fontSize: '12px'}}>© 2024 null pay - All Rights Reserved</p>
        </footer>
      </div>
      <div id="blocklyDiv" style={{ position: 'absolute' }}></div>
      <WelcomeDialog onYes={handleShowDemo} />
    </>
  );
};

export default BlocklyComponent;