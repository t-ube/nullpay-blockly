import * as Blockly from 'blockly';
import { Field } from 'blockly';

const cellWidth = 80;
const cellHeight = 26;
const minContainerWidth = 220;
const minContainerHeight = 100;
const maxContainerWidth = 18000;
const maxContainerHeight = 16000;

export class CustomDropDown {
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

class BasePopupField extends Blockly.Field {
  isClosing: boolean = false;
  displayText: string = '';
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  contextMenuElement: HTMLElement | null = null;
  navigator: Navigator = window.navigator;
  selectedCell: string[] = [];
  originalKeyMap: any = null;
  customDropDown: CustomDropDown | null;

  constructor(value: any) {
    super(Field.SKIP_SETUP);
    this.SERIALIZABLE = true;
    this.value_ = value;
    super.setValue(value);
    this.customDropDown = null;
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
      if (!this.customDropDown) {
        this.customDropDown = new CustomDropDown();
      }
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
    // TODO: Implement the editor creation logic here

    this.isCreated = true;
    this.editorContainer = null;

    return this.editorContainer;
  }

  closeEditor_() {
    if (this.isClosing) {
      return;
    }
    this.enableBlocklyShortcuts();
    this.isClosing = true;
    if (this.customDropDown) {
      this.customDropDown.hide();
      this.customDropDown = null;
    }
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
          // TODO: Process the file content and update the field value
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  updateContainerSize() {
    // TODO: Implement the container size update logic here
  }

  forceRerender() {
    // TODO: Implement the force rerender logic here
  }

  getValue() {
    return this.value_;
  }

  updateDisplayText() {
    // TODO: Implement the display text update logic here
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

Blockly.fieldRegistry.register('base_popup_field', BasePopupField);

export { BasePopupField };