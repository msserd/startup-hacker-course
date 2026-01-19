<template>
  <SCanvas>
      <template #header>
        <div class="d-flex gap-2">
          <RouterLink to="/">
            <SButton :disabled="$route.path === '/' ? true : false">Рейтинг книг</SButton>
          </RouterLink>
          <RouterLink to="/about">
            <SButton :disabled="$route.path === '/about' ? true : false">О нас</SButton>
          </RouterLink>
        </div>
      </template>
      <template #content>
        <div class="app">
          <RouterView />
        </div>
    </template>
  </SCanvas>
</template>
<script setup>
  import { SCanvas, SButton } from 'startup-ui';
</script>

<style>
  .app{
    max-width: 1500px;
    margin: 0 auto;
  }

  #app{
    min-height: 100vh;
    background-image: url('../public/images/bg.jpg');
  }

  .s-canvas-header{
    justify-content: center !important;
  }

  .s-canvas .s-section-h{
    padding-top: 0 !important;
  }

  .s-button>svg:only-child{
    margin-right: 0!important;
  }

</style>