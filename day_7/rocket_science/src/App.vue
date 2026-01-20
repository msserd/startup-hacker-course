<template>
    <div class="s-app-wrapper">
        <div class="s-sidebar">
            <h3>Корабли</h3>
            <div v-for="type in ships" :key="type.id" class="s-sidebar-ship" @click="openLaunchModal(type)">
                <img :src="type.icon" alt="">
                <span>{{ type.name }}</span>
            </div>

            <SDialog v-model="isModalOpen" title="Запуск корабля">
                <SInput v-model="newShipName" placeholder="Введите имя корабля" ref="inputTitle"></SInput>
                <div class="s-dialog-error" v-if="errorTitle">Кораблю нужно имя</div>
                <div class="s-dialog-btn-container">
                    <SButton color="green" @click="launchShip">Запуск</SButton>
                    <SButton color="red" @click="isModalOpen = false">Отмена</SButton>
                </div>
            </SDialog>

            <div class="s-stats">
                <p>Активно: {{ activeCount }}</p>
                <p>Разбито: {{ stats.crashed }}</p>
                <p>Всего: {{ stats.launched }}</p>
            </div>
        </div>

        <Ship v-for="ship in activeShips" :key="ship.id" :ship="ship"></Ship>
    </div>
</template>
<script setup>
    import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';
    import { SButton, SDialog, SInput } from 'startup-ui';
    import Ship from "@/components/Ship.vue";

    const ships = [
        { id: 'ship1', name: 'Квазар', speed: 1.4, fuelMax: 3000, icon: 'ship1.png', icon_crash: 'ship_crashed1.png' },
        { id: 'ship2', name: 'Перигелий', speed: 0.3, fuelMax: 1000, icon: 'ship2.png', icon_crash: 'ship_crashed2.png' },
        { id: 'ship3', name: 'Пульсар', speed: 0.6, fuelMax: 700, icon: 'ship3.png', icon_crash: 'ship_crashed3.png' },
        { id: 'ship4', name: 'Сверхновая', speed: 2, fuelMax: 2000, icon: 'ship4.png', icon_crash: 'ship_crashed4.png' },
        { id: 'ship5', name: 'Титан', speed: 1, fuelMax: 8000, icon: 'ship5.png', icon_crash: 'ship_crashed5.png' },
    ];

    const activeShips = ref([]);
    const stats = reactive({ launched: 0, crashed: 0 });
    const selectedShipType = ref(null);
    const newShipName = ref('');
    const isModalOpen = ref(false);
    const errorTitle = ref(false);
    const inputTitle = ref(null)

    const activeCount = computed(() => activeShips.value.filter(s => !s.isCrashed).length);

    const openLaunchModal = (type) => {
        selectedShipType.value = type;
        newShipName.value = '';
        isModalOpen.value = true;
    };

    const launchShip = () => {
        if (!newShipName.value){
            errorTitle.value = true;
            return;
        }

        errorTitle.value = false;

        const newShip = {
            id: Date.now(),
            title: newShipName.value,
            ...selectedShipType.value,
            fuel: selectedShipType.value.fuelMax,
            x: 0,
            y: Math.floor(Math.random() * (90 - 20)) + 20, 
            isCrashed: false,
            isDescending: false
        };
        
        activeShips.value.push(newShip);
        stats.launched++;
        isModalOpen.value = false;
    };

    let animationFrame;
    const update = () => {
        activeShips.value.forEach(ship => {
            if (ship.isCrashed) return;

            if (ship.fuel > 0) {
                ship.fuel -= ship.speed;
            }

            const isOutOfFuel = ship.fuel <= 0;
            const isLowFuel = ship.fuel > 0 && ship.fuel < ship.fuelMax * 0.1;

            if (isOutOfFuel) {
                ship.y += 0.8;
            } else if (isLowFuel) {
                ship.y += 0.2;
            }

            if (ship.y >= 95) {
                ship.y = 95;
                if (isOutOfFuel) {
                    ship.isCrashed = true;
                    stats.crashed++;
                }
            }

            ship.x += ship.speed * 0.1;

            if (ship.x > 100) {
                ship.x = -5; 
            }
        });
        animationFrame = requestAnimationFrame(update);
    };

    onMounted(() => animationFrame = requestAnimationFrame(update));

    onUnmounted(() => cancelAnimationFrame(animationFrame));

    watch(errorTitle, (isError) => {
        if (isError)
            inputTitle.value.$el.querySelector('input').focus()
    })
</script>
<style scoped lang="scss">
    .s-app-wrapper {
        width: 100vw; 
        height: 100vh;
        display: flex; 
        overflow: hidden;
        background-size: cover; 
        background-position: center;
        color: var(--s-white); 
        background-image: url('../public/bg.jpg');
    }

    .s-sidebar {
        width: 200px; 
        background: var(--s-black);
        opacity: 0.8;
        padding: 20px; 
        z-index: 10;

        &-ship {
            background: #222; 
            padding: 10px; 
            margin-bottom: 10px;
            border-radius: 8px; 
            cursor: pointer; 
            display: flex; 
            align-items: center;
            transition: transform 0.2s;

            img { 
                width: 40px; 
                margin-right: 10px; 
                transform: scaleX(-1);
            }
        }
        h3 {
            margin-bottom: 8px;
        }
    }

    .s-space {
        flex: 1; 
        position: relative; 
    }

    .s-dialog{
        &-btn-container{
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
        }

        &-error{
            margin-top: 8px;
            color: var(--s-red);
        }
    }
</style>
