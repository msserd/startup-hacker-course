<template>
    <form @submit.prevent="$emit('update')">
        <div class="modal-body">
            <div class="mb-3">
                <label for="title" class="form-label">Название</label>
                <input type="text" class="form-control" id="title" v-model="modelValue.title">
                <div class="form-text text-danger" v-if="errorTitle">Название не должно быть пустым.</div>
            </div>
            
            <div class="mb-3">
                <label for="descr" class="form-label">Описание</label>
                <textarea class="form-control" id="descr" rows="3" v-model="modelValue.descr"></textarea>
            </div>

            <div class="mb-3">
                <label for="img" class="form-label">Обложка</label>
                <input type="text" class="form-control" id="img" v-model="modelValue.img">
            </div>
            
            <div class="mb-3">
                <label for="img" class="form-label">Жанр</label>
                <select class="form-select" multiple aria-label="multiple select example" v-model="modelValue.genre">
                <option>Фантастика</option>
                <option>Драма</option>
                <option>Остросюжетный любовный роман</option>
                <option>Детектив</option>
                <option>Ужасы</option>
                <option>Триллер</option>
                <option>Приключения</option>
                <option>Приключенческая фантастика</option>
                <option>Исторические приключения</option>
                <option>Боевик</option>
                <option>Психология</option>
                <option>Учебная</option>
                </select>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="adult" v-model="modelValue.adult">
                <label class="form-check-label" for="adult">
                18+
                </label>
            </div>
        </div>
        <div class="modal-footer justify-content-between">
            <button class="btn btn-primary" type="submit">Сохранить</button>
            <button class="btn btn-secondary" @click.prevent="$emit('close')">Закрыть</button>
        </div>
    </form>
</template>

<script setup>
    const emit = defineEmits(['update', 'close']);
    const props = defineProps(['modelValue', 'errorTitle']);
</script>