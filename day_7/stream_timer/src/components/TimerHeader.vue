<template>
    <div class="s-timerbox-header">
        <h1>{{ title }}</h1>
    </div>
</template>
<script setup>
    const props = defineProps({
        title: String
    });
</script>
<style scoped lang="scss">
    .s-timerbox-header {
        margin-bottom: 20px;
        text-align: center;
    }
</style>
