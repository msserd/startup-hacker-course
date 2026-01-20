<template>
    <div class="s-memorygame-card-wrapper">
        <Transition name="card-transition">
            <div v-if="!matchedCardIds.has(card.id)" class="s-memorygame-card" :class="{ 's-memorygame-card-flipped': card.isFlipped }" @click="$emit('click', card)">
                <div class="s-memorygame-card-front">{{ card.value }}</div>
                <div class="s-memorygame-card-back">?</div>
            </div>
        </Transition>
    </div>
</template>
<script setup>
    const props = defineProps({
        card: Object,
        matchedCardIds: Set
    });
    const emit = defineEmits(['click']);
</script>
<style scoped lang="scss">
    .s-memorygame-card {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        cursor: pointer;

        &-wrapper {
            aspect-ratio: 3/4;
        }

        &-flipped {
            transform: rotateY(180deg);
        }

        &-front, &-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        &-front {
            background: var(--s-white);
            color: var(--s-text);
            transform: rotateY(180deg);
            border: 2px solid var(--s-white);
        }

        &-back {
            background: var(--s-yellow);
            color: var(--s-white);
        }
    }

    .card-transition {
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