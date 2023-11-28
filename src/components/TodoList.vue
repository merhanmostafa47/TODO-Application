<template>
    <div class="todo_list_wrapper">
        <TodoInput @create="todosStore.addItem($event)" @click="todosStore.allItems(); todosStore.filterBtn === 'all'" />

        <div class="todo_items_wrapper">
            <TodoItem v-for="item in todosStore.todosCopy" :key="item.id" :item="item"
                @delete="todosStore.deleteItem(item.id)" @update="toggleModel(item.id)" :updatedText="item.val"
                @checkItem="todosStore.checkItem($event)" :checked="item.checked" />
            <div class="btns_wrapper" v-if="todosStore.todos.length > 0">
                <span class="list_lendth">
                    {{ todosStore.todosCopy.length }} items left
                </span>
                <div class="actions_btn_wrapper">
                    <button class="action_btn" @click="todosStore.allItems()"
                        :class="{ active: todosStore.filterBtn === 'all' }">
                        All
                    </button>
                    <button class="action_btn" @click="todosStore.completedFun()"
                        :class="{ active: todosStore.filterBtn === 'completed' }">
                        Completed
                    </button>
                    <br>
                    <button class="action_btn" @click="todosStore.activeFun()"
                        :class="{ active: todosStore.filterBtn === 'active' }">
                        Active
                    </button>
                </div>
                <button class="action_btn" @click="todosStore.clearCompletedFun()">
                    Clear Completed
                </button>
            </div>
        </div>

        <EditModal :open="openEditModel" :item="selectedItem" @closeModel="openEditModel = false"
            @editData="todosStore.updateItem($event)" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';
import EditModal from './EditModal.vue'
import type { todoItem } from '@/types/types'

import { useTodosStore } from '@/store/todos';

const todosStore = useTodosStore()

let selectedItem = reactive<todoItem>({} as todoItem)

let openEditModel = ref<boolean>(false)

watchEffect(() => {
    todosStore.todosCopy = todosStore.todos
})

// Open edit Model
function toggleModel(id: todoItem['id']): void {
    let item = todosStore.todosCopy.find(item => item.id == id)
    if (item) {
        openEditModel.value = true
        selectedItem = item
    }
}

</script>

<style lang="scss" scoped>
.todo_list_wrapper {
    margin-block-start: 2rem;
    position: relative;
}

.todo_items_wrapper {
    margin-block-start: 2rem;
    border-radius: 4px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 21rem;

    &::-webkit-scrollbar {
        display: none;
    }
}

.btns_wrapper {
    @include flex(space-between, center);
    background-color: var(--v-input-bg);
    padding: 1rem;
    @include font(400, 14px, var(--placeholder-clr));
    position: sticky;
    bottom: 0;

    .action_btn {
        text-transform: capitalize;
        @include transitioning(.3s);
        cursor: pointer;

        &.active {
            color: var(--bright_blue)
        }

        &:hover {
            color: var(--text-clr);
        }
    }

    .actions_btn_wrapper {
        @include flex(center, center);
        gap: 1rem;
    }
}
</style>