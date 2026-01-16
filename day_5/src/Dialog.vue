<template>
    <div v-show="isModalVisible" class="modal fade" ref="modalRef" tabindex="-1" @click.self="$emit('close')">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-if="$slots.title">
                            <slot name="title"></slot>
                        </span>
                        <span v-else>
                            {{ title }}
                        </span>
                        книги
                    </h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const emit = defineEmits(['close']);
    const props = defineProps(['title']);

    const modalRef = ref(null);
    let modalInstance = null;
    let isModalVisible = ref(false);

    onMounted(() => {
        modalInstance = new bootstrap.Modal(modalRef.value);

        modalRef.value.addEventListener('show.bs.modal', () => {
            isModalVisible.value = true;
        });
        modalRef.value.addEventListener('hide.bs.modal', () => {
            isModalVisible.value = false;
        });
    });

    const show = () => modalInstance.show();
    const hide = () => modalInstance.hide();

    defineExpose({ show, hide });
</script>