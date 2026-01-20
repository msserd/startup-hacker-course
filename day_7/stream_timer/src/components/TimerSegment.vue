<template>
<div class="timesegment">
    <div class="timesegment-datawrapper">
        <div class="timesegment-number-wrapper">
            <Transition name="slide-up" mode="out-in">
                <span class="number" :key="number">{{ number }}</span>
            </Transition>
        </div>
        <span class="label">{{ label }}</span>
    </div>
</div>
</template>
<script setup>
    defineProps({
        label: String,
        number: Number,
    });
</script>
<style scoped lang="scss">
    .timesegment {
        &-datawrapper {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
        }

        &-number-wrapper {
            background-color: aliceblue;
            padding: 5px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px;
        }

        .number {
            font-size: 32px;
        }
        .label {
            font-size: 16px;
        }
    }
    
    .slide-up {
        &-enter-active, &-leave-active{
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &-enter-from {
            transform: translateY(100%);
            opacity: 0;
        }

        &-leave-to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
</style>
