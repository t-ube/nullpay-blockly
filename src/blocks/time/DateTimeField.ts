import * as Blockly from 'blockly';
import { FieldTextInput } from 'blockly';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export class FieldTime extends FieldTextInput {
  constructor(value:any, validator = null) {
    super(value, validator);
    this.SERIALIZABLE = true;
    this.CURSOR = 'text';
  }

  static fromJson(options:any) {
    return new this(options['time']);
  }

  widgetCreate_() {
    const htmlInput = super.widgetCreate_() as HTMLInputElement;
    htmlInput.type = 'time';
    return htmlInput;
  }

  showEditor_(e:any) {
    super.showEditor_(e, true);
    if (this.htmlInput_) {
      this.htmlInput_.focus({ preventScroll: true });
      this.htmlInput_.select();
      this.showDropdown();
    }
  }

  showDropdown() {
    if (this.htmlInput_) {
      Blockly.utils.dom.addClass(this.htmlInput_, 'blocklyTimeInput');
      (this.htmlInput_).showPicker();
    }
  }
}

Blockly.fieldRegistry.register('field_time', FieldTime);

export class FieldTimeWithSeconds extends FieldTextInput {
  constructor(value:any, validator = null) {
    super(value, validator);
    this.SERIALIZABLE = true;
    this.CURSOR = 'text';
  }

  static fromJson(options:any) {
    return new this(options['time']);
  }

  widgetCreate_() {
    const htmlInput = super.widgetCreate_() as HTMLInputElement;
    htmlInput.type = 'time';
    htmlInput.step = '1';
    return htmlInput;
  }

  showEditor_(e:any) {
    super.showEditor_(e, true);
    if (this.htmlInput_) {
      this.htmlInput_.focus({ preventScroll: true });
      this.htmlInput_.select();
      this.showDropdown();
    }
  }

  showDropdown() {
    if (this.htmlInput_) {
      Blockly.utils.dom.addClass(this.htmlInput_, 'blocklyTimeInput');
      (this.htmlInput_ as any).showPicker();
    }
  }
}

Blockly.fieldRegistry.register('field_time_with_seconds', FieldTimeWithSeconds);

export const timezoneMenu:Blockly.MenuGenerator = [
  ["UTC", "UTC"],
  ["Africa/Johannesburg", "Africa/Johannesburg"],
  ["Africa/Lagos", "Africa/Lagos"],
  ["Africa/Windhoek", "Africa/Windhoek"],
  ["America/Adak", "America/Adak"],
  ["America/Anchorage", "America/Anchorage"],
  ["America/Argentina/Buenos_Aires", "America/Argentina/Buenos_Aires"],
  ["America/Bogota", "America/Bogota"],
  ["America/Caracas", "America/Caracas"],
  ["America/Chicago", "America/Chicago"],
  ["America/Denver", "America/Denver"],
  ["America/Godthab", "America/Godthab"],
  ["America/Guatemala", "America/Guatemala"],
  ["America/Halifax", "America/Halifax"],
  ["America/Los_Angeles", "America/Los_Angeles"],
  ["America/Montevideo", "America/Montevideo"],
  ["America/New_York", "America/New_York"],
  ["America/Noronha", "America/Noronha"],
  ["America/Phoenix", "America/Phoenix"],
  ["America/Santiago", "America/Santiago"],
  ["America/Santo_Domingo", "America/Santo_Domingo"],
  ["America/St_Johns", "America/St_Johns"],
  ["Asia/Baghdad", "Asia/Baghdad"],
  ["Asia/Baku", "Asia/Baku"],
  ["Asia/Beirut", "Asia/Beirut"],
  ["Asia/Dhaka", "Asia/Dhaka"],
  ["Asia/Dubai", "Asia/Dubai"],
  ["Asia/Irkutsk", "Asia/Irkutsk"],
  ["Asia/Jakarta", "Asia/Jakarta"],
  ["Asia/Kabul", "Asia/Kabul"],
  ["Asia/Kamchatka", "Asia/Kamchatka"],
  ["Asia/Karachi", "Asia/Karachi"],
  ["Asia/Kathmandu", "Asia/Kathmandu"],
  ["Asia/Kolkata", "Asia/Kolkata"],
  ["Asia/Krasnoyarsk", "Asia/Krasnoyarsk"],
  ["Asia/Omsk", "Asia/Omsk"],
  ["Asia/Rangoon", "Asia/Rangoon"],
  ["Asia/Shanghai", "Asia/Shanghai"],
  ["Asia/Tehran", "Asia/Tehran"],
  ["Asia/Tokyo", "Asia/Tokyo"],
  ["Asia/Vladivostok", "Asia/Vladivostok"],
  ["Asia/Yakutsk", "Asia/Yakutsk"],
  ["Asia/Yekaterinburg", "Asia/Yekaterinburg"],
  ["Atlantic/Azores", "Atlantic/Azores"],
  ["Atlantic/Cape_Verde", "Atlantic/Cape_Verde"],
  ["Australia/Adelaide", "Australia/Adelaide"],
  ["Australia/Brisbane", "Australia/Brisbane"],
  ["Australia/Darwin", "Australia/Darwin"],
  ["Australia/Eucla", "Australia/Eucla"],
  ["Australia/Lord_Howe", "Australia/Lord_Howe"],
  ["Australia/Sydney", "Australia/Sydney"],
  ["Etc/GMT+12", "Etc/GMT+12"],
  ["Europe/Berlin", "Europe/Berlin"],
  ["Europe/London", "Europe/London"],
  ["Europe/Moscow", "Europe/Moscow"],
  ["Pacific/Apia", "Pacific/Apia"],
  ["Pacific/Auckland", "Pacific/Auckland"],
  ["Pacific/Chatham", "Pacific/Chatham"],
  ["Pacific/Easter", "Pacific/Easter"],
  ["Pacific/Gambier", "Pacific/Gambier"],
  ["Pacific/Honolulu", "Pacific/Honolulu"],
  ["Pacific/Kiritimati", "Pacific/Kiritimati"],
  ["Pacific/Majuro", "Pacific/Majuro"],
  ["Pacific/Marquesas", "Pacific/Marquesas"],
  ["Pacific/Norfolk", "Pacific/Norfolk"],
  ["Pacific/Noumea", "Pacific/Noumea"],
  ["Pacific/Pago_Pago", "Pacific/Pago_Pago"],
  ["Pacific/Pitcairn", "Pacific/Pitcairn"],
  ["Pacific/Tongatapu", "Pacific/Tongatapu"]
];

export { dayjs };