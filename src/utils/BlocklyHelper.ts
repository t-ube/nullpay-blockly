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

export {
  dropBlockToWorkspace,
  addBlockToWorkspace,
  createBlockFromFlyout
};
