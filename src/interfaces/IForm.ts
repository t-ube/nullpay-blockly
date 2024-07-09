// @/interfaces/IForm.ts
export interface IFormItem {
  key: string,
  value: string | number | null | boolean | object,
  type: "string" | "number" | "boolean"
  name: {
    default: string,
    "en-US"?: string,
    "ja-JP"?: string,
  },
  description: {
    default: string,
    "en-US"?: string,
    "ja-JP"?: string,
  }
}

export interface IFormValue {
  editable: boolean,
  title: {
    default: string,
    "en-US"?: string,
    "ja-JP"?: string,
  },
  items: { [key: string]: IFormItem }
}

export interface IFormResult {
  editable: boolean,
  title: {
    default: string,
    "en-US"?: string,
    "ja-JP"?: string,
  },
  items: { [key: string]: IFormItem },
  return: { submit: boolean }
}
