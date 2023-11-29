<template>
    <div class="todo_item_wrapper">
        <div class="checkbox_wrapper">
            <input type="checkbox" :id="String(item.id)" class="form-check-input" v-model="itemChecked"
                @change="$emit('checkItem', item.id)">
            <label class="check-label" :for="String(item.id)" :class="{ checked: itemChecked }">
                <CheckIcon class="check-icon" :class="{ show: checked }" />
            </label>
            <label class="todo_item" :for="String(item.id)" :class="{ completed: itemChecked }">{{ updatedText }}</label>
        </div>
        <div class="actions_btn_wrapper">
            <button class="action_btn" @click="$emit('update', item.id)" aria-labelledby="Edit item">
                <IconEdit />
            </button>
            <button class="action_btn" @click="$emit('delete')" aria-labelledby="Delete item">
                <IconCross />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/components/icons/IconCheck.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconCross from '@/components/icons/IconCross.vue';

import { ref, watchEffect } from 'vue';
import type { TodoItemProps, TodoItemEmits } from '@/types/types'

let itemChecked = ref<boolean>(false);

let props = defineProps<TodoItemProps>();


defineEmits<TodoItemEmits>();

watchEffect(() => {
    itemChecked.value = props.checked
})

</script>

<style lang="scss" scoped>
.todo_item_wrapper {
    inline-size: 100%;
    background-color: var(--v-input-bg);
    padding: 1rem;
    @include flex(space-between, center);
    gap: 1rem;

    .todo_item {
        inline-size: fit-content;
        outline: none;
        @include font(500, 16px, var(--text-clr));

        &.completed {
            text-decoration: line-through;
            color: var(--placeholder-clr);
        }
    }

    .checkbox_wrapper {
        @include flex(flex-start, center);
        gap: 1rem;

        .form-check-input {
            display: none;
        }

        .check-label {
            @include size(1.25rem, 1.25rem);
            @include flex(center, center);
            transition: all 0.3s ease-in-out;
            cursor: pointer;

            // Make border gradient src: https://codyhouse.co/nuggets/css-gradient-borders
            background: linear-gradient(var(--v-input-bg), var(--v-input-bg)) padding-box,
                linear-gradient(130deg, var(--placeholder-clr), var(--placeholder-clr)) border-box;
            border-radius: 50%;
            border: 1px solid transparent;

            &:hover {
                background: linear-gradient(var(--v-input-bg), var(--v-input-bg)) padding-box,
                    linear-gradient(130deg, var(--light-cyan), var(--soft-violet)) border-box;
            }

            &.checked {
                background: linear-gradient(130deg, var(--light-cyan), var(--soft-violet)) padding-box,
                    linear-gradient(130deg, var(--light-cyan), var(--soft-violet)) border-box;
            }

            .check-icon {
                display: none;

                &.show {
                    display: block;
                }
            }
        }
    }

    .actions_btn_wrapper {
        @include flex(center, center);
        gap: 20px;
        display: none;

        .action_btn {
            @include size(18px, 18px);
            @include transitioning(.3s);
        }
    }

    &:hover {
        .actions_btn_wrapper {
            display: flex;
        }
    }
}
</style>