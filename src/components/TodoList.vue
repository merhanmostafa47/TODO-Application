<template>
    <div class="todo_list_wrapper">
        <TodoInput @create="todosStore.addItem($event)" @click="todosStore.allItems(); todosStore.filterBtn === 'all'" />

        <div class="todo_items_wrapper">
            <draggable tag="ul" :list="todosStore.todosCopy" :animation="300" :itemKey="(Math.random()).toString()">
                <template #item="{ element: item }">
                    <li :key="item.id">
                        <TodoItem :item="item" @delete="todosStore.deleteItem(item.id)" @update="toggleModel(item.id)"
                            :updatedText="item.val" @checkItem="todosStore.checkItem($event)" :checked="item.checked" />
                    </li>
                </template>
            </draggable>

            <div class="btns_wrapper" v-if="todosStore.todos.length > 0">
                <span class="list_lendth">
                    {{ todosStore.todosCopy.length }} {{ $t("itemsLeft") }}
                </span>
                <div class="actions_btn_wrapper">
                    <button class="action_btn" @click="todosStore.allItems()"
                        :class="{ active: todosStore.filterBtn === 'all' }">
                        {{ $t("all") }}
                    </button>
                    <button class="action_btn" @click="todosStore.activeFun()"
                        :class="{ active: todosStore.filterBtn === 'active' }">
                        {{ $t("active") }}
                    </button>
                    <button class="action_btn" @click="todosStore.completedFun()"
                        :class="{ active: todosStore.filterBtn === 'completed' }">
                        {{ $t("completed") }}
                    </button>
                </div>
                <button class="action_btn" @click="todosStore.clearCompletedFun()">
                    {{ $t("deleteCompleted") }}
                </button>
            </div>
        </div>

        <div class="actions_btn_wrapper responsive_action_btns" v-if="todosStore.todos.length > 0">
            <button class="action_btn" @click="todosStore.allItems()" :class="{ active: todosStore.filterBtn === 'all' }">
                {{ $t("all") }}
            </button>
            <button class="action_btn" @click="todosStore.activeFun()"
                :class="{ active: todosStore.filterBtn === 'active' }">
                {{ $t("active") }}
            </button>
            <button class="action_btn" @click="todosStore.completedFun()"
                :class="{ active: todosStore.filterBtn === 'completed' }">
                {{ $t("completed") }}
            </button>

        </div>

        <p class="drag_statement" v-if="todosStore.todos.length >= 2">{{ $t("dragStatement") }}</p>

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

import draggable from 'vuedraggable';

import { useTodosStore } from '@/store/todos';

const todosStore = useTodosStore()

let selectedItem = reactive<todoItem>({} as todoItem)

let openEditModel = ref<boolean>(false)

watchEffect(() => {
    todosStore.todosCopy = todosStore.todos
    todosStore.updateTodos()
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
    margin-block-start: 2.5rem;
    position: relative;
}

.todo_items_wrapper {
    margin-block-start: 2rem;
    border-radius: 4px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 21.5rem;

    @include media(md) {
        max-height: 18rem;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    li {
        border-bottom: .5px solid var(--border-clr);
    }
}

.btns_wrapper {
    @include flex(space-between, center);
    flex-wrap: wrap;
    background-color: var(--v-input-bg);
    padding: 1rem;
    @include font(400, 14px, var(--placeholder-clr));
    position: sticky;
    bottom: 0;
}

.actions_btn_wrapper {
    @include flex(center, center);
    gap: 1rem;

    @include media(md) {
        display: none
    }

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

    &.responsive_action_btns {
        display: none;

        @include media(md) {
            inline-size: 100%;
            @include flex(center, center);
            background-color: var(--v-input-bg);
            padding: 1rem;
            margin-block-start: 1rem;
            @include font(400, 14px, var(--placeholder-clr));
        }

    }
}

.drag_statement {
    @include font(600, 14px, var(--placeholder-clr));
    color: var(--placeholder-clr) !important;
    text-align: center;
    margin-block-start: 2rem !important;
}
</style>