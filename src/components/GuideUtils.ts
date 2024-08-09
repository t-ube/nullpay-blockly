// components/guideUtils.ts
import React, { useRef, useEffect, useCallback } from 'react';
import * as Blockly from 'blockly/core';

export interface IGuideProps {
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
  onClose: () => void;
}

export function createAndManageWorkspace(
    id: string,
    blockXml: string,
    workspaceRefs: React.MutableRefObject<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>,
    handleBlockClick: (workspaceId: string, event: any) => void
  ) {
    const container = document.getElementById(id);
    
    if (container) {
      const workspace = Blockly.inject(id, {
        readOnly: false,
        scrollbars: false,
        zoom: {
          controls: false,
          wheel: false,
          startScale: 0.75,
        },
      });
      workspaceRefs.current.push({ id, workspace });
  
      const blockDom = Blockly.utils.xml.textToDom(`<xml>${blockXml}</xml>`);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);
  
      const block = workspace.getAllBlocks(false)[0];
      if (block) {
        block.contextMenu = false;
        const blockSvg = block.getSvgRoot();
        if (blockSvg) {
          const blockRect = blockSvg.getBoundingClientRect();
          container.style.width = `${blockRect.width}px`;
          container.style.height = `${blockRect.height}px`;
        }
      }
      Blockly.svgResize(workspace);
      workspace.addChangeListener((event: any) => handleBlockClick(id, event));
    }
  }

export function useWorkspaceManager(
  workspaces: { id: string; block: string }[],
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void,
  onClose: () => void
) {
  const workspaceRefs = useRef<{ id: string, workspace: Blockly.WorkspaceSvg | null }[]>([]);
  const isActive = useRef<boolean>(true);

  const handleBlockClick = useCallback(
    (workspaceId: string, event: any) => {
      if (!isActive.current) return;
      const workspace = workspaceRefs.current.find(ws => ws.id === workspaceId)?.workspace;
      if (workspace && (event.type === 'drag')) {
        const blockSvg = workspace.getBlockById(event.blockId);
        if (blockSvg) {
          let parentBlockSvg = blockSvg;
          let parent = parentBlockSvg.getSurroundParent();
          while (parent = parentBlockSvg.getSurroundParent()) {
            parentBlockSvg = parent;
          }
          const json = Blockly.serialization.blocks.save(parentBlockSvg as Blockly.Block);
          const jsonText = JSON.stringify(json);
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          let dummyEvent: any = {
            clientX: rect.left,
            clientY: rect.top
          };
          onBlockSelectedV2(jsonText, event.type, dummyEvent);
          onClose();
          isActive.current = false;
        }
      }
    },
    [onBlockSelectedV2, onClose]
  );

  const clearWorkspaces = useCallback(() => {
    workspaceRefs.current.forEach(({ workspace }) => {
      if (workspace) {
        workspace.clear();
        workspace.dispose();
      }
    });
    workspaceRefs.current = [];
  }, []);

  useEffect(() => {
    isActive.current = true;

    workspaces.forEach((item) => {
      createAndManageWorkspace(item.id, item.block, workspaceRefs, handleBlockClick);
    });

    return clearWorkspaces;
  }, [workspaces, handleBlockClick, clearWorkspaces]);

  return { clearWorkspaces };
}
