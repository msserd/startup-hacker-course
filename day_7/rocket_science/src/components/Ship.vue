<template>
    <div class="s-space-ship" :class="{ 's-space-ship-crashed': ship.isCrashed }" :style="{ left: ship.x + '%', top: ship.y + '%' }" @click="refuel(ship)">
        <div class="s-space-ship-info">
            <span>{{ ship.title }}</span>
            <div class="s-space-ship-fuel-bar">
                <div class="s-space-ship-fuel-fill" :style="{ width: (ship.fuel / ship.fuelMax * 100) + '%' }"></div>
            </div>
        </div>
        <img :src="ship.isCrashed ? getImage(ship.icon_crash) : getImage(ship.icon)" />
    </div>
</template>
<script setup>
    const props = defineProps({
        ship: Object,
    });

    const refuel = (ship) => {
        if (ship.isCrashed) return;
        ship.fuel = ship.fuelMax;
        ship.isDescending = false;
    };
    
    const getImage = (name) => {
        return `../public/${name}`;
    };
</script>
<style scoped lang="scss">
    .s-space-ship {
        position: absolute; 
        width: 90px;
        cursor: pointer; 
        transition: transform 0.1s;
        user-select: none;
        z-index: 20;

        img {
            width: 90px;
            transform: scaleX(-1);
        }

        &-info {
            position: absolute; 
            top: -40px; 
            left: 50%;
            transform: translateX(-50%); 
            width: 100px; 
            text-align: center;
        }

        &-fuel-bar { 
            height: 6px; 
            background: #444; 
            border-radius: 3px; 
            margin-top: 4px; 
            overflow: hidden; 
        }

        &-fuel-fill { 
            height: 100%; 
            background: var(--s-green); 
            transition: 
            width 0.3s; 
        }

        &-is-crashed { 
            cursor: default;
        }
    }
</style>