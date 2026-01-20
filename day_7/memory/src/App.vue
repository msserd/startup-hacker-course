<template>
    <div class="s-app-wrapper">

        <h1>Игра Memory</h1>

        <div class="s-memorygame">

            <div class="s-memorygame-stats">
                <div>Уровень: {{ currentLevel.name }}</div>
                <div>Ходов: {{ moves }}</div>
                <div>Осталось карт: {{ cards.length - matchedCardIds.size }}</div>
                <div>Время: {{ timePassed }} сек.</div>
            </div>

            <div class="s-memorygame-difficulte">
                <SButton v-for="lvl in lvls" :key="lvl.id" @click="initGame(lvl)" :disabled="currentLevel.id === lvl.id">{{ lvl.cards }} карт</SButton>
            </div>

            <div class="s-memorygame-playground" :class="currentLevel.id === 'easy' ? 's-memorygame-playground-grid4' : 's-memorygame-playground-grid6'">
                <Card v-for="card in cards" :key="card.id" :card="card" :matchedCardIds="matchedCardIds" @click="handleCardClick"></Card>
            </div>

            <SDialog v-model="gameFinished" title="Результат">
                <div>
                    <p>{{ scoreText }}</p>
                    <p>Время: {{ timePassed }} сек.</p>
                    <p>Ходов: {{ moves }}</p>
                    <p>Уровень: {{ currentLevel.name }}</p>
                    <SButton @click="initGame()">Играть снова</SButton>
                </div>
            </SDialog>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { SButton, SDialog } from 'startup-ui';
    import Card from "@/components/Card.vue";
    
    const lvls = [
        { id: 'easy', name: 'Легкий', cards: 12 },
        { id: 'medium', name: 'Средний', cards: 24 },
        { id: 'hard', name: 'Сложный', cards: 36 }
    ];

    const currentLevel = ref(lvls[0]);
    const cards = ref([]);
    const openedCards = ref([]);
    const matchedCardIds = ref(new Set());

    const moves = ref(0);
    const timePassed = ref(0);
    const timerInterval = ref(null);
    const gameFinished = ref(false);

    const initGame = (level = currentLevel.value) => {
        currentLevel.value = level;
        const pairsCount = level.cards / 2;
        const numbers = [];
        
        // Создаем пары
        for (let i = 1; i <= pairsCount; i++) {
            numbers.push(i, i); 
        }
        
        // Перемешивание
        cards.value = numbers
            .sort(() => Math.random() - 0.5)
            .map((num, index) => ({
                    id: index,
                    value: num,
                    isFlipped: false
                })
            );

        matchedCardIds.value.clear();
        openedCards.value = [];
        moves.value = 0;
        timePassed.value = 0;
        gameFinished.value = false;
        startTimer();
    };

    const startTimer = () => {
        stopTimer();
        timerInterval.value = setInterval(() => timePassed.value++, 1000);
    };

    const stopTimer = () => {
        if (timerInterval.value) clearInterval(timerInterval.value);
    };

    const handleCardClick = (card) => {
        
        if (card.isFlipped || matchedCardIds.value.has(card.id) || openedCards.value.length === 2) return;

        card.isFlipped = true;
        openedCards.value.push(card);

        if (openedCards.value.length === 2) {
            moves.value++;
            checkMatch();
        }
    };

    const checkMatch = () => {
        const [card1, card2] = openedCards.value;

        if (card1.value === card2.value) {
            setTimeout(() => {
                matchedCardIds.value.add(card1.id);
                matchedCardIds.value.add(card2.id);
                openedCards.value = [];
                
                if (matchedCardIds.value.size === cards.value.length) {
                    finishGame();
                }
            }, 500);
        } else {
            setTimeout(() => {
                card1.isFlipped = false;
                card2.isFlipped = false;
                openedCards.value = [];
            }, 1000);
        }
    };

    const finishGame = () => {
        stopTimer();
        gameFinished.value = true;
    };

    const scoreText = computed(() => {
        const perfectMoves = currentLevel.value.cards / 2;
        const ratio = moves.value / perfectMoves;
        if (ratio <= 1.2) return 'Гениально! Идеальная память.';
        if (ratio <= 1.8) return 'Отлично! Хороший результат.';
        return 'Можно лучше, попробуй еще раз!';
    });

    onMounted(initGame);
    onUnmounted(stopTimer);
</script>
<style scoped lang="scss">
    .s-app-wrapper {
        padding: 20px;
        text-align: center;

        & h1{
            margin-bottom: 1rem;
        }
    }

    .s-memorygame {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;

        &-stats {
            display: flex;
            justify-content: space-around;
            background: var(--s-gray);
            padding: 1rem;
            border-radius: var(--s-border-radius);
            margin-bottom: 1rem;
        }

        &-difficulte {
            display: flex;
            gap: 10px;
            margin-bottom: 1rem;
            justify-content: center;
        }

        &-playground {
            display: grid;
            gap: 10px;
            perspective: 1000px;

            &-grid4 {
                grid-template-columns: repeat(4, 1fr);
            }

            &-grid6 {
                grid-template-columns: repeat(6, 1fr);
            }
        }
    }
</style>
