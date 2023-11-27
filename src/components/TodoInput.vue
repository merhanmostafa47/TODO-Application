<template>
    <div class="input_wrapper">
        <span class="check-label">
        </span>
        <input name="itemInput" v-model="itemInput" type="text" ref="input" placeholder="Create a new todo..."
            class="form-control" @change="addItem" />
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

let itemInput = ref<string>('');

const input = ref<HTMLInputElement>()

const emit = defineEmits(['create']);

// Send the item to the TodoItem component
// Then clear the input
function addItem() {
    emit('create', itemInput.value);
    itemInput.value = '';
}

// focus on input after component is mounted
onMounted((): void => input.value?.focus())
</script>

<style lang="scss" scoped>
.input_wrapper {
    inline-size: 100%;
    background-color: var(--v-input-bg);
    padding: 1rem;
    border-radius: 4px;
    @include flex(row, center, flex-start);
    gap: 1rem;

    .check-label {
        @include size(1.25rem, 1.25rem);
        @include flex(center, center);

        // Make border gradient src: https://codyhouse.co/nuggets/css-gradient-borders
        background: linear-gradient(var(--v-input-bg), var(--v-input-bg)) padding-box,
            linear-gradient(130deg, var(--placeholder-clr), var(--placeholder-clr)) border-box;
        border-radius: 50%;
        border: 1px solid transparent;
    }
}
</style>