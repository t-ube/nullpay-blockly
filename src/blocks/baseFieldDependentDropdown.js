import * as Blockly from 'blockly';

export class FieldDependentDropdown extends Blockly.FieldDropdown {
  constructor(parentName, optionMapping) {
    const options = optionMapping[Blockly.Blocks[parentName]] || [['', '']];
    super(options);
    this.parentName_ = parentName;
    this.optionMapping_ = optionMapping;
  }

  setSourceBlock(block) {
    super.setSourceBlock(block);
    const parentField = block.getField(this.parentName_);
    if (parentField) {
      parentField.setValidator(this.updateOptions.bind(this));
    }
  }

  updateOptions(newValue) {
    const options = this.optionMapping_[newValue] || [['', '']];
    this.menuGenerator_ = options;
    if (this.sourceBlock_) {
      this.setValue(options[0][1]);
    }
    return newValue;
  }
}
