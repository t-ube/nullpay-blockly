import * as Blockly from 'blockly';

// deepcopy関数を定義
function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export class FieldTable extends Blockly.Field {
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  displayText: string = '';

  constructor(value: any) {
    super(value || [[]]);
    this.SERIALIZABLE = true;
    if (!Array.isArray(this.value_)) {
      this.value_ = [[]];
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

    this.value_.forEach((row: any, rowIndex: number) => {
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
          if (this.value_[rowIndex][cellIndex] !== newValue) {
            const oldValue = deepCopy(this.value_);
            this.value_[rowIndex][cellIndex] = newValue;
            this.updateDisplayText();
            this.render_();
            this.fireChangeEvent_(oldValue, this.value_);
          }
        });
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

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
      const content = e.target.result as string;
      const rows = content.split('\n').map(row => row.replace(/\r$/, '').split(','));
      const oldValue = this.getValue();
      this.setValue(rows);
      this.fireChangeEvent_(oldValue, rows);
    };
    reader.readAsText(file);
  }

  setValue(value: any) {
    if (!Array.isArray(value)) {
      value = [[]];
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
    }
    this.render_();
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
    if (this.value_.length > 0 && this.value_[0].length > 0) {
      this.displayText = this.value_[0][0];
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

    const xOffset = constants.FIELD_BORDER_RECT_X_PADDING;
    let totalWidth = xOffset * 2;
    let totalHeight = constants.FIELD_TEXT_HEIGHT;

    let contentWidth = 0;
    if (this.textElement_) {
      contentWidth = Blockly.utils.dom.getFastTextWidth(
        this.textElement_,
        constants.FIELD_TEXT_FONTSIZE,
        constants.FIELD_TEXT_FONTWEIGHT,
        constants.FIELD_TEXT_FONTFAMILY,
      );
      totalWidth += contentWidth;
    }
    if (!this.isFullBlockField()) {
      totalHeight = Math.max(totalHeight, constants.FIELD_BORDER_RECT_HEIGHT);
    }

    this.size_.height = totalHeight;
    this.size_.width = totalWidth;

    this.positionTextElement_(xOffset, contentWidth);
    this.positionBorderRect_();
  }

  protected positionTextElement_(xOffset: number, contentWidth: number) {
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
          ? this.size_.width - contentWidth - xOffset
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
