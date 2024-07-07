import * as Blockly from 'blockly';
import { Field } from 'blockly';

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
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
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
    contentDiv.style.padding = '20px';
    contentDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    contentDiv.style.maxHeight = 'calc(100% - 40px)';
    contentDiv.style.maxWidth = 'calc(100% - 40px)';
    contentDiv.style.overflow = 'auto';
    return contentDiv;
  }

  showByField(field: Field) {
    const position = this.getFieldPosition(field);
    this.contentDiv.style.left = `${position.x}px`;
    this.contentDiv.style.top = `${position.y + field.getSize().height}px`;
    this.modal.style.display = 'block';
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

class FieldModal extends Blockly.Field {
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
    this.oldValue = JSON.parse(JSON.stringify(this.value_));
    this.value_ = value;
    this.setValue(value);
    this.updateDisplayText();
    this.customModal = new CustomModal();
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

  createEditor_() {
    this.disableBlocklyShortcuts();
    if (this.isCreated && this.editorContainer) {
      return this.editorContainer;
    }
    const containerWidth = 400;
    const containerHeight = 400;

    const container = document.createElement('div');
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;
    //container.style.overflow = 'auto';

    const spreadsheetContainer = document.createElement('div');
    spreadsheetContainer.style.width = 'fit-content';
    spreadsheetContainer.style.height = 'calc(100% - 10px)';
    container.appendChild(spreadsheetContainer);

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
    input.accept = '.json';
    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
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
    if (JSON.stringify(oldValue) !== JSON.stringify(this.value_)) {
      this.fireChangeEvent_(oldValue, this.value_);
    }
    super.setValue(this.value_);
  }

  updateContainerSize() {
    const containerWidth = 400;
    const containerHeight = 400;

    if (this.editorContainer) {
      this.editorContainer.style.width = `${containerWidth}px`;
      this.editorContainer.style.height = `${containerHeight}px`;
    }
  }

  forceRerender() {
    if (this.isCreated) {
    }
  }

  getValue() {
    return this.value_;
  }

  updateDisplayText() {
    if (this.value_ && this.value_.length > 0) {
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

Blockly.fieldRegistry.register('field_jsoneditor', FieldModal);

export { FieldModal };
