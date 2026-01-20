<template>
    <div class="s-app-wrapper">
        <div class="s-timerbox">
            <TimerHeader :title="isLive ? 'В эфире' : 'Будем в эфире через'"/>
            <div class="s-timerbox-display">
                <TimerSegment v-for="(part, index) in dateParts" :key="index" :label="part.label" :number="part.number" />
            </div>
            <div class="s-timerbox-datepicker">
                <SDatePicker v-model="targetDate" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { SDatePicker } from 'startup-ui';
    import { ref, onMounted, onUnmounted, computed } from 'vue';
    import TimerHeader from "@/components/TimerHeader.vue";
    import TimerSegment from "@/components/TimerSegment.vue";

    const nowDate = ref(new Date());
    const targetDate = ref(new Date(Date.now() + 86400000));
    const isLive = ref(false);
    let timer = null;

    const getTimeParts = () => {
        const target = new Date(targetDate.value);
        const diff = target - nowDate.value;

        if (diff <= 0) {
            isLive.value = true;
            return [];
        }

        if (isLive)
            isLive.value = false;

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return [
            { number: days, label: declension(days, ['день', 'дня', 'дней']) },
            { number: hours, label: declension(hours, ['час', 'часа', 'часов']) },
            { number: minutes, label: declension(minutes, ['минуту', 'минуты', 'минут']) },
            { number: seconds, label: declension(seconds, ['секунду', 'секунды', 'секунд']) }
        ];
    };

    // Функция для склонения слов
    const declension = (n, titles) => {
        return titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    };

    const dateParts = computed(() => getTimeParts());

    onMounted(() => {
        setTimeout(()=>{
            nowDate.value = new Date();
            timer = setInterval(() => {
                nowDate.value = new Date();
            }, 1000);},
        500)
    });

    onUnmounted(() => clearInterval(timer));

</script>
<style scoped lang="scss">
    .s-app-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .s-timerbox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        border: 1px solid rgb(58, 58, 58);
        border-radius: 6px;
        box-shadow: 3px 3px 3px black;

        &-display {
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        &-datepicker{
            display: flex;
            justify-content:center;
            margin-top:1rem;

            .s-datepicker{
                background-color: var(--s-white);
                padding: 1rem;
                border: 1px solid var(--s-border);
                border-radius: var(--s-border-radius);
            }
        }
    }
</style>
