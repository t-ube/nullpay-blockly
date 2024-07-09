// @/blocks/form/FieldForm.ts
import * as Blockly from 'blockly';
import { Field } from 'blockly';
import { v4 as uuidv4 } from 'uuid';
import { 
  createStylishColorButton,
  createStylishIconButton,
  createDeleteButton
} from '@/blocks/form/FormButtonHelper';
import { IFormValue, IFormItem, IFormResult } from '@/interfaces/IForm';


export function getDefaultFormValue () : IFormResult {
  return (
    { editable: true, title: { default: 'Form Title' }, items: {}, return: {submit: false} }
  );
}

function getLocalizedText(localizedText: { default: string, [key: string]: string }, language: string): string {
  return localizedText[language] || localizedText.default;
}

class CustomModal {
  contentDiv: HTMLDivElement;
  modal: HTMLDivElement;
  backdrop: HTMLDivElement;
  private closeOnOutsideClick: boolean;

  constructor(closeOnOutsideClick: boolean = true) {
    this.contentDiv = this.createContentDiv();
    this.backdrop = this.createBackdrop();
    this.modal = this.createModal();
    this.modal.appendChild(this.contentDiv);
    document.body.appendChild(this.backdrop);
    document.body.appendChild(this.modal);
    this.closeOnOutsideClick = closeOnOutsideClick;
    this.backdrop.addEventListener('mousedown', this.handleOutsideClick.bind(this));
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
    backdrop.style.zIndex = '999';
    backdrop.addEventListener('mousedown', this.handleOutsideClick.bind(this));
    return backdrop;
  }

  createModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    modal.style.border = '1px solid #ccc';
    modal.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    modal.style.maxHeight = 'calc(100% - 40px)';
    modal.style.maxWidth = 'calc(100% - 40px)';
    modal.style.overflow = 'auto';
    modal.style.display = 'none';
    modal.style.zIndex = '1000';
    modal.style.borderRadius = '6px';
    return modal;
  }

  createContentDiv() {
    const contentDiv = document.createElement('div');
    contentDiv.style.backgroundColor = '#fff';
    contentDiv.style.border = '1px solid #ccc';
    contentDiv.style.padding = '20px';
    contentDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    contentDiv.style.maxHeight = 'calc(100% - 40px)';
    contentDiv.style.maxWidth = 'calc(100%)';
    contentDiv.style.overflow = 'auto';
    contentDiv.style.borderRadius = '6px';
    return contentDiv;
  }

  showByField(field: Field) {
    this.modal.style.display = 'block';
    this.backdrop.style.display = 'block';
  }

  hide() {
    this.modal.style.display = 'none';
    this.backdrop.style.display = 'none';
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

class FieldForm extends Blockly.Field {
  isClosing: boolean = false;
  displayText: string = '';
  isCreated: boolean = false;
  editorContainer: HTMLElement | null = null;
  oldValue: any;
  contextMenuElement: HTMLElement | null = null;
  navigator: Navigator = window.navigator;
  selectedCell: string[] = [];
  originalKeyMap: any = null;
  customModal: CustomModal | null;
  formValues: IFormValue;
  currentLanguage: string = 'en-US';
  formId: string;
  buttonContainerId: string;
  fixedWidth: number = 60;
  fixedHeight: number = 24;
  maxTextLength: number = 14;

  constructor(value: IFormValue) {
    super(Field.SKIP_SETUP);
    this.SERIALIZABLE = true;
    this.oldValue = JSON.parse(JSON.stringify(value));
    this.formId = uuidv4();
    this.buttonContainerId = uuidv4();
    this.formValues = value;
    this.customModal = null;
    this.setValue(value);
    this.updateDisplayText();
  }

  async showModalAtRuntime(): Promise<IFormResult> {
    return new Promise((resolve) => {
      const modal = new CustomModal(false);
      const container = this.createEditor_(true);
      modal.getContentDiv().appendChild(container);
      
      const buttonContainer = document.createElement('div');
      buttonContainer.style.textAlign = 'center';
      buttonContainer.style.marginTop = '20px';

      const submitButton = createStylishColorButton('Submit', '#7248B9');
      submitButton.addEventListener('click', () => {
        const form = document.getElementById(this.formId) as HTMLFormElement;
        this.updateFormValues(form);
        modal.hide();
        resolve({
          ...this.getValue(),
          return: { submit: true }
        });
      });
      
      const cancelButton = createStylishColorButton('Cancel', '#9CA3AF');
      cancelButton.addEventListener('click', () => {
        modal.hide();
        resolve({
          ...this.getValue(),
          return: { submit: false }
        });
      });

      buttonContainer.appendChild(cancelButton);
      buttonContainer.appendChild(submitButton);
      modal.getContentDiv().appendChild(buttonContainer);
      modal.showByField(this);
    });
  }

  showEditor_() {
    if (this.isClosing) {
      return;
    }
    if (!this.customModal) {
      this.customModal = new CustomModal();
    }
    const editor = this.createEditor_();
    if (editor) {
      this.customModal.getContentDiv().innerHTML = '';
      this.customModal.getContentDiv().appendChild(editor);
      this.customModal.showByField(this);
    }
  }

  createEditor_(isRuntime: boolean = false) {
    this.disableBlocklyShortcuts();
    if (this.isCreated && this.editorContainer) {
      return isRuntime ? this.updateEditorForRuntime(this.editorContainer) : this.updateEditorForEditing(this.editorContainer);
    }
    console.log("createEditor_: First");
  
    const container = document.createElement('div');
    container.style.width = '400px';
    container.style.height = 'auto';
    container.style.overflow = 'auto';
    container.style.position = 'relative';
  
    const toggleContainer = this.createToggleSwitch();
    toggleContainer.style.marginLeft = 'auto';
    toggleContainer.style.marginRight = '0px';
    toggleContainer.style.marginBottom = '10px';
    container.appendChild(toggleContainer);
  
    const form = document.createElement('form');
    form.id = this.formId;
  
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'form_title';
    titleInput.value = getLocalizedText(this.value_.title, this.currentLanguage);
    titleInput.readOnly = isRuntime || !this.value_.editable;
    titleInput.style.width = '100%';
    titleInput.style.fontSize = 'large';
    titleInput.style.fontWeight = 'bold';
    titleInput.style.textAlign = 'center';
    titleInput.style.marginBottom = '20px';
    titleInput.addEventListener('input', () => {
      if (!isRuntime) {
        this.value_.title.default = titleInput.value;
        this.updateFormValues(form);
      }
    });
    form.appendChild(titleInput);
    this.applyEditableStyles(titleInput, !isRuntime && this.value_.editable);
  
    this.createFormFields(form, this.value_, isRuntime);
  
    const buttonContainer = document.createElement('div');
    buttonContainer.id = this.buttonContainerId;
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.display = this.value_.editable ? 'flex' : 'none';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '10px';
    buttonContainer.classList.add("button-container");
  
    const addTextButton = createStylishIconButton('Add text', '📝');
    addTextButton.addEventListener('click', () => this.addTextField(form));
    buttonContainer.appendChild(addTextButton);

    const addNumberButton = createStylishIconButton('Add number', '🔢');
    addNumberButton.addEventListener('click', () => this.addNumberField(form));
    buttonContainer.appendChild(addNumberButton);
  
    form.appendChild(buttonContainer);
    container.appendChild(form);
  
    this.isCreated = true;
    this.editorContainer = container;

    this.checkDuplicateNames(form);
  
    return isRuntime ? this.updateEditorForRuntime(this.editorContainer) : this.updateEditorForEditing(this.editorContainer);
  }

  updateEditorForEditing(container: HTMLElement): HTMLElement {
    const toggleContainer = container.querySelector('.toggle-container');
    if (toggleContainer) {
      (toggleContainer as HTMLElement).style.display = 'flex';
    }

    const form = container.querySelector('form') as HTMLFormElement;
    if (form) {
      const titleInput = form.querySelector('input[name="form_title"]') as HTMLInputElement;
      if (titleInput) {
        titleInput.readOnly = false;
        this.applyEditableStyles(titleInput, this.value_.editable);
      }

      const nameInputs = form.querySelectorAll('input[name$="_name"]');
      nameInputs.forEach(input => {
        (input as HTMLInputElement).readOnly = false;
        this.applyEditableStyles(input as HTMLInputElement, this.value_.editable);
      });

      const valueInputs = form.querySelectorAll('input:not([name$="_name"]):not([name="form_title"])');
      valueInputs.forEach(input => {
        (input as HTMLInputElement).readOnly = false;
        this.applyEditableStyles(input as HTMLInputElement, true);
      });

      const deleteButtons = form.querySelectorAll('.delete-button');
      deleteButtons.forEach(button => {
        (button as HTMLElement).style.display = 'inline-block';
      });

      this.recreateButtonContainer(form);
    }

    return container;
  }

  recreateButtonContainer(form: HTMLFormElement) {
    let buttonContainer = form.querySelector('.button-container');
    if (!buttonContainer) {
      buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
      form.appendChild(buttonContainer);
    }
    buttonContainer.innerHTML = '';

    const addTextButton = createStylishIconButton('Add text', '📝');
    addTextButton.addEventListener('click', () => this.addTextField(form));
    buttonContainer.appendChild(addTextButton);

    const addNumberButton = createStylishIconButton('Add number', '🔢');
    addNumberButton.addEventListener('click', () => this.addNumberField(form));
    buttonContainer.appendChild(addNumberButton);
  }

  updateEditorForRuntime(container: HTMLElement): HTMLElement {
    const toggleContainer = container.querySelector('.toggle-container');
    if (toggleContainer) {
      (toggleContainer as HTMLElement).style.display = 'none';
    }

    const form = container.querySelector('form') as HTMLFormElement;
    if (form) {
      const titleInput = form.querySelector('input[name="form_title"]') as HTMLInputElement;
      if (titleInput) {
        titleInput.readOnly = true;
        this.applyEditableStyles(titleInput, false);
      }

      const nameInputs = form.querySelectorAll('input[name$="_name"]');
      nameInputs.forEach(input => {
        (input as HTMLInputElement).readOnly = true;
        this.applyEditableStyles(input as HTMLInputElement, false);
      });

      const valueInputs = form.querySelectorAll('input:not([name$="_name"]):not([name="form_title"])');
      valueInputs.forEach(input => {
        (input as HTMLInputElement).readOnly = false;
        this.applyEditableStyles(input as HTMLInputElement, true);
      });

      const deleteButtons = form.querySelectorAll('.delete-button');
      deleteButtons.forEach(button => {
        (button as HTMLElement).style.display = 'none';
      });

      const buttonContainer = form.querySelector('.button-container');
      if (buttonContainer) {
        buttonContainer.innerHTML = '';
      }
    }

    return container;
  }

  createToggleSwitch(isRuntime: boolean = false) {
    const toggleContainer = document.createElement('div');
    toggleContainer.classList.add('toggle-container');
    toggleContainer.style.display = 'flex';
    toggleContainer.style.alignItems = 'center';

    const label = document.createElement('label');
    label.textContent = 'Allow changes:';
    label.htmlFor = 'checkbox';
    label.classList.add('switch-label');

    const switchLabel = document.createElement('label');
    switchLabel.classList.add('switch');

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = 'checkbox';
    toggleInput.checked = this.value_.editable;
    toggleInput.disabled = isRuntime;
    toggleInput.addEventListener('change', () => {
      if (!isRuntime) {
        this.setEditable(toggleInput.checked);
      }
    });

    const slider = document.createElement('div');
    slider.classList.add('slider', 'round');

    switchLabel.appendChild(toggleInput);
    switchLabel.appendChild(slider);
    toggleContainer.appendChild(label);
    toggleContainer.appendChild(switchLabel);

    const style = document.createElement('style');
    style.textContent = `
      .toggle-container {
        display: flex;
        align-items: center;
      }

      .switch-label {
        position: relative;
        margin-left: auto;
        margin-right: 0px;
        color: #a0a0a0;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 26px;
        margin-left: 10px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 26px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #2196F3;
      }

      input:checked + .slider:before {
        transform: translateX(18px);
      }
    `;
    document.head.appendChild(style);

    return toggleContainer;
  }

  deleteField(form: HTMLFormElement, key: string) {
    const fieldToRemove = form.querySelector(`div:has(input[name="${key}"])`);
    if (fieldToRemove) {
      fieldToRemove.remove();
    }
    delete this.value_.items[key];
    this.updateFormValues(form);
  }

  createFormFields(form: HTMLFormElement, value: IFormValue, isRuntime: boolean = false) {
    const items: { [key: string]: IFormItem } = value.items || {};
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const fieldElement = this.createFormFieldElement(form, key, items[key], isRuntime ? false : value.editable);
        form.appendChild(fieldElement);
      }
    }
  }

  recreateFormFields(form: HTMLFormElement) {
    // Remove all existing fields
    while (form.firstChild) {
      form.removeChild(form.firstChild);
    }
  
    // Recreate the title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'form_title';
    titleInput.value = getLocalizedText(this.value_.title, this.currentLanguage);
    titleInput.readOnly = !this.value_.editable;
    titleInput.style.width = '100%';
    titleInput.style.fontSize = 'large';
    titleInput.style.textAlign = 'center';
    titleInput.style.marginBottom = '20px';
    titleInput.addEventListener('input', () => {
      this.value_.title.default = titleInput.value;
      this.updateFormValues(form);
    });
    form.appendChild(titleInput);
  
    // Recreate all fields
    this.createFormFields(form, this.value_);
  
    // Recreate the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.id = this.buttonContainerId;
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.display = this.value_.editable ? 'flex' : 'none';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '10px';
  
    const addTextButton = createStylishIconButton('Add text', '📝');
    addTextButton.addEventListener('click', () => this.addTextField(form));
    buttonContainer.appendChild(addTextButton);
  
    const addNumberButton = createStylishIconButton('Add number', '🔢');
    addNumberButton.addEventListener('click', () => this.addNumberField(form));
    buttonContainer.appendChild(addNumberButton);
  
    form.appendChild(buttonContainer);
  }

  createFormField(form: HTMLFormElement, key: string, item: IFormItem, editable: boolean) {
    const fieldContainer = document.createElement('div');
    fieldContainer.style.display = 'flex';
    fieldContainer.style.marginBottom = '10px';
    fieldContainer.style.alignItems = 'center';
  
    const labelName = getLocalizedText(item.name, this.currentLanguage);
  
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = `${key}_name`;
    nameInput.value = labelName;
    nameInput.style.width = '36%';
    nameInput.style.marginRight = '10px';
    nameInput.style.padding = '5px';
    nameInput.addEventListener('input', () => {
      item.name.default = nameInput.value;
      this.updateFormValues(form);
    });
    
    const valueInput = this.createValueInput(key, item.value);
    valueInput.style.width = 'calc(64% - 50px)';
    valueInput.style.padding = '5px';
    valueInput.addEventListener('input', () => this.updateFormValues(form));
  
    this.applyEditableStyles(nameInput, editable);
    this.applyEditableStyles(valueInput, true);
  
    const deleteButton = createDeleteButton(() => this.deleteField(form, key));
    deleteButton.style.visibility = editable ? 'visible' : 'hidden';
  
    fieldContainer.appendChild(nameInput);
    fieldContainer.appendChild(valueInput);
    fieldContainer.appendChild(deleteButton);
    form.appendChild(fieldContainer);
  }

  createValueInput(key: string, value: string | number | boolean | object | null): HTMLInputElement {
    const valueInput = document.createElement('input');
    if (typeof value === 'number') {
      valueInput.type = 'number';
      valueInput.value = value.toString();
    } else if (typeof value === 'string') {
      valueInput.type = 'text';
      valueInput.value = value;
    }
    valueInput.name = key;
    return valueInput;
  }

  applyEditableStyles(input: HTMLInputElement, editable: boolean) {
    if (editable) {
      input.style.border = '1px solid #ccc';
      input.style.borderRadius = '4px';
      input.removeAttribute('readonly');
    } else {
      input.style.border = 'none';
      input.style.backgroundColor = 'transparent';
      input.setAttribute('readonly', '');
    }
  }

  generateUniqueKey(prefix: string): string {
    let index = 0;
    let key: string;
    do {
      key = `${prefix}_${index}`;
      index++;
    } while (this.value_.items.hasOwnProperty(key));
    return key;
  }

  generateUniqueName(baseName: string): string {
    let index = 1;
    let name: string;
    do {
      name = `${baseName} ${index}`;
      index++;
    } while (Object.values(this.value_.items as IFormValue).some(item => item.name.default === name));
    return name;
  }
  
  addTextField(form: HTMLFormElement) {
    const key = this.generateUniqueKey('label');
    const name = this.generateUniqueName('Text');
    const newItem: IFormItem = {
      key: key,
      value: "",
      type: "string",
      name: { default: name },
      description: { default: 'New Description' }
    };
    this.value_.items[key] = newItem;
    this.insertFormField(form, key, newItem);
    this.updateFormValues(form);
    this.checkDuplicateNames(form);
  }
  
  addNumberField(form: HTMLFormElement) {
    const key = this.generateUniqueKey('label');
    const name = this.generateUniqueName('Number');
    const newItem: IFormItem = {
      key: key,
      value: 0,
      type: "number",
      name: { default: name },
      description: { default: 'New Description' }
    };
    this.value_.items[key] = newItem;
    this.insertFormField(form, key, newItem);
    this.updateFormValues(form);
    this.checkDuplicateNames(form);
  }

  checkDuplicateNames(form: HTMLFormElement) {
    const nameInputs = form.querySelectorAll('input[name$="_name"]');
    nameInputs.forEach((input: Element) => {
      if (input instanceof HTMLInputElement) {
        const errorMessage = input.parentElement?.nextElementSibling as HTMLElement;
      this.checkDuplicateName(form, input, errorMessage);
      }
    });
  }

  insertFormField(form: HTMLFormElement, key: string, item: IFormItem) {
    const buttonContainer = document.getElementById(this.buttonContainerId);
    const newField = this.createFormFieldElement(form, key, item, this.value_.editable);
    if (buttonContainer) {
      form.insertBefore(newField, buttonContainer);
    } else {
      form.appendChild(newField);
    }
  }

  createFormFieldElement(form: HTMLFormElement, key: string, item: IFormItem, editable: boolean): HTMLElement {
    const fieldContainer = document.createElement('div');
    fieldContainer.style.display = 'flex';
    fieldContainer.style.marginBottom = '10px';
    fieldContainer.style.alignItems = 'center';

    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.alignItems = 'center';
  
    const labelName = getLocalizedText(item.name, this.currentLanguage);
  
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = `${key}_name`;
    nameInput.value = labelName;
    nameInput.readOnly = !editable;
    nameInput.style.width = '36%';
    nameInput.style.marginRight = '10px';
    nameInput.style.padding = '5px';
    nameInput.addEventListener('input', () => {
      if (editable) {
        item.name.default = nameInput.value;
        this.updateFormValues(form);
      }
    });
    
    const valueInput = this.createValueInput(key, item.value);
    valueInput.readOnly = !editable;
    valueInput.style.width = 'calc(64% - 50px)';
    valueInput.style.padding = '5px';
    valueInput.addEventListener('input', () => {
      this.updateFormValues(form);
    });
  
    this.applyEditableStyles(nameInput, editable);
    this.applyEditableStyles(valueInput, true);
  
    const deleteButton = createDeleteButton(() => this.deleteField(form, key));
    deleteButton.style.visibility = editable ? 'visible' : 'hidden';
  
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '12px';
    errorMessage.style.marginTop = '2px';
    errorMessage.style.display = 'none';

    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(valueInput);
    inputContainer.appendChild(deleteButton);

    fieldContainer.appendChild(inputContainer);
    fieldContainer.appendChild(errorMessage);

    this.checkDuplicateName(form, nameInput, errorMessage);
  
    return fieldContainer;
  }

  checkDuplicateName(form: HTMLFormElement, nameInput: HTMLInputElement, errorMessage: HTMLElement) {
    const checkDuplicate = () => {
      const currentName = nameInput.value.trim();
      const isDuplicate = Object.values(this.value_.items as IFormValue).some(
        (item, index) => item.name.default === currentName && nameInput !== form.querySelectorAll('input[name$="_name"]')[index]
      );

      if (isDuplicate) {
        errorMessage.textContent = 'Error: Duplicate variable name';
        errorMessage.style.display = 'block';
        nameInput.style.borderColor = 'red';
      } else {
        errorMessage.style.display = 'none';
        nameInput.style.borderColor = '';
      }
    };

    nameInput.addEventListener('input', checkDuplicate);
    checkDuplicate(); // 初期チェック
  }

  updateFormValues(form: HTMLFormElement) {
    const formData = new FormData(form);
    const items = { ...this.value_.items };

    formData.forEach((value, key) => {
      if (key === 'form_title') {
        this.value_.title.default = value.toString();
      } else if (key.endsWith('_name')) {
        const itemKey = key.replace('_name', '');
        if (items[itemKey]) {
          items[itemKey].name.default = value.toString();
        }
      } else if (items[key]) {
        items[key].value = items[key].type === "number" ? Number(value)
        : items[key].type === "string" ? value
        : null
      }
    });

    const nameInputs = form.querySelectorAll('input[name$="_name"]');
    nameInputs.forEach((input: Element) => {
      if (input instanceof HTMLInputElement) {
        const errorMessage = input.parentElement?.nextElementSibling as HTMLElement;
        this.checkDuplicateName(form, input, errorMessage);
      }
    });

    const formValues = {
      editable: this.value_.editable,
      title: this.value_.title,
      items: items
    };

    this.setValue(formValues);
  }

  closeEditor_() {
    if (this.isClosing) {
      return;
    }
    this.enableBlocklyShortcuts();
    this.isClosing = true;
    this.customModal?.hide();
    this.isClosing = false;
  }

  setValue(value: IFormValue) {
    if (typeof value !== 'object' || !value.items) {
      value = { editable: true, title: { default: 'Form Title' }, items: {} };
    }
    const oldValue = JSON.parse(JSON.stringify(this.oldValue));
    this.value_ = JSON.parse(JSON.stringify(value));
    if (JSON.stringify(oldValue) !== JSON.stringify(this.value_)) {
      this.fireChangeEvent_(oldValue, this.value_);
    }
    super.setValue(this.value_);
    this.updateDisplayText();
  }

  getValue() {
    return this.value_;
  }

  updateDisplayText() {
    const title = this.value_?.title?.default || 'Untitled';
    this.displayText = `${title}`;
    if (this.displayText.length > this.maxTextLength) {
      this.displayText = this.displayText.substring(0, this.maxTextLength) + '...';
    }
    this.updateButtonVisibility();
    this.forceRerender();
  }

  updateButtonVisibility() {
    const buttonContainer = document.getElementById(this.buttonContainerId);
    if (buttonContainer) {
      if (this.value_.editable) {
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';
      } else {
        buttonContainer.style.display = 'none';
      }
    }
  }

  fromXml(fieldElement: Element) {
    const value = JSON.parse(fieldElement.textContent || '{}');
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

  setLanguage(language: string) {
    this.currentLanguage = language;
    this.updateDisplayText();
  }

  setEditable(editable: boolean) {
    this.value_.editable = editable;
    const oldValue = this.getValue();
    this.setValue({ ...this.value_, editable: editable });
    this.fireChangeEvent_(oldValue, this.value_);
    this.updateDisplayText();
  
    this.updateButtonVisibility();
  
    const form = document.getElementById(this.formId) as HTMLFormElement;
    if (form) {
      const titleInput = form.querySelector(`input[name="form_title"]`) as HTMLInputElement;
      if (titleInput) {
        this.applyEditableStyles(titleInput, editable);
      }
  
      Object.keys(this.value_.items).forEach(key => {
        const nameInput = form.querySelector(`input[name="${key}_name"]`) as HTMLInputElement;
        const valueInput = form.querySelector(`input[name="${key}"]`) as HTMLInputElement;
        const deleteButton = valueInput?.nextElementSibling as HTMLButtonElement;
        if (nameInput) {
          this.applyEditableStyles(nameInput, editable);
        }
        if (valueInput) {
          this.applyEditableStyles(valueInput, true);
        }
        if (deleteButton) {
          deleteButton.style.visibility = editable ? 'visible' : 'hidden';
        }
      });
    }
  }

  protected getText_() {
    return this.displayText;
  }

  protected getDisplayText_() {
    return this.getText_();
  }
}

Blockly.fieldRegistry.register('field_form', FieldForm);

export { FieldForm };
