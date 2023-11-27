<template>
    <div class="todo_list_wrapper">
        <TodoInput @create="addItem($event)" @click="allItems(); activeBtn = 'all'" />

        <div class="todo_items_wrapper">
            <TodoItem v-for="item in itemsCopy" :key="item.id" :item="item" @delete="deleteItem(item.id)"
                @update="toggleModel(item.id)" :updatedText="item.val" @checkItem="checkItem($event)"
                :checked="item.checked" />
            <div class="btns_wrapper" v-if="items.length > 0">
                <span class="list_lendth">
                    {{ itemsCopy.length }} items left
                </span>
                <div class="actions_btn_wrapper">
                    <button class="action_btn" @click="allItems" :class="{ active: activeBtn === 'all' }">
                        All
                    </button>
                    <button class="action_btn" @click="completedFun" :class="{ active: activeBtn === 'completed' }">
                        Completed
                    </button>
                    <br>
                    <button class="action_btn" @click="activeFun" :class="{ active: activeBtn === 'active' }">
                        Active
                    </button>
                </div>
                <button class="action_btn" @click="clearCompletedFun">
                    Clear Completed
                </button>
            </div>
        </div>

        <EditModal :open="openEditModel" :item="selectedItem" @closeModel="openEditModel = false"
            @editData="updateItem($event)" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';
import EditModal from './EditModal.vue'


import type { todoItem, filterBtn } from '@/types/types'

let items = ref<todoItem[]>([])

let itemsCopy = ref<todoItem[]>([])

let selectedItem = reactive<todoItem>({} as todoItem)

let openEditModel = ref<boolean>(false)

let activeBtn = ref<filterBtn>('all')

watchEffect(() => {
    itemsCopy.value = items.value
})

function addItem(el: string): void {
    items.value.push({
        id: Math.random(),
        val: el,
        checked: false
    })
}

// Delete selected item
function deleteItem(id: todoItem['id']): void {
    items.value = items.value.filter(item => item.id != id);

    // items.value.forEach(item => {
    //     if (item.id == id) {
    //         items.value.splice(items.value.indexOf(item), 1);
    //     }
    // });
}

// Open edit Model
function toggleModel(id: todoItem['id']): void {
    let item = itemsCopy.value.find(item => item.id == id)
    if (item) {
        openEditModel.value = true
        selectedItem = item
    }
}

function updateItem(el: todoItem): void {
    let editedItem = items.value.find(item => item.id == el.id)
    if (editedItem) {
        editedItem.val = el.val
    }
}

function checkItem(id: todoItem['id']): void {
    let item = items.value.find(item => item.id == id)
    if (item) {
        item.checked = !item.checked
    }
}

// Filter Buttons
function allItems(): void {
    activeBtn.value = 'all'
    itemsCopy.value = items.value
}

function completedFun(): void {
    activeBtn.value = 'completed'
    itemsCopy.value = items.value.filter(item => item.checked == true)
}

function activeFun(): void {
    activeBtn.value = 'active'
    itemsCopy.value = items.value.filter(item => item.checked == false)
}

function clearCompletedFun(): void {
    items.value = items.value.filter(item => item.checked == false)
    allItems()
}
</script>

<style lang="scss" scoped>
.todo_list_wrapper {
    margin-block-start: 2rem;
    z-index: 2;
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