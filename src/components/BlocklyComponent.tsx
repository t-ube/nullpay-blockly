'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import Split from "react-split";
import classNames from 'classnames';
import Interpreter from 'js-interpreter';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { blocklyInit, initInterpreterEx, workspace } from '@/blocks/initializer';
import { MainTabs } from '@/components/MainTabs';
import FeatureModal from '@/components/FeatureModal';
import { useReward } from 'react-rewards';
import { setConfettiAnimationFunction } from '@/blocks/animation/confettiAnimationBlock';
import { setControlRunSpeedFunction } from '@/blocks/control/controlRunSpeed';
import BlocklySearchFlyout from '@/components/BlocklySearchFlyout';
//import BlocklyDrawer from '@/components/BlocklyDrawer';
//import { Sidebar } from '@/components/Sidebar';
import { NewSidebar } from '@/components/NewSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PlayState } from '@/types/PlayStateType';
import {
  dropBlockToWorkspace, addBlockToWorkspace,
  dropBlockToWorkspaceV2, addBlockToWorkspaceV2
} from '@/utils/BlocklyHelper';
//import WelcomeDialog from '@/components/WelcomeDialog';
//import { DemoBlockXml } from '@/demos/demo-v0-r2-async-block';
//import { DemoV0R3CsvLoadXml } from '@/demos/demo-v0-r3-csv-load';
//import { DemoV0R3Supabase } from '@/demos/demo-v0-r3-supabase';
//import { DemoV0R3Xaman } from '@/demos/demo-v0-r3-xaman';
import { DemoV0R4Chart } from '@/demos/demo-v0-r4-chart';
import { DemoV0R4Form } from '@/demos/demo-v0-r4-form';
import { DemoV0R4SemiAutoBid } from '@/demos/demo-v0-r4-semi-auto-bid';
import { DemoV0R4WebApi } from '@/demos/demo-v0-r4-webapi';
import { releaseInfo as initialReleaseInfo } from '@/features/features-v0-r4';
import { useMobile } from '@/contexts/MobileContext';
import LogArea, { LogAreaHandle } from '@/components/LogArea';
import ChatGptComponent from '@/components/ChatGptComponent';

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
  const { isMobile, isPortrait, isLoaded } = useMobile();
  const blocklyAreaRef = useRef<HTMLDivElement>(null);
  const codeArea = useRef<HTMLTextAreaElement>(null);
  const structArea = useRef<HTMLTextAreaElement>(null);
  const outputArea = useRef<HTMLTextAreaElement>(null);
  const cancelledRef = useRef(false);
  const suspendRef = useRef(false);
  const highlightedBlockId = useRef<string>('');
  const [playState, setPlayState] = useState<PlayState>('init');
  const myInterpreter = useRef<Interpreter | null>(null);
  const [selectedTab, setSelectedTab] = useState("log");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { reward, isAnimating } = useReward("confettiItem", "confetti");
  const [isRunning, setIsRunning] = useState(false);
  const runSpeedRef = useRef(1);
  const [duration, setDuration] = useState(0);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [openFlyout, setOpenFlyout] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [clientFramePos, setClientFramePos] = useState<clientFramePos>({
    headerHeight: 42,
    footerHeight: 27
  });
  const logAreaRef = useRef<LogAreaHandle>(null);
  const [fabPosition, setFabPosition] = useState({ left: 0, bottom: 0 });

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
  
  useEffect(() => {
    if (isRunning && duration > 0) {
      const timer = setTimeout(() => {
        setIsRunning(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, duration]);

  const handleSaveWorkspaceV2 = () => {
    console.log('handleSaveWorkspaceV2');
    const state = Blockly.serialization.workspaces.save(workspace);
    //
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
    //
    const jsonState = JSON.stringify(state);
    const blob = new Blob([jsonState], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workspace.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSaveWorkspace = () => {
    console.log('handleSaveWorkspace');
    const xml = Blockly.Xml.workspaceToDom(workspace);
    //
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
    //
    const xmlText = Blockly.Xml.domToPrettyText(xml);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workspace.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleLoadWorkspace = () => {
    console.log('handleLoadWorkspace');
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
  };

  useEffect(() => {
    blocklyInit();
 
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

    const updateStruct = (event:Blockly.Events.Abstract) => {
      if (workspace.isDragging()) return; // Don't update while changes are happening.
      if (!supportedEvents.has(event.type)) return;
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xml);
      //const state = Blockly.serialization.workspaces.save(workspace);
      //const jsonText = JSON.stringify(state);
      if (structArea.current) {
        structArea.current.value = xmlText;
      }
    };

    workspace.addChangeListener(updateCode);
    workspace.addChangeListener(updateStruct);
    
    const runSpeedTrigger = (speed: number) => {
      runSpeedRef.current = speed;
    };
    setControlRunSpeedFunction(runSpeedTrigger);

    return () => {
      window.removeEventListener('resize', handleResize);
      workspace.removeChangeListener(updateCode);
      workspace.removeChangeListener(updateStruct);
    };
  }, []);

  const initApi = useCallback(async (interpreter: Interpreter, scope: any) => {
    const wrapper = (text: string) => {
      text = text ? text.toString() : '';
      logAreaRef.current?.append(text);
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
    initInterpreterEx(interpreter, scope, outputArea.current);
    
  }, []);

  const playCode = useCallback(async () => {

    if (cancelledRef.current) {
      clearHighlight();
      myInterpreter.current = null;
      logAreaRef.current?.append('\n<< Execution cancelled >>');
      setPlayState('init');
      cancelledRef.current = false;
      return;
    }
    if (suspendRef.current) {
      setTimeout(() => {
        playCode();
      }, 1);
      return;
    }

    let interpreterTemp = myInterpreter.current;
    if (!interpreterTemp) {
      const code = javascriptGenerator.workspaceToCode(workspace);
      interpreterTemp = new Interpreter(code, initApi);
      logAreaRef.current?.clear();
    }

    const stepsToRun = runSpeedRef.current;
    let hasMoreCode = true;
    for (let i = 0; i < stepsToRun; i++) {
      hasMoreCode = interpreterTemp.step();
      if (!hasMoreCode) {
        break;
      }
    }

    //let hasMoreCode = interpreterTemp.step();
    if (hasMoreCode) {
      myInterpreter.current = interpreterTemp;
      setTimeout(playCode, 1);
    } else {
      clearHighlight();
      myInterpreter.current = null;
      logAreaRef.current?.append('\n\n<< Program complete >>');
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
      runSpeedRef.current = 1;
    } else if (playState === 'cancel') {
      cancelledRef.current = true;
      runSpeedRef.current = 1;
    }
  }, [playState, playCode]);

  useEffect(() => {
    const originalTrashcanPosition = Blockly.Trashcan.prototype.position;
    Blockly.Trashcan.prototype.position = function(metrics, savedPositions) {
      originalTrashcanPosition.call(this, metrics, savedPositions);
      const trashcan = this;
      const trashcanBBox = trashcan.getBoundingRectangle();
      if (trashcanBBox){
        let left = metrics.viewMetrics.width - trashcanBBox.getWidth() - metrics.absoluteMetrics.left;
        let top = metrics.viewMetrics.height - trashcanBBox.getHeight() - metrics.absoluteMetrics.top;
        if (isMobile && isPortrait) {
          left -= 10;
          top -= 150;
        } else {
          left -= 20;
          top -= 50 + 0;
        }
        const trashcan = this as any;
        trashcan.svgGroup.setAttribute('transform', `translate(${left}, ${top})`);

        if (isMobile && isPortrait) {
          setFabPosition({
            left: left - 5,
            bottom: metrics.viewMetrics.height - top - 100
          });
        } else 
        {
          setFabPosition({
            left: left - 5,
            bottom: metrics.viewMetrics.height - top + 70
          });
        }
      }
    };

    const originaZoomControlsPosition = Blockly.ZoomControls.prototype.position;
    Blockly.ZoomControls.prototype.position = function(metrics, savedPositions) {
      originaZoomControlsPosition.call(this, metrics, savedPositions);
      const zooms = this;
      const zoomsBox = zooms.getBoundingRectangle();
      if (zoomsBox){
        let left = metrics.viewMetrics.width - zoomsBox.getWidth() - metrics.absoluteMetrics.left;
        let top = metrics.viewMetrics.height - zoomsBox.getHeight() - metrics.absoluteMetrics.top;
        if (isMobile && isPortrait) {
          left -= 17;
          top -= 250;
        } else {
          left -= 28;
          top -= 150 + 100;
        }
        const zooms = this as any;
        zooms.svgGroup.setAttribute('transform', `translate(${left}, ${top})`);
      }
    };

    window.dispatchEvent(new Event('resize'));
  }, [isMobile, isPortrait, isLoaded]);

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

  const handleBlockSelectedForDrawer = (xml: string, eventType: string, event: MouseEvent): void => {
    if (eventType === 'drag') {
      dropBlockToWorkspace(workspace, xml, event);
    } else {
      addBlockToWorkspace(workspace, xml);
    }
  };

  const handleBlockSelectedForDrawer2 = (json: string, eventType: string, event: MouseEvent): void => {
    if (eventType === 'drag') {
      dropBlockToWorkspaceV2(workspace, json, event);
    } else {
      addBlockToWorkspaceV2(workspace, json);
    }
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  // Release info //
  const handleShowDemoChart = useCallback(() => {
    const blockDom = Blockly.utils.xml.textToDom(DemoV0R4Chart);
    if (Blockly && workspace && blockDom) {
      Blockly.Xml.domToWorkspace(blockDom, workspace);
      workspace.setScale(0.9);
      workspace.scrollCenter();
    }
  }, []);

  const handleShowDemoForm = useCallback(() => {
    const blockDom = Blockly.utils.xml.textToDom(DemoV0R4Form);
    if (Blockly && workspace && blockDom) {
      Blockly.Xml.domToWorkspace(blockDom, workspace);
      workspace.setScale(0.9);
      workspace.scrollCenter();
    }
  }, []);

  const handleShowDemoSemiAutoBid = useCallback(() => {
    const blockDom = Blockly.utils.xml.textToDom(DemoV0R4SemiAutoBid);
    if (Blockly && workspace && blockDom) {
      Blockly.Xml.domToWorkspace(blockDom, workspace);
      workspace.setScale(0.3);
      workspace.scrollCenter();
    }
  }, []);

  const handleShowDemoWebApi = useCallback(() => {
    const blockDom = Blockly.utils.xml.textToDom(DemoV0R4WebApi);
    if (Blockly && workspace && blockDom) {
      Blockly.Xml.domToWorkspace(blockDom, workspace);
      workspace.setScale(0.9);
      workspace.scrollCenter();
    }
  }, []);

  const releaseInfo = {
    ...initialReleaseInfo,
    features: initialReleaseInfo.features.map((feature) => ({
      ...feature,
      onDemoEvent:
      feature.title === "Chart Block Added" ? handleShowDemoChart
      : feature.title === "Form Block Added" ? handleShowDemoForm
      : feature.title === "'Semi-Automatic Bid' Template Added" ? handleShowDemoSemiAutoBid
      : feature.title === "Web API Block Added" ? handleShowDemoWebApi
      : undefined,
    })),
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header
          playState={playState}
          setPlayState={setPlayState}
          onSearchClick={handleSearchClick}
          onSaveClick={handleSaveWorkspace}
          onLoadClick={handleLoadWorkspace}
          ref={headerRef}
        />
        <div className="border-t border-gray-300"></div>
        <div className="flex flex-1 overflow-hidden">
          <Split
            className="flex flex-1"
            sizes={isMobile ? [100, 0] : [80, 20]}
            minSize={0}
            gutterSize={isMobile ? 0:  10}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <div className="flex justify-center items-center text-center w-full h-full bg-white">
              <div id="blocklyArea" ref={blocklyAreaRef} className="w-full h-full flex justify-center items-center">
                <span className="text-lg">Loading Workspace...</span>
                <span id="confettiItem" style={{ zIndex: 99 }} />
              </div>
              <div className="flex space-x-2 mb-2">
                {/*<BlocklyDrawer
                  onBlockSelected={handleBlockSelectedForDrawer}
                  onBlockSelectedV2={handleBlockSelectedForDrawer2}
                  setOpen={setOpenFlyout}
                  open={openFlyout}
                  flyoutType={flyoutType}
                  mainWorkspace={workspace}
                />*/}
                <BlocklySearchFlyout 
                  onBlockSelected={handleBlockSelectedForDrawer}
                  onBlockSelectedV2={handleBlockSelectedForDrawer2}
                  setOpen={setIsSearchModalOpen}
                  open={isSearchModalOpen}
                  mainWorkspace={workspace}
                />
              </div>
            </div>
            <div
              className={classNames('flex flex-col bg-white border-l', {
                'p-2': !isMobile,
                'p-0': isMobile,
              })}
            >
            {isLoaded && !isMobile && (
              <>
                <div className="flex-1 flex flex-col">
                  <MainTabs page={selectedTab} onTabChange={handleTabChange} />
                  <div style={{ display: selectedTab === 'log' ? 'flex' : 'none' }} className='py-1 flex-1 overflow-auto'>
                    <LogArea ref={logAreaRef} />
                  </div>
                  <div style={{ display: selectedTab === 'code' ? 'flex' : 'none' }} className='py-1 flex-1 overflow-auto'>
                    <textarea 
                      ref={codeArea}
                      id="codeArea"
                      className="px-1 w-full h-full resize-none border"
                      style={{ fontSize: '12px' }}
                      readOnly
                      spellCheck="false"
                    >
                    </textarea>
                  </div>
                  <div style={{ display: selectedTab === 'struct' ? 'flex' : 'none' }} className='py-1 flex-1 overflow-auto'>
                    <textarea 
                      ref={structArea}
                      id="structArea"
                      className="px-1 w-full h-full resize-none border"
                      style={{ fontSize: '12px' }}
                      readOnly
                      spellCheck="false"
                    >
                    </textarea>
                  </div>
                </div>
              </>
              )}
            </div>
          </Split>
        </div>
        {isLoaded &&
          <ChatGptComponent 
            position={fabPosition}
            onBlockSelectedV2={handleBlockSelectedForDrawer2}
          />
        }
        <Footer
          playState={playState}
          setPlayState={setPlayState}
          onSearchClick={handleSearchClick}
          onSaveClick={handleSaveWorkspace}
          onLoadClick={handleLoadWorkspace}
          ref={footerRef}
        />
      </div>
      <div id="blocklyDiv" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></div>
      {isLoaded && !isMobile && (
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
          <NewSidebar
            onBlockSelectedV2={handleBlockSelectedForDrawer2}
            open={openFlyout}
            setOpen={setOpenFlyout}
            mainWorkspace={workspace}
          />
        </div>
      )}
      {/*<WelcomeDialog onYes={handleShowDemo} />*/}
      <FeatureModal releaseInfo={releaseInfo} />
    </>
  );
};

export default BlocklyComponent;
