import * as Blockly from 'blockly/core';

const getBlocklyDiv = (): HTMLElement | null => {
  const blocklyDiv = document.getElementById('blocklyDiv');
  if (!blocklyDiv) {
    console.error('blocklyDiv not found');
  }
  return blocklyDiv;
};

const createDummyEventLegacy = (x: number, y: number, blocklyDivRect: DOMRect, xOffset: number): MouseEvent => {
  return {
    clientX: x - blocklyDivRect.left - xOffset,
    clientY: y - blocklyDivRect.top
  } as unknown as MouseEvent;
};

const createDummyEvent = (x: number, y: number, blocklyDivRect: DOMRect): MouseEvent => {
  return {
    clientX: x - blocklyDivRect.left,
    clientY: y - blocklyDivRect.top
  } as unknown as MouseEvent;
};

const calculateSvgPoint = (dummyEvent: MouseEvent, workspace: Blockly.WorkspaceSvg): DOMPoint => {
  return Blockly.utils.browserEvents.mouseToSvg(dummyEvent, workspace.getParentSvg(), workspace.getInverseScreenCTM());
};

const createBlock = (xml: Element, workspace: Blockly.WorkspaceSvg, wsCoordinates: { x: number; y: number }) => {
  const block = Blockly.Xml.domToBlock(xml, workspace) as unknown as Blockly.BlockSvg;
  block.moveBy(wsCoordinates.x, wsCoordinates.y, ['drag']);
  return block;
};

