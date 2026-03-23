export type FieldType =
  | "text"
  | "select"
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
