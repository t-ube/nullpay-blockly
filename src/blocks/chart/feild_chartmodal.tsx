// @/blocks/form/FieldChartModal.ts
import * as Blockly from 'blockly';
import { Field } from 'blockly';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDragPanes from 'highcharts/modules/drag-panes';
import { IOrderBookData } from '@/interfaces/IOrderBook';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsDragPanes(Highcharts);
}

class CustomModal {
  contentDiv: HTMLDivElement;
  modal: HTMLDivElement;
  backdrop: HTMLDivElement;
  private closeOnOutsideClick: boolean;
  onShow?: () => void;
  onHide?: () => void;

  constructor(closeOnOutsideClick: boolean = true, onShow?: () => void, onHide?: () => void) {
    this.onShow = onShow;
    this.onHide = onHide;
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
    modal.style.minHeight = '40px';
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
    contentDiv.style.backgroundColor = '#23232F';
    contentDiv.style.border = '1px solid #ccc';
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
    this.onShow?.();
  }

  hide() {
    this.modal.style.display = 'none';
    this.backdrop.style.display = 'none';
    this.onHide?.();
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

class FieldChartModal extends Blockly.Field {
  private chartElement: HTMLDivElement | null = null;
  private chart: Highcharts.Chart | null = null;
  isClosing: boolean = false;
  displayText: string = '';
  isCreated: boolean = false;
  oldValue: any;
  originalKeyMap: any = null;
  customModal: CustomModal | null;
  maxTextLength: number = 14;
  chartData: any | null = null;
  chartTitle: string = '';
  currencyPair: string = '';

  constructor(value: string) {
    super(Field.SKIP_SETUP);
    this.SERIALIZABLE = true;
    this.oldValue = value;
    this.setValue(value);
    this.updateDisplayText();
    this.customModal = null;
  }

  async showModalAtRuntime(data:string, title:string, currencyPair:string): Promise<void> {
    this.chartData = JSON.parse(data) as IOrderBookData;
    this.chartTitle = title.length > 0 ? title : 'Chart Title';
    this.currencyPair = currencyPair.length > 0 ? currencyPair : '?/?';
    this.updateTradingBoard();
    return new Promise((resolve) => {
      resolve();
    });
  }

  showEditor_() {
    if (this.isClosing) {
      return;
    }
    if (!this.customModal) {
      this.customModal = new CustomModal(
        true,
        this.disableBlocklyShortcuts.bind(this),
        this.enableBlocklyShortcuts.bind(this)
      );
    }
    const editor = this.createEditor_();
    if (editor) {
      this.customModal.getContentDiv().innerHTML = '';
      this.customModal.getContentDiv().appendChild(editor);
      this.customModal.showByField(this);
    }
  }

  createEditor_(isRuntime: boolean = false) {
    if (this.isCreated && this.chartElement) {
      this.updateTradingBoard();
      return this.chartElement;
    }
  
    const container = document.createElement('div');
    container.style.width = '400px';
    container.style.height = 'auto';
    container.style.overflow = 'auto';
    container.style.position = 'relative';
    this.chartElement = container;

    this.updateTradingBoard();
    this.isCreated = true;
  
    return container;
  }

  calculateMaxValue(data: IOrderBookData): number {
    const maxBid = Math.max(...data.bids.map(point => point.y));
    const maxAsk = Math.max(...data.asks.map(point => point.y));
    return Math.max(maxBid, maxAsk);
  }

  calculateYAxisMax(maxValue: number): number {
    return Math.ceil(maxValue * 1.1);
  }

  updateTradingBoard() {
    if (this.chartData) {

      const updateData = () => {
        const data = this.chartData as IOrderBookData;
        const currencyPair = this.currencyPair;
        const newMax = this.calculateYAxisMax(this.calculateMaxValue(data));

        if (this.chart) {
          this.chart.series.forEach((s, i) => {
            if (i == 0)
              s.setData(data.asks, false);
            else
              s.setData(data.bids, false);
          });
          this.chart.setTitle({ text: this.chartTitle });

          this.chart.yAxis[1].update({
            labels: {
              formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string {
                if (this.isFirst) {
                  return `Price (${currencyPair})`;
                }
                if (this.isLast) {
                  return 'Bids';
                }
                return this.value as string;
              }
            }
          }, false);

          this.chart.yAxis.forEach(axis => {
            axis.update({
              max: newMax
            }, false);
          });

          this.chart.redraw();
        }
      };
      
      const data = this.chartData as IOrderBookData;
      const options: Highcharts.Options = {
          chart: {
            animation: {
              duration: 200
            },
            type: 'bar',
            backgroundColor: '#23232f',
            marginTop: 70,
            events: {
              load() {
                setInterval(() => {
                  if (this.series) {
                    updateData();
                  }
                }, 200);
              }
            }
          },
          title: {
            text: 'Order book live chart',
            style: {
              color: '#ffffff'
            }
          },
          tooltip: {
            headerFormat: 'Price: <b>${point.point.price:,.1f}</b></br>',
            pointFormat: '{series.name}: <b>{point.y:,.0f}</b>',
            shape: 'rect',
            positioner: function(
              labelWidth: number, 
              labelHeight: number, 
              point: Highcharts.Point
            ): Highcharts.PositionObject {
              const plotX = point.plotX as number;
              const plotY = point.plotY as number;
              const chart = this.chart;
              const barHeight = 20;
              const negative = plotX < 0;
              return {
                x: negative ? plotX + barHeight - labelWidth + 10 : plotX - barHeight + 10,
                y: plotY
              };
            }
          },
      
          xAxis: [{
            reversed: true,
            visible: false,
            title: {
              text: 'Market depth / price'
            }
          }, {
            opposite: true,
            visible: false,
            title: {
              text: 'Market depth / price'
            }
          }],
      
          yAxis: [{
            offset: 0,
            visible: true,
            opposite: true,
            gridLineWidth: 0,
            tickAmount: 1,
            left: '50%',
            width: '50%',
            title: {
              text: 'Amount of ask orders',
              style: {
                visibility: 'hidden'
              }
            },
            min: 0,
            max: this.calculateYAxisMax(this.calculateMaxValue(this.chartData)),
            labels: {
              enabled: true,
              format: '{#if isLast}Asks{/if}',
              style: {
                color: '#ffffff',
                fontSize: "16",
                fontWeight: "700"
              },
              y: 10
            }
          }, {
            offset: 0,
            visible: true,
            opposite: true,
            gridLineWidth: 0,
            tickAmount: 2,
            left: '0%',
            width: '50%',
            reversed: true,
            title: {
              text: 'Amount of bid orders',
              style: {
                visibility: 'hidden'
              }
            },
            min: 0,
            max: this.calculateYAxisMax(this.calculateMaxValue(this.chartData)),
            labels: {
              enabled: true,
              format: `
                {#if (eq pos 0)}Price ($){/if}
                {#if isLast}Bids{/if}
              `,
              style: {
                color: '#ffffff',
                fontSize: "16",
                fontWeight: "700"
              },
              y: 10
            }
          }],
          legend: {
            enabled: false
          },
          navigation: {
            buttonOptions: {
              theme: {
                fill: 'none'
              }
            }
          },
          plotOptions: {
            series: {
              animation: false,
              dataLabels: {
                enabled: true,
                color: '#ffffff'
              },
              borderWidth: 0,
              crisp: false
            }
          },
          series: [{
            type: 'bar',
            dataLabels: [{
              align: 'right',
              alignTo: 'plotEdges',
              style: {
                fontSize: '14px',
                textOutline: 'none'
              },
              format: '{point.y:,.2f}'
            }, {
              align: 'left',
              inside: true,
              style: {
                fontSize: '13px',
                textOutline: 'none'
              },
              format: '{point.price:,.3f}'
            }],
            name: 'Asks',
            color: '#d76769',
            data: data.asks
          }, {
            type: 'bar',
            dataLabels: [{
              align: 'left',
              alignTo: 'plotEdges',
              style: {
                fontSize: '14px',
                textOutline: 'none'
              },
              format: '{point.y:,.2f}'
            }, {
              align: 'right',
              inside: true,
              style: {
                fontSize: '13px',
                textOutline: 'none'
              },
              format: '{point.price:,.3f}'
            }],
            name: 'Bids',
            color: '#42b3f0',
            data: data.bids,
            yAxis: 1
          }]
      };
    
      if (this.chartElement) {
        if (this.chart) {
          //this.chart.update(options, true, true, false);
        } else {
          this.chart = Highcharts.chart(this.chartElement, options);
        }
      }
    } else {
      const noDataMessage = document.createElement('div');
      noDataMessage.textContent = 'No data available';
      noDataMessage.style.padding = '20px';
      noDataMessage.style.color = '#FFF';
      noDataMessage.style.textAlign = 'center';
      if (this.chartElement) {
        this.chartElement.innerHTML = '';
        this.chartElement.appendChild(noDataMessage);
      }
    }
  }

  closeEditor_() {
    if (this.isClosing) {
      return;
    }
    this.isClosing = true;
    this.customModal?.hide();
    this.isClosing = false;
  }

  setValue(value: string) {
    const oldValue = this.oldValue;
    this.value_ = value;
    if (oldValue !== this.value_) {
      this.fireChangeEvent_(oldValue, this.value_);
    }
    this.updateDisplayText();
  }

  getValue() {
    return this.value_;
  }

  updateDisplayText() {
    this.displayText = `Show`;
    if (this.displayText.length > this.maxTextLength) {
      this.displayText = this.displayText.substring(0, this.maxTextLength) + '...';
    }
    this.forceRerender();
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

  protected getText_() {
    return this.displayText;
  }

  protected getDisplayText_() {
    return this.getText_();
  }

  static fromJson(_options: any): Blockly.Field<any> {
    return new FieldChartModal( _options['value']);
  }
}

export { FieldChartModal };
