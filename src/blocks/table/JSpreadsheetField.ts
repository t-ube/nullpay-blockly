import * as Blockly from 'blockly';
import { Field } from 'blockly';
import 'jspreadsheet-ce/dist/jspreadsheet.css';
import jspreadsheet from 'jspreadsheet-ce';

const cellWidth = 50;
const cellHeight = 26;
const HeaderHeight = 36;
const minContainerWidth = 200;
const minContainerHeight = 100;
const maxContainerWidth = 18000;
const maxContainerHeight = 16000;

class CustomModal {
  contentDiv: HTMLDivElement;
  modal: HTMLDivElement;

  constructor() {
    this.contentDiv = this.createContentDiv();
    this.modal = this.createModal();
    this.modal.appendChild(this.contentDiv);
    document.body.appendChild(this.modal);
  }

  createModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'transparent';
    modal.style.display = 'none';
    modal.style.zIndex = '1000';
    modal.addEventListener('mousedown', this.handleOutsideClick.bind(this));
    return modal;
  }

  createContentDiv() {
    const contentDiv = document.createElement('div');
    contentDiv.style.position = 'absolute';
    contentDiv.style.backgroundColor = '#fff';
    contentDiv.style.border = '1px solid #ccc';
    contentDiv.style.padding = '0';
    contentDiv.style.borderRadius = '6px';
    contentDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    contentDiv.style.maxHeight = '600px';
    contentDiv.style.maxWidth = '600px';
    contentDiv.style.overflow = 'auto';
    contentDiv.style.resize = 'both';
    this.addResizeHandles(contentDiv);
    return contentDiv;
  }

  addResizeHandles(contentDiv: HTMLDivElement) {
    const resizeHandle = document.createElement('div');
    resizeHandle.style.width = '10px';
    resizeHandle.style.height = '10px';
    resizeHandle.style.backgroundColor = 'gray';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.right = '0';
    resizeHandle.style.cursor = 'nwse-resize';
    contentDiv.appendChild(resizeHandle);

    resizeHandle.addEventListener('mousedown', this.initResize.bind(this), false);
  }

  initResize(e: MouseEvent) {
    window.addEventListener('mousemove', this.resize.bind(this), false);
    window.addEventListener('mouseup', this.stopResize.bind(this), false);
  }

  resize(e: MouseEvent) {
    this.contentDiv.style.width = (e.clientX - this.contentDiv.offsetLeft) + 'px';
    this.contentDiv.style.height = (e.clientY - this.contentDiv.offsetTop) + 'px';
  }

  stopResize() {
    window.removeEventListener('mousemove', this.resize.bind(this), false);
    window.removeEventListener('mouseup', this.stopResize.bind(this), false);
  }

  showByField(field: Field) {
    const position = this.getFieldPosition(field);
    const modalOffsetX = 75;
    const modalOffsetY = 60;

    // モーダルを一度表示してから幅と高さを取得
    this.modal.style.display = 'block';

    // 画面のサイズを取得
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 左右にはみ出さないように調整
    let left = position.x - modalOffsetX;
    if (left < 0) left = 0;
    if (left + this.contentDiv.clientWidth > viewportWidth) left = viewportWidth - this.contentDiv.clientWidth;

    // 上下にはみ出さないように調整
    let top = position.y + field.getSize().height + modalOffsetY;
    if (top < 0) top = 0;
    if (top + this.contentDiv.clientHeight > viewportHeight) top = viewportHeight - this.contentDiv.clientHeight - modalOffsetY;

    // 調整した位置を適用
    this.contentDiv.style.left = `${left}px`;
    this.contentDiv.style.top = `${top}px`;
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
      x: (blockPosition.left - injectionDiv.left),
      y: (blockPosition.top - injectionDiv.top)
    };
  }

  hide() {
    this.modal.style.display = 'none';
  }

  handleOutsideClick(event: MouseEvent) {
    if (!this.contentDiv.contains(event.target as Node)) {
      this.hide();
    }
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
  customModal: CustomModal;

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
    this.customModal = new CustomModal();
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
      this.customModal.getContentDiv().innerHTML = '';
      this.customModal.getContentDiv().appendChild(editor);
      this.customModal.showByField(this);
    }
  }

  getContainerWidth(numCols: number) {
    return Math.max(minContainerWidth, Math.min(numCols * cellWidth, maxContainerWidth));
  }

  getContainerHeight(numRows: number) {
    return Math.max(minContainerHeight, Math.min((numRows * cellHeight) + HeaderHeight, maxContainerHeight));
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
    this.customModal.hide();
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
    const block = this.getSourceBlock() as Blockly.Block;
    if (block) {
      block.render(block);
    }
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
