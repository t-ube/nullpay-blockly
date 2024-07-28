import * as Blockly from 'blockly/core';

interface IChatArea {
  toggleChat: () => void;
  position: () => void;
}
  
class ChatArea {
  private workspace_: Blockly.WorkspaceSvg;
  private chatIcon_: SVGElement | null = null;
  private chatWindow_: HTMLElement | null = null;
  private isOpen_: boolean;

  constructor(workspace: Blockly.WorkspaceSvg) {
    this.workspace_ = workspace;
    this.isOpen_ = false;

    this.createChatIcon_();
    this.createChatWindow_();
    this.initializeChatArea_();
  }

  private createChatIcon_() {
    this.chatIcon_ = Blockly.utils.dom.createSvgElement('g', {
      'class': 'blocklyChatIcon',
    }, this.workspace_.getParentSvg());
    
    // SVGの内容を追加
    const chatIconCircle = Blockly.utils.dom.createSvgElement('circle', {
      'cx': 20,
      'cy': 20,
      'r': 20,
      'fill': '#FF5722',
    }, this.chatIcon_);

    const chatIconText = Blockly.utils.dom.createSvgElement('text', {
      'x': 20,
      'y': 25,
      'text-anchor': 'middle',
      'fill': '#FFFFFF',
      'style': 'font-size: 20px; font-family: Arial, sans-serif;',
    }, this.chatIcon_);
    chatIconText.textContent = '💬';
  }

  private createChatWindow_() {
    this.chatWindow_ = document.createElement('div');
    this.chatWindow_.className = 'blocklyChatWindow';
    this.chatWindow_.style.position = 'absolute';
    this.chatWindow_.style.width = '300px';
    this.chatWindow_.style.height = '350px';
    this.chatWindow_.style.border = '1px solid #ccc';
    this.chatWindow_.style.backgroundColor = '#fff';
    this.chatWindow_.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    this.chatWindow_.style.display = 'none';
    document.body.appendChild(this.chatWindow_);
  }

  private initializeChatArea_() {
    if (this.chatIcon_)
      this.chatIcon_.addEventListener('click', () => this.toggleChat());
    this.workspace_.addChangeListener((event) => {
      if (event.type === Blockly.Events.VIEWPORT_CHANGE) {
        this.position();
      }
    });
    this.position();
  }

  toggleChat() {
    this.isOpen_ = !this.isOpen_;
    if (this.chatWindow_)
      this.chatWindow_.style.display = this.isOpen_ ? 'block' : 'none';
    this.position();
  }

  position() {
    const metrics = this.workspace_.getMetrics();
    if (metrics) {
      const iconX = metrics.absoluteLeft + metrics.viewWidth - 40;
      const iconY = metrics.absoluteTop + metrics.viewHeight - 40;
      if (this.chatIcon_)
        this.chatIcon_.setAttribute('transform', `translate(${iconX}, ${iconY})`);

      if (this.isOpen_) {
        const windowX = metrics.absoluteLeft + metrics.viewWidth - 320;
        const windowY = metrics.absoluteTop + metrics.viewHeight - 400;
        if (this.chatWindow_) {
          this.chatWindow_.style.left = `${windowX}px`;
          this.chatWindow_.style.top = `${windowY}px`;
        }
      }
    }
  }
}

Blockly.Extensions.register('chat_area', function(workspace:Blockly.WorkspaceSvg) {
  new ChatArea(workspace);
});
