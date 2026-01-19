<template>
    <h1 class="header py-2">
      О нас
    </h1>
    <SNote>
        <span v-for="text in texts">
            {{ text }}
        </span>
    </SNote>
</template>

<script setup>
    import { ref } from 'vue'
    import { SNote } from 'startup-ui';

    const texts = ref(Array.from({ length: 15 }, () => 'Изучение Vue Route. '));
</script>