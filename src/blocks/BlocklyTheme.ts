import * as Blockly from 'blockly/core';
import { BlockColors } from '@/blocks/BlockColors';

export const FlyoutTheme = Blockly.Theme.defineTheme('customTheme', {
  name: 'flyoutTheme',
  blockStyles: {
    text_blocks: {
      colourPrimary: BlockColors.text
    },
    math_blocks: {
      colourPrimary: BlockColors.math
    },
    logic_blocks: {
      colourPrimary: BlockColors.logic
    },
    loop_blocks: {
      colourPrimary: BlockColors.loop
    },
    list_blocks: {
      colourPrimary: BlockColors.list
    },
    json_blocks: {
      colourPrimary: BlockColors.json
    },
    table_blocks: {
      colourPrimary: BlockColors.table
    },
    webapi_blocks: {
      colourPrimary: BlockColors.webapi
    },
    chart_blocks: {
      colourPrimary: BlockColors.chart
    },
    time_blocks: {
      colourPrimary: BlockColors.time
    },
    supabase_blocks: {
      colourPrimary: BlockColors.supabase
    },
    variable_blocks: {
      colourPrimary: BlockColors.variable
    },
    variable_dynamic_blocks: {
      colourPrimary: BlockColors.variable
    },
    procedure_blocks: {
      colourPrimary: BlockColors.function
    },
  },
  categoryStyles: {
    list_category: {
      colour: BlockColors.list
    },
    logic_category: {
      colour: BlockColors.logic
    }
  },
  componentStyles: {
    workspaceBackgroundColour: '#f0f0f0',
    toolboxBackgroundColour: '#333',
    toolboxForegroundColour: '#fff',
    flyoutBackgroundColour: '#ddd',
    flyoutForegroundColour: '#000',
    flyoutOpacity: 1,
    scrollbarColour: '#ccc',
    scrollbarOpacity: 0.5,
    insertionMarkerColour: '#000',
    insertionMarkerOpacity: 0.5,
    markerColour: '#000',
    cursorColour: '#d0d0d0'
  },
  fontStyle: {
    family: 'Arial, sans-serif',
    weight: 'bold',
    size: 12
  }
});
