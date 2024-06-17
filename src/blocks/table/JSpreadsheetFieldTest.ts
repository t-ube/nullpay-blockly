import * as Blockly from 'blockly';
import { Field } from 'blockly';
import 'jspreadsheet-ce/dist/jspreadsheet.css';
import jspreadsheet from 'jspreadsheet-ce';

const cellWidth = 80;
const cellHeight = 26;
const minContainerWidth = 220;
const minContainerHeight = 100;
const maxContainerWidth = 18000;
const maxContainerHeight = 16000;

class CustomDropDown {
  contentDiv: HTMLDivElement;
  container: HTMLDivElement;

  constructor() {
    this.contentDiv = this.createContentDiv();
    this.container = this.createContainer();
    this.container.appendChild(this.contentDiv);
    document.body.appendChild(this.container);
  }

  createContainer() {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.backgroundColor = '#fff';
    container.style.border = '1px solid #ccc';
    container.style.zIndex = '1000';
    container.style.padding = '5px';
    container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    container.style.overflow = 'auto';
    container.style.resize = 'both';
    return container;
  }

  createContentDiv() {
    const contentDiv = document.createElement('div');
    contentDiv.style.width = 'fit-content';
    contentDiv.style.height = 'calc(100% - 10px)';
    return contentDiv;
  }

  showByField(field: Field) {
    const position = this.getFieldPosition(field);
    this.container.style.left = `${position.x}px`;
    this.container.style.top = `${position.y + field.getSize().height}px`;
    this.container.style.display = 'block';
  }

  getFieldPosition(field: Field) {
    const block = field.getSourceBlock() as Blockly.BlockSvg;
    if (!block) {
      throw new Error('Field is not attached to a block');
    }
    const blockPosition = block.getSvgRoot().getBoundingClientRect();
    const workspace = block.workspace as Blockly.WorkspaceSvg;
    const injectionDiv = workspace.getInjectionDiv().getBoundingClientRect();
    const scale = workspace.scale;

    return {
      x: (blockPosition.left - injectionDiv.left) / scale,
      y: (blockPosition.top - injectionDiv.top) / scale
    };
  }

  hide() {
    this.container.style.display = 'none';
  }

  getContentDiv() {
    return this.contentDiv;
  }
}

class FieldJSpreadsheet extends Blockly.Field {
  spreadsheet: any;
  isClosing: boolean = false;
  displayText: string = '';
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  oldValue: any;
  contextMenuElement: HTMLElement | null = null;
  navigator: Navigator = window.navigator;
  selectedCell: string[] = [];
  originalKeyMap: any = null;
  customDropDown: CustomDropDown;

  constructor(value: any) {
    super(Field.SKIP_SETUP);
    this.SERIALIZABLE = true;
    if (!Array.isArray(this.value_)) {
      value = Array.from({ length: 3 }, () => Array(3).fill(''));
    }
    this.oldValue = JSON.parse(JSON.stringify(this.value_));
    this.value_ = value;
    this.setValue(value);
    this.updateDisplayText();
    this.customDropDown = new CustomDropDown();
  }

  static fromJson(options: any) {
    return new this(options['table']);
  }

  showEditor_() {
    if (this.isClosing) {
      return;
    }
    const editor = this.createEditor_();
    if (editor) {
      this.customDropDown.getContentDiv().innerHTML = '';
      this.customDropDown.getContentDiv().appendChild(editor);
      Blockly.DropDownDiv.getContentDiv().setAttribute('style', 'overflow-x: auto;');
      this.customDropDown.showByField(this);
    }
  }

  getContainerWidth(numCols: number) {
    return Math.max(minContainerWidth, Math.min(numCols * cellWidth, maxContainerWidth));
  }

  getContainerHeight(numRows: number) {
    return Math.max(minContainerHeight, Math.min(numRows * cellHeight + 100, maxContainerHeight));
  }

