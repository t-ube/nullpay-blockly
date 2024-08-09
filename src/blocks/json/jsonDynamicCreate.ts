import * as Blockly from 'blockly/core';
import { BlockColors } from '@/blocks/BlockColors';
import { blockCheckType } from '@/blocks/BlockField';

/** Type of a block that has the DYNAMIC_JSON_CREATE_MIXIN. */
type DynamicJsonCreateBlock = Blockly.Block & DynamicJsonCreateMixin;
/** This interface avoids a "circular reference" compile error. */
interface DynamicJsonCreateMixin extends DynamicJsonCreateMixinType {}
type DynamicJsonCreateMixinType = typeof DYNAMIC_JSON_CREATE_MIXIN;

const DYNAMIC_JSON_CREATE_MIXIN = {
  /** Minimum number of inputs for this block. */
  minInputs: 1,

  /** Count of item inputs. */
  itemCount: 0,

  /** Block for creating a dynamic JSON object. */
  init(this: DynamicJsonCreateBlock): void {
    this.itemCount = this.minInputs;

    this.setHelpUrl('');
    this.setColour(BlockColors.json);
    this.addFirstInput();
    for (let i = 1; i < this.minInputs; i++) {
      this.appendValueInput(`ADD${i}`).setCheck(blockCheckType.jsonKv);
    }
    this.setOutput(true, blockCheckType.jsonKvArray);
    this.setTooltip('Create a dynamic JSON object');
  },

  /**
   * Create XML to represent number of text inputs.
   *
   * @returns XML storage element.
   */
  mutationToDom(this: DynamicJsonCreateBlock): Element {
    if (!this.isDeadOrDying()) {
      Blockly.Events.disable();
      this.finalizeConnections();
      if (this instanceof Blockly.BlockSvg) this.initSvg();
      Blockly.Events.enable();
    }

    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', `${this.itemCount}`);
    return container;
  },

  /**
   * Parse XML to restore the text inputs.
   *
   * @param xmlElement XML storage element.
   */
  domToMutation(this: DynamicJsonCreateBlock, xmlElement: Element): void {
    if (xmlElement.getAttribute('inputs')) {
      this.deserializeInputs(xmlElement);
    } else {
      this.deserializeCounts(xmlElement);
    }
  },

  /**
   * Parses XML based on the 'inputs' attribute (non-standard).
   *
   * @param xmlElement XML storage element.
   */
  deserializeInputs(this: DynamicJsonCreateBlock, xmlElement: Element): void {
    const items = xmlElement.getAttribute('inputs');
    if (items) {
      const inputNames = items.split(',');
      this.inputList = [];
      inputNames.forEach((name) => this.appendValueInput(name).setCheck('String'));
      this.inputList[0].appendField('Key-Value list');
    }
  },

  /**
   * Parses XML based on the 'items' attribute (standard).
   *
   * @param xmlElement XML storage element.
   */
  deserializeCounts(this: DynamicJsonCreateBlock, xmlElement: Element): void {
    this.itemCount = Math.max(
      parseInt(xmlElement.getAttribute('items') ?? '0', 10),
      this.minInputs,
    );
    for (let i = this.minInputs; i < this.itemCount; i++) {
      this.appendValueInput('ADD' + i).setCheck(blockCheckType.jsonKv);
    }
  },

  /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, ie the item count.
   */
  saveExtraState: function (this: DynamicJsonCreateBlock): { itemCount: number } {
    if (!this.isDeadOrDying() && !this.isCorrectlyFormatted()) {
      Blockly.Events.disable();
      this.finalizeConnections();
      if (this instanceof Blockly.BlockSvg) this.initSvg();
      Blockly.Events.enable();
    }

    return {
      itemCount: this.itemCount,
    };
  },

  /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (
    this: DynamicJsonCreateBlock,
    state: { itemCount?: number; [x: string]: unknown } | string,
  ) {
    if (typeof state === 'string') {
      this.domToMutation(Blockly.utils.xml.textToDom(state));
      return;
    }

    this.itemCount = state['itemCount'] ?? 0;
    for (let i = this.minInputs; i < this.itemCount; i++) {
      this.appendValueInput('ADD' + i).setCheck(blockCheckType.jsonKv);
    }
  },

  /**
   * Check whether a new input should be added and determine where it should go.
   *
   * @param connection The connection that has a pending connection.
   * @returns The index before which to insert a new input, or null if no input
   *     should be added.
   */
  findInputIndexForConnection(
    this: DynamicJsonCreateBlock,
    connection: Blockly.Connection,
  ): number | null {
    if (
      !connection.targetConnection ||
      connection.targetBlock()?.isInsertionMarker()
    ) {
      return null;
    }

    let connectionIndex = -1;
    for (let i = 0; i < this.inputList.length; i++) {
      if (this.inputList[i].connection == connection) {
        connectionIndex = i;
      }
    }

    if (connectionIndex == this.inputList.length - 1) {
      return this.inputList.length + 1;
    }

    const nextInput = this.inputList[connectionIndex + 1];
    const nextConnection = nextInput?.connection?.targetConnection;
    if (
      nextConnection &&
      !nextConnection.getSourceBlock().isInsertionMarker()
    ) {
      return connectionIndex + 1;
    }

    return null;
  },

  /**
   * Called by a monkey-patched version of InsertionMarkerManager when
   * a block is dragged over one of the connections on this block.
   *
   * @param connection The connection on this block that has a pending
   *     connection.
   */
  onPendingConnection(
    this: DynamicJsonCreateBlock,
    connection: Blockly.Connection,
  ): void {
    const insertIndex = this.findInputIndexForConnection(connection);
    if (insertIndex == null) {
      return;
    }
    this.appendValueInput(`ADD${Blockly.utils.idGenerator.genUid()}`).setCheck(blockCheckType.jsonKv);
    this.moveNumberedInputBefore(this.inputList.length - 1, insertIndex);
  },

  /**
   * Called by a monkey-patched version of InsertionMarkerManager when a block
   * drag ends if the dragged block had a pending connection with this block.
   */
  finalizeConnections(this: DynamicJsonCreateBlock): void {
    const targetConns = this.removeUnnecessaryEmptyConns(
      this.inputList.map((i) => i.connection?.targetConnection),
    );
    this.tearDownBlock();
    this.addItemInputs(targetConns);
    this.itemCount = targetConns.length;
  },

  /** Deletes all inputs on the block so it can be rebuilt. */
  tearDownBlock(this: DynamicJsonCreateBlock): void {
    for (let i = this.inputList.length - 1; i >= 0; i--) {
      this.removeInput(this.inputList[i].name);
    }
  },

  /**
   * Filters the given target connections so that empty connections are removed,
   * unless we need those to reach the minimum input count. Empty connections
   * are removed starting at the end of the array.
   *
   * @param targetConns The list of connections associated with inputs.
   * @returns A filtered list of connections (or null/undefined) which should
   *     be attached to inputs.
   */
  removeUnnecessaryEmptyConns(
    targetConns: Array<Blockly.Connection | undefined | null>,
  ): Array<Blockly.Connection | undefined | null> {
    const filteredConns = [...targetConns];
    for (let i = filteredConns.length - 1; i >= 0; i--) {
      if (!filteredConns[i] && filteredConns.length > this.minInputs) {
        filteredConns.splice(i, 1);
      }
    }
    return filteredConns;
  },

  /**
   * Adds inputs based on the given array of target cons. An input is added for
   * every entry in the array (if it does not already exist). If the entry is
   * a connection and not null/undefined the connection will be connected to
   * the input.
   *
   * @param targetConns The connections defining the inputs to add.
   */
  addItemInputs(
    this: DynamicJsonCreateBlock,
    targetConns: Array<Blockly.Connection | undefined | null>,
  ): void {
    const input = this.addFirstInput();
    const firstConn = targetConns[0];
    if (firstConn) input.connection?.connect(firstConn);

    for (let i = 1; i < targetConns.length; i++) {
      const input = this.appendValueInput(`ADD${i}`).setCheck(blockCheckType.jsonKv);

      const targetConn = targetConns[i];
      if (targetConn) input.connection?.connect(targetConn);
    }
  },

  /**
   * Adds the top input with the label to this block.
   *
   * @returns The added input.
   */
  addFirstInput(this: DynamicJsonCreateBlock): Blockly.Input {
    return this.appendValueInput('ADD0').appendField('Key-Value list');
  },

  /**
   * Returns true if all of the inputs on this block are in order.
   * False otherwise.
   */
  isCorrectlyFormatted(this: DynamicJsonCreateBlock): boolean {
    for (let i = 0; i < this.inputList.length; i++) {
      if (this.inputList[i].name !== `ADD${i}`) return false;
    }
    return true;
  },
};

Blockly.Blocks['dynamic_json_key_values'] = DYNAMIC_JSON_CREATE_MIXIN;
