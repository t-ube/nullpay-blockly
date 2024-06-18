import * as Blockly from 'blockly';
import { Field } from 'blockly';
import 'jspreadsheet-ce/dist/jspreadsheet.css';
import jspreadsheet from 'jspreadsheet-ce';
import { UploadFile, Delete } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material';

const cellWidth = 50;
const cellHeight = 26;
const HeaderHeight = 36;
const minContainerWidth = 200;
const minContainerHeight = 100;
const maxContainerWidth = 18000;
const maxContainerHeight = 16000;

class FieldJSpreadsheet extends Field {
  spreadsheet: any;
  isClosing: boolean = false;
  displayText: string = '';
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  oldValue: any;
  contextMenuElement: HTMLElement | null = null;
  navigator:Navigator =  window.navigator;
  selectedCell: string[] = [];
  originalKeyMap: any = null;

  constructor(value: any) {
    console.log('constructor');
    super(Field.SKIP_SETUP);
    this.SERIALIZABLE = true;
    if (!Array.isArray(this.value_)) {
      value = Array.from({ length: 3 }, () => Array(3).fill(''));
    }
    this.oldValue = JSON.parse(JSON.stringify(this.value_));
    this.value_ = value;
    this.setValue(value);
    this.updateDisplayText();
  }

  static fromJson(options: any) {
    console.log('fromJson');
    return new this(options['table']);
  }

  showEditor_() {
    console.log('showEditor_');
    if (this.isClosing) {
      console.log('return(isClosing)');
      return;
    }
    const editor = this.createEditor_();
    if (editor) {
      Blockly.DropDownDiv.getContentDiv().innerHTML = '';
      Blockly.DropDownDiv.getContentDiv().appendChild(editor);
      Blockly.DropDownDiv.showPositionedByField(this, this.closeEditor_.bind(this));
    }
  }

  getContainerWidth(numCols: number) {
    return Math.max(minContainerWidth, Math.min(numCols * cellWidth, maxContainerWidth));
  }

  getContainerHeight(numRows: number) {
    return Math.max(minContainerHeight, Math.min((numRows * cellHeight) + HeaderHeight, maxContainerHeight));
  }