const createBlockFromBlockText = (xmlString: string, workspace: Blockly.WorkspaceSvg, wsCoordinates: { x: number; y: number }) : string[] => {
  try {
    const wrappedXmlString = `<xml>${xmlString}</xml>`;
    const parser = new DOMParser();
    const xmlDom = parser.parseFromString(wrappedXmlString, 'text/xml');
    const blockElement = xmlDom.querySelector('block');
    if (blockElement) {
      blockElement.setAttribute('x', wsCoordinates.x.toString());
      blockElement.setAttribute('y', wsCoordinates.y.toString());
    } else {
      throw new Error('No <block> element found in the provided XML string');
    }
    return Blockly.Xml.domToWorkspace(xmlDom.documentElement, workspace);
  } catch (error) {
    console.error('Error creating block:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
  return [];
};


const createPointerEvent = (type: string, x: number, y: number): PointerEvent => {
  return new PointerEvent(type, {
    clientX: x,
    clientY: y,
    bubbles: true,
    cancelable: true,
    view: window,
    pointerId: 1,
    pointerType: 'touch',
  });
};

const handleTouchEnd = (blockSvgRoot: SVGElement, workspace: Blockly.WorkspaceSvg) => (event: PointerEvent) => {
  const fakePointerUpEvent = createPointerEvent('pointerup', event.clientX, event.clientY);
  blockSvgRoot.dispatchEvent(fakePointerUpEvent);
  workspace.getAllBlocks().forEach(b => b.setHighlighted(false));
  window.removeEventListener('pointerup', handleTouchEnd(blockSvgRoot, workspace));
};

/*
const dropBlockToWorkspaceLegacy = (workspace: Blockly.WorkspaceSvg, xml: Element) => {
  const metrics = workspace.getMetrics();
  const { viewLeft, viewTop, viewWidth, viewHeight, contentWidth } = metrics;
  const blocklyDiv = getBlocklyDiv();
  if (!blocklyDiv) {
    return;
  }
  const blocklyDivRect = blocklyDiv.getBoundingClientRect();
  const x = viewLeft + (viewWidth / 2);
  const y = viewTop + (viewHeight / 2);
  const xOffset = contentWidth === 0 ? -blocklyDivRect.left / workspace.scale : 0;
  const dummyEvent = createDummyEventLegacy(x, y, blocklyDivRect, xOffset);
  const svgPoint = calculateSvgPoint(dummyEvent, workspace);
  const rel = workspace.getOriginOffsetInPixels();
  const wsCoordinates = {
    x: (svgPoint.x - rel.x) / workspace.scale,
    y: (svgPoint.y - rel.y) / workspace.scale
  };
  const block = createBlock(xml, workspace, wsCoordinates);
  block.getSvgRoot().style.opacity = '0';
  if (workspace.currentGesture_) {
    workspace.currentGesture_.cancel();
  }
  const fakePointerDownEvent = createPointerEvent('pointerdown', x - blocklyDivRect.left - xOffset, y - blocklyDivRect.top);
  const fakePointerUpEvent = createPointerEvent('pointerup', x - blocklyDivRect.left - xOffset, y - blocklyDivRect.top);
  const blockSvgRoot = block.getSvgRoot();
  if (blockSvgRoot) {
    blockSvgRoot.dispatchEvent(fakePointerUpEvent);
    setTimeout(() => {
      blockSvgRoot.dispatchEvent(fakePointerDownEvent);
      window.addEventListener('pointerup', handleTouchEnd(blockSvgRoot, workspace), { once: true });
      setTimeout(() => {
        block.getSvgRoot().style.opacity = '1';
      }, 100);
    }, 50);
  }
};
*/

const dropBlockToWorkspace = (workspace: Blockly.WorkspaceSvg, xml: string, event: MouseEvent) => {
  const metrics = workspace.getMetrics();
  const { viewLeft, viewTop, viewWidth, viewHeight, contentWidth, absoluteTop } = metrics;
  const blocklyDiv = getBlocklyDiv();
  if (!blocklyDiv) {
    return;
  }
  const blocklyDivRect = blocklyDiv.getBoundingClientRect();
  const x = event.clientX + blocklyDivRect.left + 10;
  const y = event.clientY + blocklyDivRect.top + 30;
  const dummyEvent = createDummyEvent(x, y, blocklyDivRect);
  const svgPoint = calculateSvgPoint(dummyEvent, workspace);
  const rel = workspace.getOriginOffsetInPixels();
  const wsCoordinates = {
    x: (svgPoint.x - rel.x) / workspace.scale,
    y: (svgPoint.y - rel.y) / workspace.scale
  };
  const idList = createBlockFromBlockText(xml, workspace, wsCoordinates);

  if (idList.length > 0) {
    const blockId = idList[0];
    const block = workspace.getBlockById(blockId);
    if (block) {
      block.getSvgRoot().style.opacity = '0';
      if (workspace.currentGesture_) {
        workspace.currentGesture_.cancel();
      }
      const fakePointerDownEvent = createPointerEvent('pointerdown', x - blocklyDivRect.left, y - blocklyDivRect.top);
      const fakePointerUpEvent = createPointerEvent('pointerup', x - blocklyDivRect.left, y - blocklyDivRect.top);
      const blockSvgRoot = block.getSvgRoot();
      if (blockSvgRoot) {
        blockSvgRoot.dispatchEvent(fakePointerUpEvent);
        setTimeout(() => {
          blockSvgRoot.dispatchEvent(fakePointerDownEvent);
          window.addEventListener('pointerup', handleTouchEnd(blockSvgRoot, workspace), { once: true });
          setTimeout(() => {
            block.getSvgRoot().style.opacity = '1';
          }, 50);
        }, 50);
      }
    }
  }
};


const addBlockToWorkspace = (workspace: Blockly.WorkspaceSvg, xml: string) => {
  const metrics = workspace.getMetrics();
  const { viewLeft, viewTop, viewWidth, viewHeight, contentWidth, contentTop, contentHeight } = metrics;
  const blocklyDiv = getBlocklyDiv();
  if (!blocklyDiv) {
    return;
  }
  const x = viewLeft + (viewWidth / 2);
  const y = viewTop + (viewHeight / 2);
  const wsCoordinates = {
    x: x,
    y: y
  };
  const idList = createBlockFromBlockText(xml, workspace, wsCoordinates);
  console.log(idList);
  if (workspace.currentGesture_) {
    workspace.currentGesture_.cancel();
  }
};

const createBlockFromFlyout = (workspace: Blockly.WorkspaceSvg, xml: Element, event: MouseEvent) => {
  const blocklyDiv = getBlocklyDiv();
  if (!blocklyDiv) {
    return;
  }
  const svgPoint = calculateSvgPoint(event, workspace);
  const rel = workspace.getOriginOffsetInPixels();
  const wsCoordinates = {
    x: (svgPoint.x - rel.x) / workspace.scale,
    y: (svgPoint.y - rel.y) / workspace.scale
  };
  const block = createBlock(xml, workspace, wsCoordinates);
  block.setMovable(true);
  if (workspace.currentGesture_) {
    workspace.currentGesture_.cancel();
  }
};

const createBlockFromBlockTextV2 = (jsonString: string, workspace: Blockly.WorkspaceSvg, wsCoordinates: { x: number; y: number }) : string[] => {
  try {
    const blockJson = JSON.parse(jsonString);
    blockJson.x = wsCoordinates.x;
    blockJson.y = wsCoordinates.y;
    //console.log(blockJson);
    Blockly.serialization.blocks.append(blockJson, workspace, {recordUndo : true});
    if (blockJson.id) {
      return [blockJson.id];
    }
  } catch (error) {
    console.error('Error creating block:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
  return [];
};

const dropBlockToWorkspaceV2 = (workspace: Blockly.WorkspaceSvg, jsonString: string, event: MouseEvent) => {
  const metrics = workspace.getMetrics();
  const { viewLeft, viewTop, viewWidth, viewHeight, contentWidth, absoluteTop } = metrics;
  const blocklyDiv = getBlocklyDiv();
  if (!blocklyDiv) {
    return;
  }
  const blocklyDivRect = blocklyDiv.getBoundingClientRect();
  const x = event.clientX + blocklyDivRect.left + 10;
  const y = event.clientY + blocklyDivRect.top + 30;
  const dummyEvent = createDummyEvent(x, y, blocklyDivRect);
  const svgPoint = calculateSvgPoint(dummyEvent, workspace);
  const rel = workspace.getOriginOffsetInPixels();
  const wsCoordinates = {
    x: (svgPoint.x - rel.x) / workspace.scale,
    y: (svgPoint.y - rel.y) / workspace.scale
  };
  const idList = createBlockFromBlockTextV2(jsonString, workspace, wsCoordinates);

  if (idList.length > 0) {
    const blockId = idList[0];
    const block = workspace.getBlockById(blockId);
    if (block) {
      block.getSvgRoot().style.opacity = '0';
      if (workspace.currentGesture_) {
        workspace.currentGesture_.cancel();
      }
      const fakePointerDownEvent = createPointerEvent('pointerdown', x - blocklyDivRect.left, y - blocklyDivRect.top);
      const fakePointerUpEvent = createPointerEvent('pointerup', x - blocklyDivRect.left, y - blocklyDivRect.top);
      const blockSvgRoot = block.getSvgRoot();
      if (blockSvgRoot) {
        blockSvgRoot.dispatchEvent(fakePointerUpEvent);
        setTimeout(() => {
          blockSvgRoot.dispatchEvent(fakePointerDownEvent);
          window.addEventListener('pointerup', handleTouchEnd(blockSvgRoot, workspace), { once: true });
          setTimeout(() => {
            block.getSvgRoot().style.opacity = '1';
          }, 50);
        }, 50);
      }
    }
  }
};

const addBlockToWorkspaceV2 = (workspace: Blockly.WorkspaceSvg, jsonString: string) => {
  const metrics = workspace.getMetrics();
  const { viewLeft, viewTop, viewWidth, viewHeight, contentWidth, contentTop, contentHeight } = metrics;
  const blocklyDiv = getBlocklyDiv();
  if (!blocklyDiv) {
    return;
  }
  const x = viewLeft + (viewWidth / 2);
  const y = viewTop + (viewHeight / 2);
  const wsCoordinates = {
    x: x,
    y: y
  };
  const idList = createBlockFromBlockTextV2(jsonString, workspace, wsCoordinates);
  console.log(idList);
  if (workspace.currentGesture_) {
    workspace.currentGesture_.cancel();
  }
};

const processAIGeneratedXml = (xmlString: string): string => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const blocks = xmlDoc.getElementsByTagName("block");

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const type = block.getAttribute("type");
    if (type !== null && !Blockly.Blocks[type]) {
      const hasOutput = block.hasAttribute("output") || block.querySelector("value[name='OUTPUT']");
      
      const fallbackType = hasOutput ? "fallback_value_block" : "fallback_statement_block";
      block.setAttribute("type", fallbackType);
      
      const blockNameField = xmlDoc.createElement("field");
      blockNameField.setAttribute("name", "BLOCK_NAME");
      blockNameField.textContent = type;
      block.appendChild(blockNameField);
      
      const inputElements = block.getElementsByTagName("value");
      const statementElements = block.getElementsByTagName("statement");
      
      if (fallbackType === "fallback_value_block" && inputElements.length > 0) {
        inputElements[0].setAttribute("name", "INPUT");
      } else if (fallbackType === "fallback_statement_block") {
        const inputsStatement = xmlDoc.createElement("statement");
        inputsStatement.setAttribute("name", "INPUTS");
        while (inputElements.length > 0 || statementElements.length > 0) {
          if (inputElements.length > 0) inputsStatement.appendChild(inputElements[0]);
          if (statementElements.length > 0) inputsStatement.appendChild(statementElements[0]);
        }
        block.appendChild(inputsStatement);
      }
    }
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}

const MAX_RETRY_COUNT = 10;

function loadXmlIntoWorkspace(content: string, workspace: Blockly.WorkspaceSvg) {
  let retryCount = 0;
  let xmlText = content;

  while (retryCount < MAX_RETRY_COUNT) {
    try {
      xmlText = processAIGeneratedXml(xmlText);
      const blockDom = Blockly.utils.xml.textToDom(xmlText);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);
      console.log(`Successfully loaded XML after ${retryCount} retries.`);
      return;
    } catch (error) {
      console.warn(`Attempt ${retryCount + 1} failed:`, error);
      retryCount++;

      if (retryCount >= MAX_RETRY_COUNT) {
        console.error('Failed to load XML into workspace after maximum retries:', error);
        workspace.clear();
        const errorBlock = workspace.newBlock('text');
        errorBlock.setFieldValue(`Error: Failed to load XML after ${MAX_RETRY_COUNT} attempts`, 'TEXT');
        errorBlock.initSvg();
        errorBlock.render();
        errorBlock.moveBy(50, 50);
        // showNotification(`Failed to load XML after ${MAX_RETRY_COUNT} attempts. Please check your input.`);
        break;
      }
      xmlText = applyAdditionalFixes(xmlText, error as Error);
    }
  }
}

function applyAdditionalFixes(xmlText: string, error: Error): string {
  if (error instanceof TypeError && error.message.includes("Next block does not have previous statement")) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const blocks = xmlDoc.getElementsByTagName("block");

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const nextBlock = block.querySelector("next > block");
      if (nextBlock) {
        if (!block.hasAttribute("previousStatement") && !block.hasAttribute("nextStatement")) {
          block.setAttribute("type", "fallback_statement_block");
          let blockNameField = block.querySelector("field[name='BLOCK_NAME']");
          if (!blockNameField) {
            blockNameField = xmlDoc.createElement("field");
            blockNameField.setAttribute("name", "BLOCK_NAME");
            block.appendChild(blockNameField);
          }
          blockNameField.textContent = block.getAttribute("type") || "Unknown Block";
          const inputsStatement = xmlDoc.createElement("statement");
          inputsStatement.setAttribute("name", "INPUTS");
          while (block.firstChild) {
            inputsStatement.appendChild(block.firstChild);
          }
          block.appendChild(inputsStatement);

          console.log("Converted block to fallback_statement_block:", block.getAttribute("type"));
        }
      }
    }

    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDoc);
  }
  return xmlText;
}

export {
  dropBlockToWorkspace,
  addBlockToWorkspace,
  createBlockFromFlyout,
  dropBlockToWorkspaceV2,
  addBlockToWorkspaceV2,
  loadXmlIntoWorkspace
};
