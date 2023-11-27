<template>
    <Transition>
        <div class="edit_modal_wrapper" v-if="open">
            <v-container class="px-12" align="center">
                <div class="model_wrapper">
                    <button class="action_btn" @click="$emit('closeModel')">
                        <IconCross :color="'var(--text-clr)'" />
                    </button>
                    <div class="edit_modal_input">
                        <input name="item" v-model="dataToEdit" ref="editInput" type="text" class="form-control"
                            @change="updateData(item)" />
                        <button class="done_btn" @click="$emit('closeModel')">
                            <IconCheck />
                        </button>
                    </div>

                </div>
            </v-container>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import { ref, watchEffect } from 'vue';
import type { todoItem, EditModalProps, EditModalEmits } from '@/types/types'

let dataToEdit = ref<string>('')

const editInput = ref<HTMLInputElement>()

const props = defineProps<EditModalProps>();

const emits = defineEmits<EditModalEmits>()

watchEffect(() => {
    if (props.open) {
        dataToEdit.value = props.item.val
        editInput.value?.focus()
    }
})

function updateData(item: todoItem) {
    console.log(item);
    item.val = dataToEdit.value
    emits('editData', item)
    emits('closeModel')
}
</script>

<style lang="scss" scoped>
.edit_modal_wrapper {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    bottom: 0;
    min-height: 100vh;
    width: 100vw;
    @include flex(center, center);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    @include transitioning(.3s);
    transform: translate(-50%, -50%);

    .edit_modal_input {
        border-bottom: 1px solid var(--text-clr);
        padding: 1rem 0;
        inline-size: 100%;
        @include flex(center, center, row);
    }

    .model_wrapper {
        inline-size: 65%;
        padding: 2rem;
        @include flex(flex-start, flex-start, column);

        background: linear-gradient(var(--v-input-bg), var(--v-input-bg)) padding-box,
            linear-gradient(130deg, var(--light-cyan), var(--soft-violet)) border-box;
        border-radius: 1rem;
        border: 1px solid transparent;
    }

    .action_btn {
        display: block;
        margin-block-end: 1rem;
    }

    .done_btn {
        background: linear-gradient(130deg, var(--light-cyan), var(--soft-violet)) padding-box,
            linear-gradient(130deg, var(--light-cyan), var(--soft-violet)) border-box;
        border-radius: 50%;
        inline-size: 26px;
        block-size: 25px;
        margin-bottom: 0;
        @include flex(center, center);
        transition: 1s all ease-in-out;

        &:hover {
            background: linear-gradient(-130deg, var(--light-cyan), var(--soft-violet)) padding-box,
                linear-gradient(-130deg, var(--light-cyan), var(--soft-violet)) border-box;
        }
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