  createEditor_() {
    console.log('createEditor_');
    this.disableBlocklyShortcuts();
    if (this.isCreated && this.editorContainer) {
      return this.editorContainer; // 既存のエディタを返す
    }
    const numRows = this.value_.length;
    const numCols = this.value_[0].length;

    const containerWidth = this.getContainerWidth(numCols);
    const containerHeight = this.getContainerHeight(numRows);

    const container = document.createElement('div');
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;

    const iconBar = document.createElement('div');
    iconBar.style.display = 'flex';
    iconBar.style.justifyContent = 'space-around';
    iconBar.style.marginBottom = '10px';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', (event: any) => {
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

    const createIconButton = (IconComponent: any, onClick: () => void) : Element => {
      const button = document.createElement('button');
      button.classList.add('icon-button');
      button.appendChild(document.createElement('span')).classList.add('icon', IconComponent);
      button.onclick = onClick;
      return button;
    };
    /*
    const loadFromFileButton = createIconButton(UploadFile, () => fileInput.click());
    const addColumnButton = createIconButton(KeyboardArrowRightIcon, () => this.spreadsheet.insertColumn());
    const deleteColumnButton = createIconButton(Delete, () => this.spreadsheet.deleteColumn());
    const addRowButton = createIconButton(KeyboardArrowDownIcon, () => this.spreadsheet.insertRow());
    const deleteRowButton = createIconButton(RemoveIcon, () => this.spreadsheet.deleteRow());

    iconBar.appendChild(loadFromFileButton);
    iconBar.appendChild(addColumnButton);
    iconBar.appendChild(deleteColumnButton);
    iconBar.appendChild(addRowButton);
    iconBar.appendChild(deleteRowButton);
    */
    const loadFromFileButton = createIconButton(UploadFile, () => fileInput.click());
    iconBar.appendChild(loadFromFileButton);

    container.appendChild(iconBar);
    container.appendChild(fileInput);

    const spreadsheetContainer = document.createElement('div');
    spreadsheetContainer.style.width = 'fit-content';
    spreadsheetContainer.style.height = 'calc(100% - 10px)';
    container.appendChild(spreadsheetContainer);

    this.spreadsheet = jspreadsheet(spreadsheetContainer, {
      data: this.value_,
      minDimensions: [1, 1],
      onload: (el, instance) => {
        console.log('onload');
      },
      onresizecolumn: () => {
        console.log('onresizecolumn');
        this.updateContainerSize();
      },
      onresizerow: () => {
        console.log('onresizerow');
        this.updateContainerSize();
      },
      onbeforechange: (el, cell, x, y, value) => {
        console.log('onbeforechange');
        this.oldValue = JSON.parse(JSON.stringify(this.value_)); // 値が変更される前に古い値を保存
        return value;
      },
      onchange: (el, cell, x, y, value) => {
        console.log('onchange');
        console.log(`${this.oldValue} -> ${this.value_}`)
        this.value_[y][x] = value;
        this.updateDisplayText();
        this.setValue(this.value_); // リアルタイムで値を更新
      },
      onbeforeinsertcolumn: () => {
        console.log('onbeforeinsertcolumn');
        this.oldValue = JSON.parse(JSON.stringify(this.value_)); // カラム挿入前に古い値を保存
        return true;
      },
      oninsertcolumn: () => {
        console.log('oninsertcolumn');
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onbeforedeletecolumn: () => {
        console.log('onbeforedeletecolumn');
        this.oldValue = JSON.parse(JSON.stringify(this.value_)); // カラム削除前に古い値を保存
        return true;
      },
      ondeletecolumn: () => {
        console.log('ondeletecolumn');
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onbeforeinsertrow: () => {
        console.log('onbeforeinsertrow');
        this.oldValue = JSON.parse(JSON.stringify(this.value_)); // 行挿入前に古い値を保存
        return true;
      },
      oninsertrow: () => {
        console.log('oninsertrow');
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onbeforedeleterow: () => {
        console.log('onbeforedeleterow');
        this.oldValue = JSON.parse(JSON.stringify(this.value_)); // 行削除前に古い値を保存
        return true;
      },
      ondeleterow: () => {
        console.log('ondeleterow');
        this.updateContainerSize();
        this.updateDisplayText();
        this.setValue(this.spreadsheet.getData());
      },
      onselection: (el, selection) => {
        console.log(this.spreadsheet.selectedCell);
        this.selectedCell = this.spreadsheet.selectedCell;
      },
    });

    this.isCreated = true;
    this.editorContainer = container; // 作成したエディタを保存

    return container;
  }



  closeEditor_() {
    console.log('closeEditor_');
    if (this.isClosing) {
      console.log('return(isClosing)');
      return;
    }
    this.enableBlocklyShortcuts();
    this.isClosing = true;
    Blockly.DropDownDiv.hideIfOwner(this);
    this.isClosing = false;
  }

  getSelectedCell() {
    console.log(this.selectedCell);
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
    console.log('forceRerender');
    if (this.isCreated) {
      this.spreadsheet.setData(this.value_);
    }
  }

  getValue() {
    console.log('getValue');
    return this.value_;
  }

  updateDisplayText() {
    console.log('updateDisplayText');
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
    console.log('getText_', this.displayText);
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
    console.log('fireChangeEvent_');
    if (this.sourceBlock_) {
      console.log('is this.sourceBlock_');
      Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name || '', oldValue, newValue));
    }
  }

  disableBlocklyShortcuts() {
    console.log('disableBlocklyShortcuts');
    if (this.originalKeyMap === null) {
      this.originalKeyMap = JSON.parse(JSON.stringify(Blockly.ShortcutRegistry.registry.getKeyMap()));
      const emptyKeyMap = {};
      Blockly.ShortcutRegistry.registry.setKeyMap(emptyKeyMap);
    }
  }

  enableBlocklyShortcuts() {
    console.log('enableBlocklyShortcuts');
    if (this.originalKeyMap !== null) {
      Blockly.ShortcutRegistry.registry.setKeyMap(this.originalKeyMap);
      this.originalKeyMap = null;
    }
  }
}

Blockly.fieldRegistry.register('field_jspreadsheet', FieldJSpreadsheet);

export { FieldJSpreadsheet };
