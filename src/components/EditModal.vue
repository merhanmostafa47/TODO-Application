<template>
    <Transition>
        <div class="edit_modal_wrapper" v-if="open" :class="{ show: open }">
            <v-container class="px-12">
                <div class="model_wrapper">
                    <button class="action_btn" @click="$emit('closeModel')">
                        <IconCross :color="'var(--v-input-bg)'" />
                    </button>
                    <div class="edit_modal">
                        <input name="item" v-model="dataToEdit" ref="editInput" type="text" class="form-control"
                            @change="updateData(item)" />
                    </div>
                </div>
            </v-container>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import IconCross from '@/components/icons/IconCross.vue';
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
    position: absolute;
    top: 50%;
    left: 50%;
    @include flex(center, center);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    @include transitioning(.3s);
    transform: translate(-50%, -50%);

    &.show {
        width: 100vw;
        height: 100vh;

        .edit_modal {
            background-color: var(--v-input-bg);
            padding: 1rem;
            border-radius: 4px;
        }

        .action_btn {
            display: block;
            margin-block-end: 1rem;
        }
    }

    .action_btn {
        display: none;
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
