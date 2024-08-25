import * as Blockly from 'blockly';
import { Field } from 'blockly';
import { v4 as uuidv4 } from 'uuid';
import { createStylishColorButton } from '@/blocks/form/FormButtonHelper';

interface IMessageValue {
  message: string;
  waitForClose: boolean;
}

export function getDefaultMessageValue(): IMessageValue {
  return {
    message: '',
    waitForClose: true
  };
}

class CustomMessageModal {
  static instance: CustomMessageModal | null = null;
  contentDiv: HTMLDivElement;
  modal: HTMLDivElement;
  backdrop: HTMLDivElement;
  closeOnOutsideClick: boolean;
  onShow?: () => void;
  onHide?: () => void;

  constructor() {
    this.contentDiv = this.createContentDiv();
    this.backdrop = this.createBackdrop();
    this.modal = this.createModal();
    this.modal.appendChild(this.contentDiv);
    document.body.appendChild(this.backdrop);
    document.body.appendChild(this.modal);
    this.closeOnOutsideClick = true;
    this.backdrop.addEventListener('mousedown', this.handleOutsideClick.bind(this));
  }

  static getInstance(): CustomMessageModal {
    if (!CustomMessageModal.instance) {
      CustomMessageModal.instance = new CustomMessageModal();
    }
    return CustomMessageModal.instance;
  }

  createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
    backdrop.style.display = 'none';
    backdrop.style.zIndex = '19';
    return backdrop;
  }

  createModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    //modal.style.padding = '20px';
    modal.style.borderRadius = '20px';
    modal.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    modal.style.display = 'none';
    modal.style.zIndex = '20';
    return modal;
  }

  createContentDiv() {
    return document.createElement('div');
  }

  showByField(field: Field, closeOnOutsideClick: boolean = true, onShow?: () => void, onHide?: () => void) {
    this.closeOnOutsideClick = closeOnOutsideClick;
    this.onShow = onShow;
    this.onHide = onHide;
    this.modal.style.display = 'block';
    this.backdrop.style.display = 'block';
    this.onShow?.();
  }

  hide() {
    this.modal.style.display = 'none';
    this.backdrop.style.display = 'none';
    this.onHide?.();
    this.contentDiv.innerHTML = '';
  }

  handleOutsideClick(event: MouseEvent) {
    if (this.closeOnOutsideClick && !this.modal.contains(event.target as Node)) {
      this.hide();
    }
  }

  getContentDiv() {
    return this.contentDiv;
  }
}

class FieldMessageModal extends Blockly.Field {
  value_: IMessageValue;
  customModal: CustomMessageModal | null = null;
  messageId: string;
  isClosing: boolean = false;
  displayText: string = '';

  constructor(value: IMessageValue) {
    super(Field.SKIP_SETUP);
    this.SERIALIZABLE = true;
    this.value_ = value;
    this.messageId = uuidv4();
    this.customModal = null;
  }

  initView() {
    super.initView();
    this.createTextElement_();
    this.updateDisplayText();
  }

  showEditor_() {
    if (this.isClosing) {
      return;
    }
    this.customModal = CustomMessageModal.getInstance();
    const editor = this.createEditor_();
    if (editor) {
      this.customModal.getContentDiv().innerHTML = '';
      this.customModal.getContentDiv().appendChild(editor);
      this.customModal.showByField(this, true);
    }
  }

  createFestiveContainer(message: string) {
    const container = document.createElement('div');
    //container.style.padding = '40px';
    container.style.width = '400px';
    container.style.height = '300px';
    container.style.minHeight = '200px';
    container.style.maxHeight = '400px'; 
    //container.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)';
    container.style.background = 'white';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.textAlign = 'center';

    const titleElement = document.createElement('h1');
    titleElement.textContent = message;
    titleElement.style.fontFamily = '"Arial Black", Gadget, sans-serif';
    titleElement.style.fontSize = '36px';
    titleElement.style.padding = '20px';
    titleElement.style.fontWeight = '900';
    //titleElement.style.color = 'white';
    titleElement.style.color = 'black';
    //titleElement.style.textTransform = 'uppercase';
    titleElement.style.letterSpacing = '2px';
    titleElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    titleElement.style.marginBottom = '30px';
    titleElement.style.width = '100%';
    titleElement.style.overflowWrap = 'break-word';
    titleElement.style.wordBreak = 'break-word';
    titleElement.style.textAlign = 'center';
    titleElement.style.maxHeight = '280px';
    titleElement.style.overflowY = 'auto';
    container.appendChild(titleElement);

    /*
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.style.fontFamily = 'Arial, sans-serif';
    messageElement.style.fontSize = '24px';
    messageElement.style.fontWeight = 'bold';
    messageElement.style.color = 'white';
    messageElement.style.lineHeight = '1.4';
    messageElement.style.marginBottom = '40px';
    messageElement.style.maxWidth = '80%';
    container.appendChild(messageElement);
    */

    return container;
  }

