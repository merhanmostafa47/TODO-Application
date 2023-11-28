import { defineStore } from "pinia";
import type { todoItem, filterBtn } from "@/types/types";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos") as string)
      : ([] as todoItem[]),

    filterBtn: "all" as filterBtn,

    todosCopy: [] as todoItem[],
  }),

  actions: {
    // Set todos in localStorage
    updateTodos(): void {
      localStorage.setItem("todos", JSON.stringify(this.todos) as string);
    },

    // Add item to todos
    addItem(el: string): void {
      this.todos.push({
        id: Math.random(),
        val: el,
        checked: false,
      });
      this.updateTodos();
    },

    // Delete item from todos
    deleteItem(id: todoItem["id"]): void {
      this.todos = this.todos.filter((item: { id: number }) => item.id != id);
      this.updateTodos();
    },

    // Update item text
    updateItem(el: todoItem): void {
      const editedItem = this.todos.find(
        (item: { id: number }) => item.id == el.id
      );

      if (editedItem) {
        editedItem.val = el.val;
      }
      this.updateTodos();
    },

    // Update item checked value
    checkItem(id: todoItem["id"]): void {
      const item = this.todos.find((item: { id: number }) => item.id == id);
      if (item) {
        item.checked = !item.checked;
      }
      this.updateTodos();
    },

    // Filter Buttons
    allItems(): void {
      this.filterBtn = "all";
      this.todosCopy = this.todos;
    },

    completedFun(): void {
      this.filterBtn = "completed";
      this.todosCopy = this.todos.filter(
        (item: { checked: boolean }) => item.checked == true
      );
    },

    activeFun(): void {
      this.filterBtn = "active";
      this.todosCopy = this.todos.filter(
        (item: { checked: boolean }) => item.checked == false
      );
    },

    clearCompletedFun(): void {
      this.todos = this.todos.filter(
        (item: { checked: boolean }) => item.checked == false
      );
      this.allItems();
      this.updateTodos();
    },
  },
});
