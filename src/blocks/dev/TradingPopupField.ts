import * as Blockly from 'blockly';
import { BasePopupField, CustomDropDown } from './BasePopupField';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDragPanes from 'highcharts/modules/drag-panes';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsDragPanes(Highcharts);
}

export interface TradingData {
  asks: [string, string][];
  bids: [string, string][];
  asks_over: string;
  bids_under: string;
  asks_under: string;
  bids_over: string;
  timestamp: number;
  sequenceId: string;
}

export class TradingPopupField extends BasePopupField {
  private chartElement: HTMLDivElement | null = null;
  private chart: Highcharts.Chart | null = null;

  constructor(value: TradingData) {
    super(value);
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

  createEditor_() {
    this.disableBlocklyShortcuts();
    if (this.isCreated && this.editorContainer) {
      return this.editorContainer;
    }

    const editorContainer = document.createElement('div');
    //editorContainer.style.width = '100%';
    editorContainer.style.width = '400px';
    editorContainer.style.height = '400px';
    this.chartElement = editorContainer;
    this.renderTradingBoard(this.value_);

    this.isCreated = true;
    this.editorContainer = editorContainer;

    return editorContainer;
  }

  renderTradingBoard(data: TradingData) {
    const options: Highcharts.Options = {
      chart: {
        type: 'scatter',
      },
      title: {
        text: 'Trading Board'
      },
      xAxis: {
        title: {
          text: 'Price'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity'
        }
      },
      series: [
        {
          name: 'Bids',
          type: 'scatter',
          data: data.bids.map(([price, quantity]) => [parseFloat(price), parseFloat(quantity)])
        },
        {
          name: 'Asks',
          type: 'scatter',
          data: data.asks.map(([price, quantity]) => [parseFloat(price), parseFloat(quantity)])
        }
      ]
    };

    if (this.chartElement) {
      this.chart = Highcharts.chart(this.chartElement, options);
    }
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
    if (this.chart) {
      this.chart.destroy();
    }
  }

  forceRerender() {
    super.forceRerender();
    this.renderTradingBoard(this.value_ as TradingData);
  }
}

Blockly.fieldRegistry.register('trading_popup_field', TradingPopupField);