  createFestiveButton(text: string, onClick: () => void) {
    //const button = createStylishColorButton(text, '#FFD700');
    const button = createStylishColorButton(text, '#20B2AA');
    button.style.fontSize = '20px';
    button.style.fontWeight = 'bold';
    button.style.padding = '15px 30px';
    button.style.borderRadius = '50px';
    button.style.border = 'none';
    //button.style.color = '#1a1a1a';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    button.onmouseover = () => {
      //button.style.backgroundColor = '#FFA500';
      button.style.backgroundColor = '#008B8B';
      button.style.transform = 'scale(1.05)';
    };
    button.onmouseout = () => {
      //button.style.backgroundColor = '#FFD700';
      button.style.backgroundColor = '#20B2AA';
      button.style.transform = 'scale(1)';
    };
    button.onclick = onClick;
    return button;
  }

  /*
  createEditor_() {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.maxWidth = '300px';

    const messageElement = document.createElement('p');
    messageElement.textContent = this.value_.message;
    messageElement.style.marginBottom = '20px';
    container.appendChild(messageElement);

    const okButton = createStylishColorButton('OK', '#4CAF50');
    okButton.onclick = () => {
      this.customModal?.hide();
    };
    container.appendChild(okButton);

    return container;
  }*/

  /*
  async showModalAtRuntime(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.value_.message = message;

      const customModal = CustomMessageModal.getInstance();
      customModal.hide();

      const container = document.createElement('div');
      container.style.padding = '20px';
      container.style.maxWidth = '300px';

      const messageElement = document.createElement('p');
      messageElement.textContent = this.value_.message;
      messageElement.style.marginBottom = '20px';
      container.appendChild(messageElement);

      const okButton = createStylishColorButton('OK', '#4CAF50');
      okButton.onclick = () => {
        customModal.hide();
        resolve();
      };
      container.appendChild(okButton);

      customModal.getContentDiv().appendChild(container);
      customModal.showByField(this, false);
    });
  }*/

  createEditor_() {
    const container = this.createFestiveContainer(this.value_.message);
    const okButton = this.createFestiveButton('Close', () => {
      this.customModal?.hide();
    });
    container.appendChild(okButton);
    return container;
  }

  async showModalAtRuntime(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.value_.message = message;

      const customModal = CustomMessageModal.getInstance();
      customModal.hide();

      const container = this.createFestiveContainer(message);
      const okButton = this.createFestiveButton('Close', () => {
        customModal.hide();
        resolve();
      });
      container.appendChild(okButton);

      customModal.getContentDiv().appendChild(container);
      customModal.showByField(this, false);
    });
  }

  closeEditor_() {
    if (this.isClosing) {
      return;
    }
    this.isClosing = true;
    this.customModal?.hide();
    this.isClosing = false;
  }

  doClassValidation_(value: IMessageValue) {
    if (typeof value.message !== 'string' || typeof value.waitForClose !== 'boolean') {
      return null;
    }
    return value;
  }

  setValue(newValue: IMessageValue) {
    const validatedValue = this.doClassValidation_(newValue);
    if (validatedValue !== null) {
      this.value_ = validatedValue;
    }
    this.updateDisplayText();
  }

  getValue() {
    return this.value_;
  }

  updateDisplayText() {
    this.displayText = `Show`;
    this.forceRerender();
  }


  fromXml(fieldElement: Element) {
    const value = JSON.parse(fieldElement.textContent || '{}');
    this.setValue(value);
  }

  toXml(fieldElement: Element) {
    fieldElement.textContent = JSON.stringify(this.value_);
    return fieldElement;
  }

  protected getText_() {
    return this.displayText;
  }

  protected getDisplayText_() {
    return this.getText_();
  }

  static fromJson(options: any): FieldMessageModal {
    return new FieldMessageModal(options['value'] as IMessageValue);
  }
}

Blockly.fieldRegistry.register('field_message_modal', FieldMessageModal);

export { FieldMessageModal };