'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import Split from "react-split";
import Interpreter from 'js-interpreter';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { blocklyInit, initInterpreter, workspace } from '@/blocks/initializer';
import { MainTabs } from '@/components/MainTabs';
import WelcomeDialog from '@/components/WelcomeDialog';
import FeatureModal from '@/components/FeatureModal';
import { DemoBlockXml } from '@/demos/blocksDemo';
import { useReward } from 'react-rewards';
import { setConfettiAnimationFunction } from '@/blocks/animation/confettiAnimationBlock';
import BlocklySearchFlyout from '@/components/BlocklySearchFlyout';
import BlocklyDrawer from '@/components/BlocklyDrawer';
import { Sidebar } from '@/components/Sidebar';
import Header from '@/components/Header';
import { PlayState } from '@/components/HeaderButtons';
import { dropBlockToWorkspace, createBlockFromFlyout, addBlockToWorkspace } from '@/utils/BlocklyHelper';
import { releaseInfo } from '@/features/features-v0-r2';

type clientFramePos = {
  headerHeight: number,
  footerHeight: number,
};

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
  const [playState, setPlayState] = useState<PlayState>('init');
  const myInterpreter = useRef<Interpreter | null>(null);
  const [selectedTab, setSelectedTab] = useState("log");
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { reward, isAnimating } = useReward("confettiItem", "confetti");
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [openFlyout, setOpenFlyout] = useState<boolean>(false);
  const [flyoutType, setFlyoutType] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [clientFramePos, setClientFramePos] = useState<clientFramePos>({
    headerHeight: 42,
    footerHeight: 27
  });

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
              workspace.scrollCenter();
            };
            reader.readAsText(file);
          }
        };
        input.click();
      });
    }

    const handleResize = () => {
      if (headerRef.current && footerRef.current) {
        setClientFramePos({
          headerHeight: headerRef.current.offsetHeight + 1,
          footerHeight: footerRef.current.offsetHeight + 1
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // Add the code generation listener
    const supportedEvents = new Set([
      Blockly.Events.BLOCK_CHANGE,
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_MOVE,
    ]);

    const updateCode = (event:Blockly.Events.Abstract) => {
      if (workspace.isDragging()) return; // Don't update while changes are happening.
      if (!supportedEvents.has(event.type)) return;
      const code = `${javascriptGenerator.workspaceToCode(workspace)}`;
      if (codeArea.current) {
        const cleanedCode = code.replace(/highlightBlock\(.*?\);\n/g, '');
        codeArea.current.value = cleanedCode;
      }
    };

    workspace.addChangeListener(updateCode);

    return () => {
      window.removeEventListener('resize', updateIsMobileView);
      window.removeEventListener('resize', handleResize);
      workspace.removeChangeListener(updateCode);
    };
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
    const wrapperHighlight = function (id: string) {
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
    
  }, []);

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

  }, [initApi, myInterpreter]);
  
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

  function highlightBlock(id: string) {
    workspace.highlightBlock(id);
  }

  function clearHighlight() {
    workspace.highlightBlock(null);
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
      workspace.setScale(1.0);
      workspace.scrollCenter();
    }
  }, []);

  const handleBlockSelectedForFlyout = (xml: Element, eventType: string, event: MouseEvent): void => {
    createBlockFromFlyout(workspace, xml, event);
  };

  const handleBlockSelectedForDrawer = (xml: string, eventType: string, event: MouseEvent): void => {
    if (eventType === 'drag') {
      dropBlockToWorkspace(workspace, xml, event);
    } else {
      addBlockToWorkspace(workspace, xml);
    }
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header
          playState={playState}
          setPlayState={setPlayState}
          onSearchClick={handleSearchClick}
          ref={headerRef}
        />
        <div className="border-t border-gray-300"></div>
        <div className="flex flex-1 overflow-hidden">
          <Split
            className="flex flex-1"
            sizes={isMobileView ? [100, 0] : [80, 20]}
            minSize={100}
            gutterSize={10}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-center items-center text-center w-full h-full bg-white">
              <div id="blocklyArea" ref={blocklyAreaRef} className="w-full h-full flex justify-center items-center">
                <span className="text-lg">Loading Workspace...</span>
                <span id="confettiItem" style={{ zIndex: 99 }} />
              </div>
            </div>
            <div className="flex flex-col bg-white p-2 border-l">
              <div className="flex space-x-2 mb-2">
                <BlocklyDrawer
                  onBlockSelected={handleBlockSelectedForDrawer}
                  setOpen={setOpenFlyout}
                  open={openFlyout}
                  flyoutType={flyoutType}
                  mainWorkspace={workspace}
                />
                <BlocklySearchFlyout 
                  onBlockSelected={handleBlockSelectedForDrawer}
                  setOpen={setIsSearchModalOpen}
                  open={isSearchModalOpen}
                  mainWorkspace={workspace}
                />
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
        {!isMobileView &&
          <footer ref={footerRef} className="flex-none bg-white text-gray-800 p-1 text-center w-full border-t">
            <p style={{ fontSize: '12px' }}>© 2024 null pay - All Rights Reserved</p>
          </footer>
        }
      </div>
      <div id="blocklyDiv" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></div>
      <div style={{
        position: 'absolute',
        top: `${clientFramePos.headerHeight}px`,
        left: '0',
        height: `calc(100% - ${clientFramePos.headerHeight + clientFramePos.footerHeight}px)`,
        zIndex: '10',
        borderRight: 'solid 1px #ccc',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        overflow: 'auto'
      }}
      >
        <Sidebar setOpen={setOpenFlyout} setFlyoutType={setFlyoutType} />
      </div>
      {/*<WelcomeDialog onYes={handleShowDemo} />*/}
      <FeatureModal releaseInfo={releaseInfo} />
    </>
  );
};

export default BlocklyComponent;
