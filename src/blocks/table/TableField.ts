import * as Blockly from 'blockly';
import { v4 as uuidv4 } from 'uuid';

function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function arrayToString(value: any[][]): string {
  return JSON.stringify(value);
}

function stringToArray(value: string): any[][] {
  return JSON.parse(value);
}

export class FieldTable extends Blockly.Field {
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  displayText: string = '';
  fixedWidth: number = 100;
  fixedHeight: number = 24;
  maxTextLength: number = 10;
  uniqueId: string;

  constructor(value: any) {
    super(arrayToString(value || [[]]));
    this.SERIALIZABLE = true;
    this.uniqueId = uuidv4();
    if (!Array.isArray(stringToArray(this.value_))) {
      this.value_ = arrayToString([[]]);
    }
    this.updateDisplayText();
  }

  static fromJson(options: any) {
    return new this(options['table']);
  }

  showEditor_() {
    console.log('showEditor_');
    const editor = this.createEditor_();
    Blockly.DropDownDiv.getContentDiv().appendChild(editor);
    Blockly.DropDownDiv.getContentDiv().setAttribute('data-owner-id', this.uniqueId);
    Blockly.DropDownDiv.showPositionedByField(this, this.disposeEditor_.bind(this));
  }

  createEditor_() {
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.height = '200px';
    container.style.overflow = 'auto';

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

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
          const arrayValue = stringToArray(this.value_);
          if (arrayValue[rowIndex][cellIndex] !== newValue) {
            const oldValue = deepCopy(arrayValue);
            arrayValue[rowIndex][cellIndex] = newValue;
            this.value_ = arrayToString(arrayValue);
            this.updateDisplayText();
            this.render_();
            this.fireChangeEvent_(arrayToString(oldValue), this.value_);
          }
        });
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    container.appendChild(table);

    const loadButton = document.createElement('button');
    loadButton.innerText = 'Load from File';
    loadButton.className = `table-load-button ${this.uniqueId}`;
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
        this.fireChangeEvent_(oldValue, this.value_);
      }
    };
    reader.readAsText(file);
  }

  setValue(value: any) {
    if (typeof value !== 'string') {
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
    if (Blockly.DropDownDiv.isVisible() && Blockly.DropDownDiv.getContentDiv().getAttribute('data-owner-id') === this.uniqueId) {
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
    const arrayValue = stringToArray(this.value_);
    if (arrayValue.length > 0) {
      this.displayText = arrayValue[0].join(', ');
      if (this.displayText.length > this.maxTextLength) {
        this.displayText = this.displayText.substring(0, this.maxTextLength) + '...';
      }
    } else {
      this.displayText = '';
    }
  }

  fromXml(fieldElement: Element) {
    const value = fieldElement.textContent || '[]';
    this.setValue(value);
  }

  toXml(fieldElement: Element) {
    const value = this.getValue();
    fieldElement.textContent = value;
    return fieldElement;
  }

  protected getText_() {
    return this.displayText;
  }

  protected render_() {
    if (this.textContent_) {
      this.textContent_.nodeValue = this.getDisplayText_();
    }
    this.updateSize_();
  }

  protected getDisplayText_() {
    return this.getText_();
  }

  protected updateSize_() {
    const constants = this.getConstants() || {
      FIELD_BORDER_RECT_X_PADDING: 5,
      FIELD_TEXT_HEIGHT: 18,
      FIELD_BORDER_RECT_HEIGHT: 18,
      FIELD_TEXT_FONTSIZE: 12,
      FIELD_TEXT_FONTWEIGHT: 'normal',
      FIELD_TEXT_FONTFAMILY: 'Arial, sans-serif',
      FIELD_TEXT_BASELINE: 14,
      FIELD_TEXT_BASELINE_CENTER: true,
      FIELD_BORDER_RECT_RADIUS: 4
    };

    this.size_.height = this.fixedHeight;
    this.size_.width = this.fixedWidth;

    this.positionTextElement_(constants.FIELD_BORDER_RECT_X_PADDING);
    this.positionBorderRect_();
  }

  protected positionTextElement_(xOffset: number) {
    if (!this.textElement_) {
      return;
    }
    const constants = this.getConstants() || {
      FIELD_TEXT_BASELINE_CENTER: true,
      FIELD_TEXT_HEIGHT: 18,
      FIELD_TEXT_BASELINE: 14
    };
    const halfHeight = this.size_.height / 2;

    this.textElement_.setAttribute(
      'x',
      String(
        this.getSourceBlock()?.RTL
          ? this.size_.width - xOffset
          : xOffset,
      ),
    );
    this.textElement_.setAttribute(
      'y',
      String(
        constants.FIELD_TEXT_BASELINE_CENTER
          ? halfHeight
          : halfHeight -
              constants.FIELD_TEXT_HEIGHT / 2 +
              constants.FIELD_TEXT_BASELINE,
      ),
    );
  }

  protected positionBorderRect_() {
    if (!this.borderRect_) {
      return;
    }
    const constants = this.getConstants() || {
      FIELD_BORDER_RECT_RADIUS: 4
    };
    this.borderRect_.setAttribute('width', String(this.size_.width));
    this.borderRect_.setAttribute('height', String(this.size_.height));
    this.borderRect_.setAttribute(
      'rx',
      String(constants.FIELD_BORDER_RECT_RADIUS),
    );
    this.borderRect_.setAttribute(
      'ry',
      String(constants.FIELD_BORDER_RECT_RADIUS),
    );
  }
}

Blockly.fieldRegistry.register('field_table', FieldTable);
