import * as Blockly from 'blockly';
import { FieldTextInput } from 'blockly';

// deepcopy関数を定義
function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function stringToArray(value: string): any[][] {
  return JSON.parse(value);
}

function arrayToString(value: any[][]): string {
  return JSON.stringify(value);
}

export class FieldTable extends FieldTextInput {
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  displayText: string = '';

  constructor(value: any) {
    super(arrayToString(value || [[]]));
    this.SERIALIZABLE = true;
    this.updateDisplayText();
  }

  static fromJson(options: any) {
    return new this(options['table']);
  }

  widgetCreate_() {
    const htmlInput = super.widgetCreate_() as HTMLInputElement;
    htmlInput.type = 'text';
    return htmlInput;
  }

  showEditor_(e:any) {
    console.log('showEditor_');
    super.showEditor_(e, true);
    if (this.htmlInput_) {
      this.showDropdown();
    }
  }

  showDropdown() {
    const editor = this.createEditor_();
    Blockly.DropDownDiv.getContentDiv().appendChild(editor);
    Blockly.DropDownDiv.showPositionedByField(this, this.disposeEditor_.bind(this));
    return editor;
  }

  createEditor_() {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.height = '200px';
    container.style.overflow = 'auto';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    if (this.value_) {
      stringToArray(this.value_).forEach((row: any, rowIndex: number) => {
        const tr = document.createElement('tr');
        row.forEach((cell: any, cellIndex: number) => {
          const td = document.createElement('td');
          td.style.border = '1px solid #ccc';
          td.style.padding = '4px';
          td.style.textAlign = 'center';
          td.contentEditable = 'true';
          td.innerText = cell;
          td.addEventListener('input', (e) => {
            const newValue = (e.target as HTMLTableCellElement).innerText;
            if (this.value_) {
              const arrayValue = stringToArray(this.value_);
              if (arrayValue[rowIndex][cellIndex] !== newValue) {
                const oldValue = deepCopy(arrayValue);
                arrayValue[rowIndex][cellIndex] = newValue;
                this.value_ = arrayToString(arrayValue);
                this.updateDisplayText();
                this.render_();
                this.fireChangeEvent_(arrayToString(oldValue), this.value_);
              }
            }
          });
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
    }
    
    container.appendChild(table);

    const loadButton = document.createElement('button');
    loadButton.innerText = 'Load from File';
    loadButton.addEventListener('click', this.loadFromFile.bind(this));
    container.appendChild(loadButton);
    
    return container;
  }

  disposeEditor_() {
    Blockly.DropDownDiv.getContentDiv().innerHTML = '';
  }

  loadFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.addEventListener('change', this.handleFileSelect.bind(this));
    input.click();
  }

  handleFileSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const content = e.target.result as string;
        const rows = content.split('\n').map(row => row.replace(/\r$/, '').split(','));
        const oldValue = this.getValue();
        this.setValue(arrayToString(rows));
        this.fireChangeEvent_(oldValue, rows);
      }
    };
    reader.readAsText(file);
  }

  setValue(value: any) {
    if (!Array.isArray(stringToArray(value))) {
      value = arrayToString([[]]);
    }
    const oldValue = this.value_;
    this.value_ = value;
    this.updateDisplayText();
    this.forceRerender();
    this.fireChangeEvent_(oldValue, value);
  }

  forceRerender() {
    console.log('forceRerender');
    if (Blockly.DropDownDiv.isVisible()) {
      const editor = this.createEditor_();
      Blockly.DropDownDiv.getContentDiv().innerHTML = '';
      Blockly.DropDownDiv.getContentDiv().appendChild(editor);
      this.render_();
    }
  }

  getValue() {
    return this.value_;
  }

  fireChangeEvent_(oldValue: any, newValue: any) {
    if (this.sourceBlock_) {
      Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name || '', oldValue, newValue));
    }
  }

  updateDisplayText() {
    if (this.value_){
      const arrayValue = stringToArray(this.value_);
      if (arrayValue.length > 0 && arrayValue[0].length > 0) {
        this.displayText = arrayValue[0][0];
      } else {
        this.displayText = '';
      }
    } else {
      this.displayText = '';
    }
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
}

Blockly.fieldRegistry.register('field_table', FieldTable);
