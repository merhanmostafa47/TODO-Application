export type themeState = "light" | "dark";

export type localeState = "ar" | "en";

export interface todoItem {
  id: number;
  val: string;
  checked: boolean;
}

export type filterBtn = "all" | "completed" | "active";

export type EditModalProps = {
  open: boolean;
  item: todoItem;
};

export type EditModalEmits = {
  (e: "closeModel"): void;
  (e: "editData", item: todoItem): void;
};

export type TodoItemProps = {
  item: todoItem;
  updatedText: string;
  checked: boolean;
};

export type TodoItemEmits = {
  (e: "update", itemId: number): void;
  (e: "delete"): void;
  (e: "checkItem", itemId: number): void;
};
