export type FieldType =
  | "text"
  | "select"
  | "multi-select"
  | "number"
  | "textarea"
  | "brand-model"
  | "chips";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
};