  createEditor_() {
    this.disableBlocklyShortcuts();
    if (this.isCreated && this.editorContainer) {
      return this.editorContainer;
    }
    const numRows = this.value_.length;
    const numCols = this.value_[0].length;

    const containerWidth = this.getContainerWidth(numCols);
    const containerHeight = this.getContainerHeight(numRows);

    const container = document.createElement('div');
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;
    //container.style.overflow = 'auto';

    const spreadsheetContainer = document.createElement('div');
    spreadsheetContainer.style.width = 'fit-content';
    spreadsheetContainer.style.height = 'calc(100% - 10px)';
    container.appendChild(spreadsheetContainer);

    this.spreadsheet = jspreadsheet(spreadsheetContainer, {
      data: this.value_,
      minDimensions: [1, 1],
      onload: () => console.log('onload'),
      onresizecolumn: () => {
        console.log('onresizecolumn');
        this.updateContainerSize();
      },
      onresizerow: () => {
        console.log('onresizerow');
        this.updateContainerSize();
      },
      onbeforechange: (el, cell, x, y, value) => {
        this.oldValue = JSON.parse(JSON.stringify(this.value_));
        return value;
      },
      onchange: (el, cell, x, y, value) => {
        this.value_[y][x] = value;
        this.updateDisplayText();
        this.setValue(this.value_);
      },
      onbeforeinsertcolumn: () => {
        this.oldValue = JSON.parse(JSON.stringify(this.value_));
        return true;
      },
      oninsertcolumn: () => {
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onbeforedeletecolumn: () => {
        this.oldValue = JSON.parse(JSON.stringify(this.value_));
        return true;
      },
      ondeletecolumn: () => {
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onbeforeinsertrow: () => {
        this.oldValue = JSON.parse(JSON.stringify(this.value_));
        return true;
      },
      oninsertrow: () => {
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onbeforedeleterow: () => {
        this.oldValue = JSON.parse(JSON.stringify(this.value_));
        return true;
      },
      ondeleterow: () => {
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onselection: (el, selection) => {
        this.selectedCell = this.spreadsheet.selectedCell;
      },
      contextMenu: (obj, x, y, e) => {
        if (this.contextMenuElement) {
          document.body.removeChild(this.contextMenuElement);
        }
        const menu = document.createElement('div');
        menu.style.position = 'absolute';
        menu.style.top = `${e.clientY}px`;
        menu.style.left = `${e.clientX}px`;
        menu.style.backgroundColor = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.zIndex = '1000';
        menu.style.padding = '5px';
        menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        this.contextMenuElement = menu;

        const addButton = (title, onclick) => {
          const button = document.createElement('button');
          button.innerText = title;
          button.style.display = 'block';
          button.style.width = '100%';
          button.style.margin = '2px 0';
          button.onclick = (event) => {
            event.stopPropagation();
            onclick();
            document.body.removeChild(menu);
            this.contextMenuElement = null;
          };
          menu.appendChild(button);
        };

        if (x !== null && y === null) {
          addButton('Insert Column Before', () => {
            obj.insertColumn(1, parseInt(x), 1);
          });
          addButton('Insert Column After', () => {
            obj.insertColumn(1, parseInt(x), 0);
          });
          addButton('Delete Column', () => {
            obj.deleteColumn(obj.getSelectedColumns().length ? undefined : parseInt(x))
          });
        }
        if (x === null && y !== null) {
          addButton('Insert New Row Before', () => {
            obj.insertRow(1, parseInt(y), 1);
          });
          addButton('Insert New Row After', () => {
            obj.insertRow(1, parseInt(y));
          });
          addButton('Delete Row', () => {
            obj.deleteRow(obj.getSelectedRows().length ? undefined : parseInt(y));
          });
        }
        if (x !== null && y !== null) {
          addButton('Copy', () => {
            obj.copy(true);
          });
          addButton('Paste', () => {
            console.log('Paste');
            if (this.getSelectedCell()) {
              console.log('Paste1');
              if (!this.navigator.clipboard) {
                alert('Undefined clipboard');
              } else {
                this.navigator.clipboard.readText().then((text) => {
                  console.log('Paste2');
                  if (text && this.getSelectedCell()) {
                    console.log('Paste3');
                    const [startCell] = this.getSelectedCell();
                    this.spreadsheet.paste(startCell[0], startCell[1], text);
                  }
                });
              }
            }
          });
        }

        addButton('Load from File', () => this.loadFromFile());

        document.body.appendChild(menu);
        document.addEventListener('click', () => {
          if (menu.parentNode) {
            menu.parentNode.removeChild(menu);
            this.contextMenuElement = null;
          }
        }, { once: true });
        return false;
      }
    });

    this.isCreated = true;
    this.editorContainer = container;

    return container;
  }

  closeEditor_() {
    if (this.isClosing) {
      return;
    }
    this.enableBlocklyShortcuts();
    this.isClosing = true;
    this.customDropDown.hide();
    this.isClosing = false;
  }

  getSelectedCell() {
    return this.selectedCell;
  }

  loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const content = e.target.result as string;
          const rows = content.split('\n').map(row => row.replace(/\r$/, '').split(','));
          this.spreadsheet.setData(rows);
          this.setValue(rows);
          this.updateContainerSize();
          this.updateDisplayText();
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  setValue(value: any) {
    if (!Array.isArray(value)) {
      value = [[]];
    }
    const oldValue = JSON.parse(JSON.stringify(this.oldValue));
    this.value_ = JSON.parse(JSON.stringify(value));
    this.updateDisplayText();
    if (this.spreadsheet) {
      this.spreadsheet.setData(this.value_);
    }
    if (JSON.stringify(oldValue) !== JSON.stringify(this.value_)) {
      this.fireChangeEvent_(oldValue, this.value_);
    }
    super.setValue(this.value_);
  }

  updateContainerSize() {
    const numRows = this.value_.length;
    const numCols = this.value_[0].length;

    const containerWidth = this.getContainerWidth(numCols);
    const containerHeight = this.getContainerHeight(numRows);

    if (this.editorContainer) {
      this.editorContainer.style.width = `${containerWidth}px`;
      this.editorContainer.style.height = `${containerHeight}px`;
    }
  }

  forceRerender() {
    if (this.isCreated) {
      this.spreadsheet.setData(this.value_);
    }
  }

  getValue() {
    return this.value_;
  }

  updateDisplayText() {
    if (this.value_ && this.value_.length > 0) {
      if (this.spreadsheet && this.spreadsheet.getHeaders) {
        const headers = this.spreadsheet.getHeaders(true);
        if (headers && headers.length > 0) {
          this.displayText = headers.join(', ');
        } else {
          this.displayText = this.value_.map((row: any) => row[0]).join(', ');
        }
      } else {
        this.displayText = this.value_.map((row: any) => row[0]).join(', ');
      }
    } else {
      this.displayText = '';
    }
    this.forceRerender();
  }

  getText_() {
    return this.displayText;
  }

  fromXml(fieldElement: Element) {
    const value = JSON.parse(fieldElement.textContent || '[]');
    this.setValue(value);
  }

  toXml(fieldElement: Element) {
    const value = this.getValue();
    fieldElement.textContent = JSON.stringify(value);
    return fieldElement;
  }

  fireChangeEvent_(oldValue: any, newValue: any) {
    if (this.sourceBlock_) {
      Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name || '', oldValue, newValue));
    }
  }

  disableBlocklyShortcuts() {
    if (this.originalKeyMap === null) {
      this.originalKeyMap = JSON.parse(JSON.stringify(Blockly.ShortcutRegistry.registry.getKeyMap()));
      const emptyKeyMap = {};
      Blockly.ShortcutRegistry.registry.setKeyMap(emptyKeyMap);
    }
  }

  enableBlocklyShortcuts() {
    if (this.originalKeyMap !== null) {
      Blockly.ShortcutRegistry.registry.setKeyMap(this.originalKeyMap);
      this.originalKeyMap = null;
    }
  }
}

Blockly.fieldRegistry.register('field_jspreadsheet', FieldJSpreadsheet);

export { FieldJSpreadsheet };
